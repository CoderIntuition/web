const fs = require("fs");
const globby = require("globby");
const prettier = require("prettier");

const getDate = new Date().toISOString();
const DOMAIN = "https://coderintuition.com";
const formatted = (sitemap) => prettier.format(sitemap, { parser: "html" });

(async () => {
  const pages = await globby([
    // include
    "../pages/**/*.tsx",
    "../pages/*.tsx",
    // exclude
    "!../pages/_*.tsx",
    "!../pages/reading/[urlName].tsx",
    "!../pages/problem/[urlName].tsx",
    "!../pages/problems/[category].tsx",
    "!../pages/quiz/**",
    "!../pages/admin/**",
    "!../pages/oauth2/**",
    "!../pages/reset/**",
    "!../pages/settings/**",
    "!../pages/user/**",
    "!../pages/verify/**",
    "!../pages/unsubscribe/**",
    "!../pages/checkout-success.tsx",
  ]);

  const pagesSitemap = `
    ${pages
      .map((page) => {
        const path = page
          .replace("../pages/", "")
          .replace(".tsx", "")
          .replace(/\/index/g, "");
        const routePath = path === "index" ? "" : path;
        return `
          <url>
            <loc>${DOMAIN}/${routePath}</loc>
            <lastmod>${getDate}</lastmod>
          </url>
        `;
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
      ${pagesSitemap}
    </urlset>
  `;

  const formattedSitemap = formatted(generatedSitemap);

  fs.writeFileSync("../public/sitemap-common.xml", formattedSitemap, "utf8");
})();
