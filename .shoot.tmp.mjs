import { chromium } from "playwright";
import fs from "node:fs";

const BASE = "http://localhost:3100";
const OUT = process.argv[2] || "/home/claude/jjbygg-shots";
const PAGES = [
  ["/", "home"],
  ["/tjanster", "tjanster"],
  ["/tjanster/nybyggnation-tillbyggnad", "tjanst"],
  ["/offert", "offert"],
  ["/nyheter", "nyheter"],
];
const WIDTHS = [375, 768, 1440];
const only = process.argv[3] ? process.argv[3].split(",") : null;

fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell' });
for (const w of WIDTHS) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, deviceScaleFactor: 1 });
  for (const [path, name] of PAGES) {
    if (only && !only.includes(name)) continue;
    const page = await ctx.newPage();
    await page.goto(BASE + path, { waitUntil: "networkidle" });
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${OUT}/${name}-${w}.png`, fullPage: true });
    if (name === "home" && w === 375) {
      await page.click('button[aria-controls]');
      await page.waitForTimeout(400);
      await page.screenshot({ path: `${OUT}/home-375-menu.png`, fullPage: false });
    }
    await page.close();
  }
  await ctx.close();
}
await browser.close();
console.log("klart");
