/**
 * One-shot: behåll endast första <g>…</g> (linjer/strokes), ta bort alla fyllnads-
 * lager (vit/#cecece bakgrund och plattor). Ingen inbäddad <image> hanteras här.
 */
const fs = require("node:fs");
const path = require("node:path");

const logoPath = path.join(__dirname, "..", "public", "logo.svg");
const src = fs.readFileSync(logoPath, "utf8");

const firstG = src.indexOf("<g ");
if (firstG === -1) {
  throw new Error("Ingen <g>-grupp hittades");
}
const closeG = src.indexOf("</g>", firstG);
if (closeG === -1) {
  throw new Error("Ingen avslutande </g> hittades");
}
const groupRaw = src.slice(firstG, closeG + 5);
/** Ta bort non-scaling-stroke (annars vit "blobb" i liten skala) och ljusare linjer mot mörk header. */
const group = groupRaw
  .replace(/\s*vector-effect="non-scaling-stroke"/g, "")
  .replace(/stroke="#e6e6e6"/g, 'stroke="#f5f5f5"');

/** Grov bbox: alla koordinatpar i d="…" (även Bezier-kontrollpunkter ger säker yttre ram). */
function bboxFromPathDs(svgChunk) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  const dAttr = /d="\s*([\s\S]*?)"/g;
  let m;
  while ((m = dAttr.exec(svgChunk)) !== null) {
    const nums = m[1].match(/-?\d+(?:\.\d+)?/g);
    if (!nums) continue;
    for (let i = 0; i + 1 < nums.length; i += 2) {
      const x = Number.parseFloat(nums[i]);
      const y = Number.parseFloat(nums[i + 1]);
      if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
  }
  if (!Number.isFinite(minX)) {
    return null;
  }
  return { minX, minY, maxX, maxY };
}

const pad = 8;
const bb = bboxFromPathDs(group);
let viewBox = "0 0 768 1024";
if (bb) {
  const w = Math.ceil(bb.maxX - bb.minX + 2 * pad);
  const h = Math.ceil(bb.maxY - bb.minY + 2 * pad);
  const x0 = Math.floor(bb.minX - pad);
  const y0 = Math.floor(bb.minY - pad);
  viewBox = `${x0} ${y0} ${w} ${h}`;
}

const out =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" fill="none">\n` +
  `${group}\n` +
  `</svg>\n`;

fs.writeFileSync(logoPath, out, "utf8");
console.log("Wrote stroke-only logo, viewBox:", viewBox);
