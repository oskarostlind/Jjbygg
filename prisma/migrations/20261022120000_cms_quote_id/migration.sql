-- Lägger till sitecms-id på offertförfrågan (dubbelskrivning Neon + sitecms).
-- Skriven för hand (ingen DATABASE_URL i utvecklingsmiljön); kör
-- `npx prisma migrate deploy` mot Neon vid deploy.
ALTER TABLE "Offert" ADD COLUMN "cmsQuoteId" TEXT;
