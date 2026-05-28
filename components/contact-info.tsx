import { Mail, MapPin, Phone, Percent } from "lucide-react";
import { siteContent } from "@/lib/site-content";
import { OffertPremiumCard } from "@/components/offert/offert-premium-card";

export function ContactInfo() {
  const { contact, contactSection } = siteContent;
  const telHref = `tel:${contact.phoneTelDigits}`;
  const mailHref = `mailto:${contact.email}`;

  return (
    <OffertPremiumCard>
      <section className="p-6 md:p-8" aria-labelledby="contact-info-heading">
        <h2
          id="contact-info-heading"
          className="text-center text-xl font-bold text-slate-900 md:text-2xl"
        >
          {contactSection.title}
        </h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-10">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              Kontaktuppgifter
            </h3>
            <p className="text-lg font-semibold text-slate-900">{contact.personName}</p>
            <ul className="space-y-3 text-sm text-slate-800">
              <li>
                <a
                  href={telHref}
                  className="inline-flex items-center gap-3 rounded-lg transition hover:text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Phone className="h-4 w-4" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-xs text-slate-500">Telefon</span>
                    <span className="font-medium">{contact.phoneDisplay}</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={mailHref}
                  className="inline-flex items-center gap-3 rounded-lg transition hover:text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Mail className="h-4 w-4" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-xs text-slate-500">E-post</span>
                    <span className="font-medium">{contact.email}</span>
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <MapPin className="h-4 w-4" aria-hidden />
                </span>
                <span>
                  <span className="block text-xs text-slate-500">Utgångspunkt</span>
                  <address className="not-italic font-medium text-slate-900">
                    {contact.address}
                  </address>
                </span>
              </li>
            </ul>
          </div>
          <div className="space-y-4 rounded-xl border border-slate-100 bg-slate-50/80 p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-50 text-accent">
                <Percent className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="font-semibold text-slate-900">{contactSection.rotTitle}</h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-600">{contactSection.rotBody}</p>
          </div>
        </div>
      </section>
    </OffertPremiumCard>
  );
}
