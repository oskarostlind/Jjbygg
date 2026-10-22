import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Newspaper } from "lucide-react";
import { getCmsPosts } from "@/lib/cms";
import { SITE_URL, defaultMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/page-header";

const PAGE_TITLE = "Nyheter";
const PAGE_DESCRIPTION =
  "Senaste nyheterna och uppdateringarna från JJ Bygg & Entreprenad AB i Boden och Luleå.";

export async function generateMetadata(): Promise<Metadata> {
  const posts = await getCmsPosts();
  return {
    ...defaultMetadata,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      url: `${SITE_URL}/nyheter`,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
    },
    alternates: {
      canonical: `${SITE_URL}/nyheter`,
    },
    // Tom nyhetssida = tunt innehåll. Indexera först när det finns inlägg.
    robots: posts.length > 0 ? { index: true, follow: true } : { index: false, follow: true },
  };
}

function formatDate(iso: string | null): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("sv-SE", { day: "numeric", month: "long", year: "numeric" }).format(date);
}

export default async function NyheterPage() {
  const posts = await getCmsPosts();

  return (
    <main>
      <PageHeader
        title={PAGE_TITLE}
        lead={PAGE_DESCRIPTION}
        crumbs={[{ href: "/", label: "Hem" }, { label: "Nyheter" }]}
      />

      <section className="bg-sand py-12 md:py-16">
        <div className="wrap">
          {posts.length === 0 ? (
            <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-12 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded bg-sand-deep text-brand-strong" aria-hidden>
                <Newspaper className="h-7 w-7" strokeWidth={1.75} />
              </span>
              <h2 className="font-display text-xl font-bold text-graphite">Inga nyheter ännu</h2>
              <p className="text-[0.9375rem] leading-relaxed text-ink-muted">
                Vi har inga nyheter publicerade just nu. Kom gärna tillbaka snart – eller följ oss för
                uppdateringar om pågående projekt.
              </p>
            </div>
          ) : (
            <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => {
                const dateLabel = formatDate(post.publishedAt);
                return (
                  <li key={post.slug} className="group relative flex flex-col">
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-sand-deep">
                      {post.coverImage ? (
                        <Image
                          src={post.coverImage}
                          alt={post.coverImageAlt ?? ""}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-concrete" aria-hidden>
                          <Newspaper className="h-10 w-10" strokeWidth={1.5} />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col pt-5">
                      {dateLabel ? (
                        <time dateTime={post.publishedAt ?? undefined} className="text-sm font-medium text-ink-muted">
                          {dateLabel}
                        </time>
                      ) : null}
                      <h2 className="mt-2 font-display text-xl font-bold leading-tight text-graphite group-hover:text-brand-strong">
                        <Link
                          href={`/nyheter/${post.slug}`}
                          className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:underline"
                        >
                          {post.title}
                        </Link>
                      </h2>
                      {post.excerpt ? (
                        <p className="mt-2 line-clamp-3 text-[0.9375rem] leading-relaxed text-ink-muted">
                          {post.excerpt}
                        </p>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}
