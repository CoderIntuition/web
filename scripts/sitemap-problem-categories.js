const fs = require("fs");
const prettier = require("prettier");

const getDate = new Date().toISOString();
const DOMAIN = "https://coderintuition.com";

const formatted = (sitemap) => prettier.format(sitemap, { parser: "html" });

(async () => {
  const categories = [
    "arrays",
    "strings",
    "linked-lists",
    "stacks",
    "queues",
    "trees",
    "graphs",
    "bit-manipulation",
    "math",
    "backtracking",
    "greedy",
    "dynamic-programming",
  ];

  const problemCategoriesSitemap = `
    ${categories
      .map((category) => {
        return `
          <url>
            <loc>${DOMAIN}/problems/${category}</loc>
            <lastmod>${getDate}</lastmod>
          </url>`;
      })
      .join("")}
  `;

  const generatedSitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
    >
      ${problemCategoriesSitemap}
    </urlset>
  `;

  const formattedSitemap = formatted(generatedSitemap);

  fs.writeFileSync("../public/sitemap-problem-categories.xml", formattedSitemap, "utf8");
})();
