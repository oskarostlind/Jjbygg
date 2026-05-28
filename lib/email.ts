import { Resend } from "resend";
import { siteContent } from "@/lib/site-content";

const resend = new Resend(process.env.RESEND_API_KEY);

const CONTACT_EMAIL = siteContent.contact.email;

/** Avsändare för Resend (domän måste vara verifierad i Resend för produktion). */
const FROM_EMAIL =
  process.env.FROM_EMAIL ?? `JJ Bygg & Entreprenad <${CONTACT_EMAIL}>`;

/** Mottagare för administrations-/notifieringsmail. */
const ADMIN_EMAIL = process.env.JESPER_EMAIL ?? CONTACT_EMAIL;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://placeholder-jj-entreprenad.se";

export type OffertEmailData = {
  namn: string;
  epost: string;
  telefon?: string;
  typ: string;
  beskrivning: string;
  budget?: string;
  rot: boolean;
  postnummer?: string;
  onskatStartdatum?: string;
  kundtyp?: string;
  bildUrler: string[];
};

export async function sendOffertBekraftelseToCustomer(
  data: OffertEmailData
): Promise<{ ok: boolean; error?: string }> {
  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: data.epost,
      subject: "Vi har tagit emot din förfrågan – JJ Bygg & Entreprenad AB",
      html: `
        <p>Hej ${data.namn},</p>
        <p>Tack för din förfrågan. Vi har mottagit din information och återkommer till dig så snart vi kan.</p>
        <p>Med vänliga hälsningar,<br/>JJ Bygg & Entreprenad AB</p>
        <p><a href="${SITE_URL}">Besök vår webbplats</a></p>
      `,
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Kunde inte skicka e-post";
    return { ok: false, error: message };
  }
}

export async function sendOffertNotifieringToJesper(
  data: OffertEmailData
): Promise<{ ok: boolean; error?: string }> {
  const bildLista =
    data.bildUrler.length > 0
      ? data.bildUrler.map((url) => `<li><a href="${url}">Bild</a></li>`).join("")
      : "<li>Inga bilder bifogade</li>";

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      replyTo: data.epost,
      subject: `Ny offertförfrågan från ${data.namn} – ${data.typ}`,
      html: `
        <h2>Ny offertförfrågan</h2>
        <p><strong>Namn:</strong> ${data.namn}</p>
        <p><strong>E-post:</strong> ${data.epost}</p>
        <p><strong>Telefon:</strong> ${data.telefon ?? "–"}</p>
        <p><strong>Typ av jobb:</strong> ${data.typ}</p>
        <p><strong>Kundtyp:</strong> ${data.kundtyp ?? "–"}</p>
        <p><strong>Beskrivning:</strong><br/>${data.beskrivning}</p>
        <p><strong>Budget:</strong> ${data.budget ?? "–"}</p>
        <p><strong>ROT-avdrag:</strong> ${data.rot ? "Ja" : "Nej"}</p>
        <p><strong>Postnummer:</strong> ${data.postnummer ?? "–"}</p>
        <p><strong>Önskat startdatum:</strong> ${data.onskatStartdatum ?? "–"}</p>
        <p><strong>Bilder:</strong></p>
        <ul>${bildLista}</ul>
      `,
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Kunde inte skicka e-post";
    return { ok: false, error: message };
  }
}
