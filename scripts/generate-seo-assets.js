const fs = require("fs");
const path = require("path");

const SITE_URL = "https://keynote.brandonxiang.top";
const ROOT = path.resolve(__dirname, "..");
const MD_DIR = path.join(ROOT, "md");
const DIST_DIR = path.join(ROOT, "dist");

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function parseFrontmatter(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---/);
  if (!match) {
    return {};
  }

  return match[1].split("\n").reduce((data, line) => {
    const pair = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!pair) {
      return data;
    }

    const [, key, rawValue] = pair;
    data[key] = rawValue.replace(/^["']|["']$/g, "").trim();
    return data;
  }, {});
}

function readTalks() {
  return fs
    .readdirSync(MD_DIR)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const source = fs.readFileSync(path.join(MD_DIR, fileName), "utf8");
      const frontmatter = parseFrontmatter(source);
      const slug = fileName.replace(/\.md$/, "");

      return {
        fileName,
        lastmod: frontmatter.talkDate || new Date().toISOString().slice(0, 10),
        title: frontmatter.title || slug,
        url: frontmatter.absoluteUrl || `${SITE_URL}/${slug}`
      };
    })
    .sort((left, right) => right.lastmod.localeCompare(left.lastmod) || left.title.localeCompare(right.title));
}

function writeRobots() {
  const body = [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    ""
  ].join("\n");

  fs.writeFileSync(path.join(DIST_DIR, "robots.txt"), body);
}

function writeSitemap(talks) {
  const urls = [
    {
      url: `${SITE_URL}/`,
      lastmod: talks[0]?.lastmod || new Date().toISOString().slice(0, 10),
      priority: "1.0"
    },
    ...talks.map((talk) => ({
      url: talk.url,
      lastmod: talk.lastmod,
      priority: "0.8"
    }))
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (entry) => `  <url>
    <loc>${escapeXml(entry.url)}</loc>
    <lastmod>${escapeXml(entry.lastmod)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

  fs.writeFileSync(path.join(DIST_DIR, "sitemap.xml"), body);
}

if (!fs.existsSync(DIST_DIR)) {
  throw new Error("dist directory does not exist. Run build:reveal before generating SEO assets.");
}

const talks = readTalks();
writeRobots();
writeSitemap(talks);

console.log(`Generated robots.txt and sitemap.xml for ${talks.length} talks.`);
