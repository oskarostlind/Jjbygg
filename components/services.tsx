import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteContent } from "@/lib/site-content";
import { getCmsContent, cmsServices } from "@/lib/cms";
import { servicePageByIconKey } from "@/lib/services-content";
import { SectionHeading } from "@/components/section-heading";
import { ServiceIcon } from "@/components/service-icon";

export async function Services() {
  const { servicesTitle, services: fallbackServices } = siteContent.homePage;
  const content = await getCmsContent();
  const services = cmsServices(content, fallbackServices);

  return (
    <section className="bg-sand py-16 md:py-24" aria-labelledby="tjanster-heading">
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <SectionHeading
            id="tjanster-heading"
            title={servicesTitle}
            intro="Allt från en ny altan till en hel tillbyggnad. Vi tar hand om projektet från första skiss till slutbesked."
          />
          <Link href="/tjanster" className="link mt-6 hidden lg:inline-flex lg:items-center lg:gap-1.5">
            Alla tjänster
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <ul className="grid gap-x-8 sm:grid-cols-2 lg:col-span-8">
          {services.map((service) => {
            const page = servicePageByIconKey(service.iconKey);
            return (
              <li
                key={service.iconKey}
                className="group relative flex gap-4 border-t border-line py-6 sm:py-7"
              >
                <ServiceIcon iconKey={service.iconKey} size="sm" className="mt-0.5 transition-colors group-hover:bg-brand-tint" />
                <div className="min-w-0">
                  <h3 className="font-display text-xl font-bold leading-tight text-graphite">
                    {page ? (
                      <Link
                        href={`/tjanster/${page.slug}`}
                        className="after:absolute after:inset-0 after:content-[''] group-hover:text-brand-strong focus-visible:outline-none focus-visible:underline"
                      >
                        {service.title}
                      </Link>
                    ) : (
                      service.title
                    )}
                  </h3>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-muted">
                    {service.description}
                  </p>
                  {page ? (
                    <span
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-strong"
                      aria-hidden
                    >
                      Läs mer
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>

        <p className="lg:hidden">
          <Link href="/tjanster" className="link inline-flex items-center gap-1.5">
            Alla tjänster
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </p>
      </div>
    </section>
  );
}
