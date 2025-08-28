// api/og.ts
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

export default async function handler(req, res) {
    const { username } = req.query;

    if (!username || typeof username !== "string") {
        return res.status(400).send("Missing username");
    }

    try {
        const executablePath = await chromium.executablePath();

        const browser = await puppeteer.launch({
            args: chromium.args,
            defaultViewport: { width: 1200, height: 630 },
            executablePath,
            headless: true,
        });

        const page = await browser.newPage();
        await page.goto(`https://template-5.matson.app/${username}`, {
            waitUntil: "networkidle0",
        });

        const screenshot = await page.screenshot({ type: "png" });
        await browser.close();

        res.setHeader("Content-Type", "image/png");
        res.setHeader("Cache-Control", "public, max-age=86400");
        return res.end(screenshot);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Failed to generate screenshot");
    }
}
