// api/og-meta.js
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

export default async function handler(req, res) {
    dotenv.config();
    try {
        const username =
            typeof req.query?.username === "string"
                ? req.query.username
                : "default";
        const filePath = path.join(process.cwd(), "dist", "index.html");

        if (!fs.existsSync(filePath)) {
            console.error("dist/index.html not found at", filePath);
            return res.status(500).send("Index not found");
        }

        let html = fs.readFileSync(filePath, "utf8");

        // Replace (or insert) the og:image meta. This example replaces an existing tag.
        // Make sure your index.html has a tag like:
        // <meta property="og:image" content="__OG_IMAGE__" />
        // or this regex will still replace any existing og:image meta.
        const template = process.env.TEMPLATE_NAME;
        const ogUrl = `https://${template}.matson.app/api/og?username=${encodeURIComponent(username)}`;

        // If you used a placeholder __OG_IMAGE__, replace that:
        if (html.includes("__OG_IMAGE__")) {
            html = html.replace(/__OG_IMAGE__/g, ogUrl);
        } else {
            // fallback: replace existing og:image meta or insert if not present
            if (/<meta\s+property=["']og:image["']/.test(html)) {
                html = html.replace(
                    /<meta\s+property=["']og:image["']\s+content=["'][^"']*["']\s*\/?>/i,
                    `<meta property="og:image" content="${ogUrl}" />`,
                );
            } else {
                // inject before closing </head>
                html = html.replace(
                    /<\/head>/i,
                    `  <meta property="og:image" content="${ogUrl}" />\n</head>`,
                );
            }
        }
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.setHeader(
            "Cache-Control",
            "s-maxage=60, stale-while-revalidate=300",
        );
        return res.status(200).send(html);
    } catch (err) {
        console.error("og-meta error:", err);
        return res.status(500).send("Failed to generate OG meta");
    }
}
