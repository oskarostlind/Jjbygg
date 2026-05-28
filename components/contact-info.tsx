import { Mail, MapPin, Phone, Percent } from "lucide-react";
import { siteContent } from "@/lib/site-content";

export function ContactInfo() {
  const { contact, contactSection } = siteContent;
  const telHref = `tel:${contact.phoneTelDigits}`;
  const mailHref = `mailto:${contact.email}`;

  return (
    <section
      className="rounded-xl border border-primary/20 bg-card p-6 shadow-sm md:p-8"
      aria-labelledby="contact-info-heading"
    >
      <h2
        id="contact-info-heading"
        className="text-center text-xl font-semibold text-primary md:text-2xl"
      >
        {contactSection.title}
      </h2>
      <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-10">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Kontaktuppgifter
          </h3>
          <p className="text-lg font-semibold text-foreground">{contact.personName}</p>
          <ul className="space-y-3 text-sm text-foreground">
            <li>
              <a
                href={telHref}
                className="inline-flex items-center gap-3 rounded-md text-foreground transition hover:text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Phone className="h-4 w-4" aria-hidden />
                </span>
                <span>
                  <span className="block text-xs text-muted-foreground">Telefon</span>
                  <span className="font-medium">{contact.phoneDisplay}</span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={mailHref}
                className="inline-flex items-center gap-3 rounded-md text-foreground transition hover:text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Mail className="h-4 w-4" aria-hidden />
                </span>
                <span>
                  <span className="block text-xs text-muted-foreground">E-post</span>
                  <span className="font-medium">{contact.email}</span>
                </span>
              </a>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <MapPin className="h-4 w-4" aria-hidden />
              </span>
              <span>
                <span className="block text-xs text-muted-foreground">Utgångspunkt</span>
                <address className="not-italic font-medium">{contact.address}</address>
              </span>
            </li>
          </ul>
        </div>
        <div className="space-y-4 rounded-lg border border-primary/10 bg-muted/40 p-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
              <Percent className="h-5 w-5" aria-hidden />
            </span>
            <h3 className="font-semibold text-foreground">{contactSection.rotTitle}</h3>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{contactSection.rotBody}</p>
        </div>
      </div>
    </section>
  );
}
