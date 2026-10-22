/**
 * Rasteriserar loggans märke (public/logo-mark.svg) till app/icon.png (512 px)
 * och app/apple-icon.png (180 px) med lite luft runt och loggans röda som
 * bakgrund (vitt märke). Kör efter att märket ändrats:
 *
 *   node scripts/generate-icons.cjs
 */
const path = require("node:path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const MARK = path.join(ROOT, "public", "logo-mark-white.svg");
const BRAND = "#D94A2B";

async function render(size, outFile, paddingRatio) {
  const inner = Math.round(size * (1 - paddingRatio * 2));
  const mark = await sharp(MARK, { density: 300 }).resize(inner, inner, { fit: "contain" }).png().toBuffer();
  await sharp({
    create: { width: size, height: size, channels: 4, background: BRAND },
  })
    .composite([{ input: mark, gravity: "center" }])
    .png({ compressionLevel: 9 })
    .toFile(path.join(ROOT, "app", outFile));
  console.log(`Skrev app/${outFile} (${size}×${size})`);
}

async function main() {
  await render(512, "icon.png", 0.16);
  await render(180, "apple-icon.png", 0.16);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
