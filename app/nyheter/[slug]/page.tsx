export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getCmsPost } from "@/lib/cms";
import { renderMarkdownLite } from "@/lib/markdown-lite";
import { SITE_URL, defaultMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/breadcrumbs";

type Props = {
  params: { slug: string };
};

function formatDate(iso: string | null): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("sv-SE", { day: "numeric", month: "long", year: "numeric" }).format(date);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getCmsPost(params.slug);

  if (!post) {
    return {
      ...defaultMetadata,
      title: "Nyheten hittades inte",
    };
  }

  const description = post.excerpt ?? defaultMetadata.description ?? "";
  const url = `${SITE_URL}/nyheter/${post.slug}`;

  return {
    ...defaultMetadata,
    title: post.title,
    description,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: post.title,
      description,
      url,
      type: "article",
      images: post.coverImage ? [{ url: post.coverImage }] : defaultMetadata.openGraph?.images,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: post.title,
      description,
      images: post.coverImage ? [post.coverImage] : defaultMetadata.twitter?.images,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function NyhetPage({ params }: Props) {
  const post = await getCmsPost(params.slug);

  if (!post) {
    notFound();
  }

  const dateLabel = formatDate(post.publishedAt);

  return (
    <main className="bg-sand">
      <article>
        <header className="border-b border-line bg-sand-deep">
          <div className="wrap py-10 md:py-14">
            <Breadcrumbs
              items={[{ href: "/", label: "Hem" }, { href: "/nyheter", label: "Nyheter" }, { label: post.title }]}
              className="mb-6"
            />
            {dateLabel ? (
              <time dateTime={post.publishedAt ?? undefined} className="block text-sm font-medium text-ink-muted">
                {dateLabel}
              </time>
            ) : null}
            <h1 className="display mt-3 max-w-4xl text-display-lg text-graphite">{post.title}</h1>
            {post.excerpt ? (
              <p className="mt-5 max-w-prose text-lg leading-relaxed text-ink-muted md:text-xl">{post.excerpt}</p>
            ) : null}
          </div>
        </header>

        <div className="wrap py-10 md:py-14">
          <div className="mx-auto max-w-prose">
            {post.coverImage ? (
              <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-lg bg-sand-deep">
                <Image
                  src={post.coverImage}
                  alt={post.coverImageAlt ?? ""}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 672px"
                  priority
                />
              </div>
            ) : null}

            {/* CMS:et renderar brödtexten åt oss (med kundens formatering);
                renderMarkdownLite är kvar som fallback för äldre CMS-svar. */}
            {post.contentHtml ? (
              <div className="cms-rich" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
            ) : (
              <div className="cms-rich">{renderMarkdownLite(post.content)}</div>
            )}

            <p className="mt-12 border-t border-line pt-6">
              <Link href="/nyheter" className="link inline-flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" aria-hidden />
                Alla nyheter
              </Link>
            </p>
          </div>
        </div>
      </article>
    </main>
  );
}
