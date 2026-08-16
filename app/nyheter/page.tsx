import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Newspaper } from "lucide-react";
import { getCmsPosts } from "@/lib/cms";
import { SITE_URL, defaultMetadata } from "@/lib/seo";

const PAGE_TITLE = "Nyheter";
const PAGE_DESCRIPTION =
  "Senaste nyheterna och uppdateringarna från JJ Bygg & Entreprenad AB i Boden och Luleå.";

export const metadata: Metadata = {
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
};

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
      <section className="border-b border-primary/10 bg-primary py-16">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
            {PAGE_TITLE}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-primary-foreground/90">{PAGE_DESCRIPTION}</p>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto max-w-6xl px-4">
          {posts.length === 0 ? (
            <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-lg border border-primary/20 bg-card px-6 py-16 text-center shadow-sm">
              <span
                className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent"
                aria-hidden
              >
                <Newspaper className="h-6 w-6" strokeWidth={1.75} />
              </span>
              <h2 className="text-lg font-semibold text-foreground">Inga nyheter ännu</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Vi har inga nyheter publicerade just nu. Kom gärna tillbaka snart – eller följ oss för
                uppdateringar om pågående projekt.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => {
                const dateLabel = formatDate(post.publishedAt);
                return (
                  <Link
                    key={post.slug}
                    href={`/nyheter/${post.slug}`}
                    className="group flex flex-col overflow-hidden rounded-lg border border-primary/20 bg-card shadow-sm transition-shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                  >
                    {post.coverImage ? (
                      <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
                        <Image
                          src={post.coverImage}
                          alt={post.coverImageAlt ?? post.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    ) : null}
                    <div className="flex flex-1 flex-col p-6">
                      {dateLabel ? (
                        <time dateTime={post.publishedAt ?? undefined} className="text-xs font-medium uppercase tracking-wider text-accent">
                          {dateLabel}
                        </time>
                      ) : null}
                      <h2 className="mt-2 text-lg font-semibold text-foreground group-hover:text-primary">
                        {post.title}
                      </h2>
                      {post.excerpt ? (
                        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                          {post.excerpt}
                        </p>
                      ) : null}
                      <span className="mt-4 text-sm font-medium text-accent">Läs mer →</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
