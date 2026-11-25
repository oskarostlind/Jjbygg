import Link from "next/link";
import { ArrowRight, CalendarRange, FileCheck2, MapPin } from "lucide-react";
import { siteContent } from "@/lib/site-content";
import { BODEN_SECTION, locationHref } from "@/lib/locations-content";
import { SERVICE_PAGES } from "@/lib/services-content";
import { serviceLocationPagesIn } from "@/lib/service-location-content";
import { SectionHeading } from "@/components/section-heading";
import { ServiceIcon } from "@/components/service-icon";

/** En ikon per ämne i BODEN_SECTION.topics (samma ordning). */
const TOPIC_ICONS = [MapPin, CalendarRange, FileCheck2];

/**
 * "Byggföretag i Boden" – startsidans ortsavsnitt (#boden). Ersätter den
 * tidigare sidan /byggfirma/boden, som nu redirectar hit: startsidan är sajtens
 * enda sida för "byggföretag/byggfirma i Boden". Texten ligger i
 * lib/locations-content.ts (BODEN_SECTION); frågorna om Boden visas i
 * startsidans gemensamma FAQ-lista (app/page.tsx).
 */
export function BodenSection() {
  const { company, contact, footer } = siteContent;
  const services = serviceLocationPagesIn("boden").map((page) => ({
    href: `/tjanster/${page.service}/${page.location}`,
    label: page.h1,
    iconKey: SERVICE_PAGES.find((service) => service.slug === page.service)?.iconKey,
  }));

  const facts = [
    { term: "Organisationsnummer", value: footer.orgNumber },
    { term: "Bolaget registrerat", value: company.foundingYear },
    { term: "Skatteregistrering", value: company.taxStatus },
    { term: "Adress", value: contact.address },
  ];

  return (
    <section id="boden" className="bg-paper py-16 md:py-24" aria-labelledby="boden-heading">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeading id="boden-heading" title={BODEN_SECTION.heading} intro={BODEN_SECTION.intro} />
          </div>

          <div className="lg:col-span-7">
            <div className="max-w-prose space-y-5 text-[1.0625rem] leading-[1.7] text-graphite">
              {BODEN_SECTION.paragraphs.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </div>
            <dl className="mt-8 grid max-w-prose grid-cols-1 gap-x-8 border-t border-line sm:grid-cols-2">
              {facts.map((fact) => (
                <div key={fact.term} className="border-b border-line py-3.5">
                  <dt className="text-sm text-ink-muted">{fact.term}</dt>
                  <dd className="mt-0.5 font-display font-bold text-graphite">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-14 grid gap-x-12 gap-y-12 md:mt-20 md:grid-cols-3">
          {BODEN_SECTION.topics.map((topic, i) => {
            const Icon = TOPIC_ICONS[i] ?? MapPin;
            return (
              <div key={topic.heading}>
                <span
                  className="flex h-11 w-11 items-center justify-center rounded bg-sand-deep text-brand-strong"
                  aria-hidden
                >
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold leading-tight text-graphite">{topic.heading}</h3>
                {topic.paragraphs.map((text, j) => (
                  <p key={j} className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">
                    {text}
                  </p>
                ))}
              </div>
            );
          })}
        </div>

        <div className="mt-14 rounded-lg bg-sand p-6 md:mt-20 md:p-10">
          <h3 className="font-display text-xl font-bold leading-tight text-graphite">Det här gör vi i Boden</h3>
          <ul className="mt-5 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <li key={service.href} className="border-t border-line">
                <Link
                  href={service.href}
                  className="group flex items-center gap-3 py-3.5 font-medium text-graphite transition-colors hover:text-brand-strong"
                >
                  {service.iconKey ? (
                    <ServiceIcon iconKey={service.iconKey} size="sm" className="h-9 w-9 bg-sand-deep [&>svg]:h-4 [&>svg]:w-4" />
                  ) : null}
                  <span className="flex-1">{service.label}</span>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 text-concrete transition-transform group-hover:translate-x-0.5 group-hover:text-brand-strong"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-prose text-[0.9375rem] leading-relaxed text-ink-muted">
            Bor du i Luleå eller längre bort? Läs om hur vi arbetar som{" "}
            <Link href={locationHref("lulea")} className="link">
              byggföretag i Luleå
            </Link>{" "}
            och som{" "}
            <Link href={locationHref("norrbotten")} className="link">
              byggfirma i övriga Norrbotten
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
