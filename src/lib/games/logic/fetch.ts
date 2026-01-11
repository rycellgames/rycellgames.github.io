import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from 'remark-html';


export function getMdByGameSlug(slug: string) {
    
    console.log(slug)

    const markdownFilePath = path.join(process.cwd(), "src", "app", "games", "descriptions", `${slug}.md`)
    path.resolve(process.cwd(), 'src')
    console.log(markdownFilePath);
    
    const markdownExists = fs.existsSync(markdownFilePath)
    console.log(markdownExists)
    if (!markdownExists) return undefined

    const markdownFileContent = fs.readFileSync(markdownFilePath, 'utf-8');
    const { content, data } = matter(markdownFileContent);
    const htmlContent = remark().use(html).processSync(content).toString();
    return { frontmatter: data, html: htmlContent };

}