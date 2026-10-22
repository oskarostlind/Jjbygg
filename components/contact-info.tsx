import { Mail, MapPin, Phone } from "lucide-react";
import { siteContent } from "@/lib/site-content";

/**
 * Kontaktuppgifter bredvid offertformuläret: hellre ringa än fylla i? Här
 * finns Jesper direkt. ROT-informationen ligger under.
 */
export function ContactInfo() {
  const { contact, contactSection } = siteContent;
  const telHref = `tel:${contact.phoneTelDigits}`;
  const mailHref = `mailto:${contact.email}`;

  const row =
    "group flex items-center gap-4 rounded py-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-strong focus-visible:ring-offset-2 focus-visible:ring-offset-sand";
  const iconBox =
    "flex h-11 w-11 shrink-0 items-center justify-center rounded bg-sand-deep text-brand-strong transition-colors group-hover:bg-brand-tint";

  return (
    <section aria-labelledby="contact-info-heading">
      <h2 id="contact-info-heading" className="font-display text-xl font-bold text-graphite">
        {contactSection.title}
      </h2>
      <ul className="mt-4 divide-y divide-line border-y border-line">
        <li>
          <a href={telHref} className={row}>
            <span className={iconBox}>
              <Phone className="h-5 w-5" aria-hidden />
            </span>
            <span className="min-w-0">
              <span className="block text-sm text-ink-muted">Ring {contact.personName.split(" ")[0]}</span>
              <span className="font-display text-lg font-bold text-graphite group-hover:text-brand-strong">
                {contact.phoneDisplay}
              </span>
            </span>
          </a>
        </li>
        <li>
          <a href={mailHref} className={row}>
            <span className={iconBox}>
              <Mail className="h-5 w-5" aria-hidden />
            </span>
            <span className="min-w-0">
              <span className="block text-sm text-ink-muted">E-post</span>
              <span className="break-all font-semibold text-graphite group-hover:text-brand-strong">{contact.email}</span>
            </span>
          </a>
        </li>
        <li className="flex items-center gap-4 py-3">
          <span className={iconBox}>
            <MapPin className="h-5 w-5" aria-hidden />
          </span>
          <span className="min-w-0">
            <span className="block text-sm text-ink-muted">Utgångspunkt</span>
            <address className="font-semibold not-italic text-graphite">{contact.address}</address>
          </span>
        </li>
      </ul>

      <div className="mt-6 rounded-lg bg-sand-deep p-5">
        <h3 className="font-display text-base font-bold text-graphite">{contactSection.rotTitle}</h3>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">{contactSection.rotBody}</p>
      </div>
    </section>
  );
}
