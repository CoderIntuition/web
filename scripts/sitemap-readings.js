const fs = require("fs");
const fetch = require("node-fetch");
const prettier = require("prettier");

const getDate = new Date().toISOString();
const fetchUrl = "https://api.coderintuition.com/all-readings";
const DOMAIN = "https://coderintuition.com";

const formatted = (sitemap) => prettier.format(sitemap, { parser: "html" });

(async () => {
  const readings = await fetch(fetchUrl)
    .then((res) => res.json())
    .catch((err) => console.log(err));

  const readingsSitemap = `
    ${readings
      .map((urlName) => {
        return `
          <url>
            <loc>${DOMAIN}/reading/${urlName}</loc>
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
      ${readingsSitemap}
    </urlset>
  `;

  const formattedSitemap = formatted(generatedSitemap);

  fs.writeFileSync("../public/sitemap-readings.xml", formattedSitemap, "utf8");
})();
