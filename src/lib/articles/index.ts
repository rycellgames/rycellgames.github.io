import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from 'remark-html';

const articlesPath = path.join(process.cwd(), "src/pages/articles/markdown");

const functions = {
  list: function () {
    const fileNames = fs.readdirSync(articlesPath);
    return fileNames.map((fileName) => {
      const filePath = path.join(articlesPath, fileName);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContent);
      return {
        ...data,
        fileName,
      };
    });
  },

  getBySlug: async function (slug: string) {
    const fileNames = fs.readdirSync(articlesPath);
    for (const fileName of fileNames) {
      const filePath = path.join(articlesPath, fileName);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContent);
      console.log(data);
      console.log(data.slug + " " + slug);
      if (data.slug === slug) {
        
        const processedContent = await remark().use(html).process(content);
        const contentHtml = processedContent.toString();

        return { ...data, content:contentHtml, found: true };
      }
    }
    return {
      found: false,
    };
  },
};

export default functions;
