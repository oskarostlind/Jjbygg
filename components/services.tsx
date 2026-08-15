import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Paintbrush,
  Droplets,
  Fence,
  Home,
  ClipboardList,
} from "lucide-react";
import { siteContent } from "@/lib/site-content";
import type { ServiceIconKey } from "@/lib/site-content";
import { Card, CardContent } from "@/components/ui/card";
import { getCmsContent, cmsServices } from "@/lib/cms";

const SERVICE_ICONS: Record<ServiceIconKey, LucideIcon> = {
  nybyggnation: Building2,
  renovering: Paintbrush,
  badrum: Droplets,
  altan: Fence,
  tak: Home,
  entreprenad: ClipboardList,
};

export async function Services() {
  const { servicesTitle, services: fallbackServices } = siteContent.homePage;
  const content = await getCmsContent();
  const services = cmsServices(content, fallbackServices);

  return (
    <section className="border-t border-primary/10 bg-background py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-2xl font-semibold text-primary md:text-3xl">
          {servicesTitle}
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = SERVICE_ICONS[service.iconKey];
            return (
              <Card
                key={service.iconKey}
                className="border-primary/20 bg-card shadow-sm transition-shadow hover:shadow-md"
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <span
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
                      aria-hidden
                    >
                      <Icon className="h-6 w-6" strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-foreground">{service.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
