#!/usr/bin/env node
const fs = require('fs').promises;
const path = require('path');
const os = require('os');

let sharp;
try {
	sharp = require('sharp');
} catch (e) {
	console.error('Missing dependency: please run `npm install sharp` before using this script.');
	process.exit(1);
}

const args = process.argv.slice(2);
function getArg(key, fallback) {
	const idx = args.findIndex(a => a === key || a.startsWith(key + '='));
	if (idx === -1) return fallback;
	const val = args[idx].includes('=') ? args[idx].split('=')[1] : args[idx+1];
	return val === undefined ? fallback : val;
}

const targetDir = path.resolve(getArg('--dir', path.join(__dirname, 'public', 'static', 'images', 'games')));
const quality = Number(getArg('--quality', 80));
const maxSize = Number(getArg('--max', 512));
const dryRun = Boolean(getArg('--dry-run', false) === 'true' || getArg('--dry-run', false) === true);
const concurrency = Number(getArg('--concurrency', os.cpus().length || 4));
const noUpscale = args.includes('--no-upscale') || args.includes('-no-upscale');

const allowedExt = ['.jpg', '.jpeg', '.png', '.webp'];

async function* walk(dir) {
	const entries = await fs.readdir(dir, { withFileTypes: true });
	for (const e of entries) {
		const full = path.join(dir, e.name);
		if (e.isDirectory()) yield* walk(full);
		else yield full;
	}
}

function shouldProcess(file) {
	const ext = path.extname(file).toLowerCase();
	return allowedExt.includes(ext);
}

async function processFile(file) {
	try {
		const dir = path.dirname(file);
		const base = path.basename(file, path.extname(file));
		const outPath = path.join(dir, base + '.webp');

		if (dryRun) {
			console.log('[dry] would convert:', file, '->', outPath);
			return;
		}

		const buffer = await fs.readFile(file);
		let img = sharp(buffer, { failOnError: false });
		let meta;
		try {
			meta = await img.metadata();
		} catch (err) {
			console.error('Skipping (unreadable):', file, err.message || err);
			return;
		}

		const width = meta.width || 0;
		const height = meta.height || 0;

		// Ensure output is a square of exact size 'maxSize' x 'maxSize'.
		// If image is larger than max in any dimension, resize+center-crop (cover).
		// If image is smaller and --no-upscale is set, pad onto a transparent canvas.
		let tmpOut = outPath + '.tmp';

		if (width > maxSize || height > maxSize) {
			// Resize to cover then center-crop to exact square
			await img.resize({ width: maxSize, height: maxSize, fit: 'cover', position: 'centre' }).webp({ quality }).toFile(tmpOut);
		} else if (!noUpscale) {
			// Upscale (or keep) to fill square, may enlarge small images
			await img.resize({ width: maxSize, height: maxSize, fit: 'cover', position: 'centre' }).webp({ quality }).toFile(tmpOut);
		} else {
			// Do not upscale: create transparent canvas and composite centered image
			const inputBuffer = await img.toBuffer();
			const canvas = sharp({ create: { width: maxSize, height: maxSize, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } });
			await canvas.composite([{ input: inputBuffer, gravity: 'center' }]).webp({ quality }).toFile(tmpOut);
		}

		// Replace safely: remove target if exists (Windows-safe), then move tmp
		try { await fs.unlink(outPath); } catch (_) {}
		await fs.rename(tmpOut, outPath);

		// If original had different extension, remove it
		if (path.resolve(outPath) !== path.resolve(file)) {
			try { await fs.unlink(file); } catch (e) {}
		}

		console.log('Converted:', file, '->', outPath, width && height ? `(${width}x${height})` : '');
	} catch (err) {
		console.error('Error processing', file, err && err.message ? err.message : err);
	}
}

async function run() {
	console.log('Target dir:', targetDir);
	console.log('Options: quality=', quality, 'max=', maxSize, 'concurrency=', concurrency, dryRun ? '(dry-run)' : '');

	const files = [];
	try {
		for await (const f of walk(targetDir)) {
			if (shouldProcess(f)) files.push(f);
		}
	} catch (e) {
		console.error('Failed to read target directory:', targetDir, e.message || e);
		process.exit(2);
	}

	console.log('Found', files.length, 'files to consider.');

	// simple concurrency pool
	let i = 0;
	async function worker() {
		while (true) {
			const idx = i++;
			if (idx >= files.length) return;
			await processFile(files[idx]);
		}
	}

	const workers = Array(Math.max(1, Math.min(concurrency, files.length))).fill(0).map(() => worker());
	await Promise.all(workers);
	console.log('Done.');
}

run().catch(err => { console.error(err); process.exit(1); });
