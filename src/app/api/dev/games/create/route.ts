import fs from 'fs';
import path from 'path';
import os from 'os';
import AdmZip from 'adm-zip';
import {buffer} from 'node:stream/consumers'

async function streamToBuffer(stream: ReadableStream) {
  const response = new Response(stream)
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

async function copyDir(src: string, dest: string) {
  await fs.promises.mkdir(dest, { recursive: true });
  const entries = await fs.promises.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else if (entry.isFile()) {
      await fs.promises.copyFile(srcPath, destPath);
    }
  }
}

async function findIndexHtml(baseDir: string): Promise<boolean> {
  const direct = path.join(baseDir, 'index.html');
  try {
    await fs.promises.access(direct);
    return true;
  } catch (e) {
    // not at root, check if there's a single top-level folder
    const entries = await fs.promises.readdir(baseDir, { withFileTypes: true });
    const dirs = entries.filter(e => e.isDirectory()).map(d => d.name);
    if (dirs.length === 1) {
      const candidate = path.join(baseDir, dirs[0], 'index.html');
      try {
        await fs.promises.access(candidate);
        return true;
      } catch (e2) {
        // fallthrough
      }
    }
  }
  return false;
}

async function updateTaggedGames(taggedGamesPath: string, id: string, specialCategories: string[]) {
  const promotedTags = specialCategories.filter((tag) => ['new', 'popular'].includes(tag.toLowerCase()));
  if (promotedTags.length === 0) return;

  const taggedGames = await fs.promises.readFile(taggedGamesPath, 'utf8').then((content) => JSON.parse(content) as Record<string, string[]>).catch(() => ({} as Record<string, string[]>));

  for (const tag of promotedTags) {
    const normalizedTag = tag.toLowerCase();
    const existing = taggedGames[normalizedTag] ?? [];
    if (!existing.includes(id)) {
      existing.unshift(id);
    }
    taggedGames[normalizedTag] = existing;
  }

  await fs.promises.writeFile(taggedGamesPath, JSON.stringify(taggedGames, null, 2), 'utf8');
}

export async function POST(req: Request) {
  if (process.env.NODE_ENV !== 'development') {
    return new Response('Not found', { status: 404 });
  }

  try {
    const formData = await req.formData();

    const name = (formData.get('name') as string) || '';
    const idRaw = (formData.get('id') as string) || '';
    const shortDescription = (formData.get('shortDescription') as string) || '';
    const categoriesRaw = (formData.get('categories') as string) || '';
    const specialCategoriesRaw = (formData.get('specialCategories') as string) || null;

    if (!name || !idRaw || !shortDescription || !categoriesRaw) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const id = idRaw.toString().trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
    if (!id) {
      return new Response(JSON.stringify({ error: 'Invalid id' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const gameFile = formData.get('gameFolder') as any;
    const imageFile = formData.get('image') as any;

    if (!gameFile || !imageFile) {
      return new Response(JSON.stringify({ error: 'Missing uploaded files' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    // write zip to buffer and extract
    const gameBuffer = Buffer.from(await (gameFile as File).arrayBuffer());
    const tmpDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'game-'));

    const zip = new AdmZip(gameBuffer);
    zip.extractAllTo(tmpDir, true);

    const hasIndex = await findIndexHtml(tmpDir);
    if (!hasIndex) {
      await fs.promises.rm(tmpDir, { recursive: true, force: true });
      return new Response(JSON.stringify({ error: 'Uploaded zip must contain an index.html at root or in a single top-level folder' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const targetDir = path.join(process.cwd(), 'public', 'raw', 'games', id);
    try {
      await fs.promises.access(targetDir);
      await fs.promises.rm(tmpDir, { recursive: true, force: true });
      return new Response(JSON.stringify({ error: 'Game with this id already exists' }), { status: 409, headers: { 'Content-Type': 'application/json' } });
    } catch (e) {
      // doesn't exist - proceed
    }

    await copyDir(tmpDir, targetDir);

    const imageDir = path.join(process.cwd(), 'public', 'static', 'images', 'games')

    // write image as {id}.webp
    const imageBuffer = Buffer.from(await (imageFile as File).arrayBuffer());
    const imagePath = path.join(imageDir, `${id}.webp`);
    await fs.promises.writeFile(imagePath, imageBuffer);

    const categories = categoriesRaw.split(',').map((s: string) => s.trim()).filter(Boolean);
    const parsedSpecialCategories = specialCategoriesRaw
      ? specialCategoriesRaw.split(',').map((s: string) => s.trim()).filter(Boolean)
      : [];
    const specialCategories = parsedSpecialCategories.filter((tag) => !['new', 'popular'].includes(tag.toLowerCase()));
    const gameJson = {
      id,
      name,
      description: shortDescription,
      categories,
      specialCategories: specialCategories.length ? specialCategories : null
    } as const;

    const taggedGamesPath = path.join(process.cwd(), 'src', 'lib', 'games', 'taggedGames.json');
    await updateTaggedGames(taggedGamesPath, id, parsedSpecialCategories);

    await fs.promises.writeFile(path.join(targetDir, 'game.json'), JSON.stringify(gameJson, null, 2), 'utf8');

    await fs.promises.rm(tmpDir, { recursive: true, force: true });

    return new Response(JSON.stringify({ ok: true, id }), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (err: any) {
    try {
      // best-effort cleanup
      // no-op
    } catch {}
    console.error('Error in dev game upload route:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
