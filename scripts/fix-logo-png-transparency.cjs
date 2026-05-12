/**
 * Tar bort inbakade "transparensrutor" (vit + ljusgrå neutrals) i public/logo.png
 * genom att sätta alfa = 0. Bevarar mörk text (min RGB-kanal), orange, och AA.
 *
 * Kör: node scripts/fix-logo-png-transparency.cjs
 */
const path = require("node:path");
const sharp = require("sharp");

const logoPath = path.join(__dirname, "..", "public", "logo.png");

async function main() {
  const { data, info } = await sharp(logoPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels: ch } = info;
  if (ch !== 4) {
    throw new Error(`Förväntade RGBA (4 kanaler), fick ${ch}`);
  }

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const sum = r + g + b;
    const sat = max === 0 ? 0 : (max - min) / max;
    const lum = sum / 3;

    // Behåll allt som har tydlig mörk kanal (text, skuggor, AA mot mörk färg)
    if (min < 88) continue;

    // Behåll orange / koppar
    if (r > 145 && g > 65 && b < 175 && r > g - 5 && r > b + 10) continue;

    // Nästan vit ruta
    if (r > 246 && g > 246 && b > 246) {
      data[i + 3] = 0;
      continue;
    }

    // Ljusgrå rutmönster: alla kanaler höga, låg mättnad, bara "ljusa" toner (inte text-AA)
    if (sat < 0.08 && min > 178 && lum > 212 && lum < 252) {
      data[i + 3] = 0;
      continue;
    }

    // Kant mot nästan-vitt
    if (sat < 0.1 && min > 210 && lum > 238) {
      data[i + 3] = 0;
    }
  }

  await sharp(data, { raw: { width: w, height: h, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(logoPath);

  console.log("Klart: logo.png uppdaterad med transparens", w, "x", h);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
