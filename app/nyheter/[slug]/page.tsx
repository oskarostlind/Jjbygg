import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getCmsPost } from "@/lib/cms";
import { renderMarkdownLite } from "@/lib/markdown-lite";
import { SITE_URL, defaultMetadata } from "@/lib/seo";

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
    <main className="bg-background py-12 md:py-16">
      <article className="mx-auto max-w-3xl px-4">
        <Link
          href="/nyheter"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary/70 hover:text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Alla nyheter
        </Link>

        <header className="mt-6">
          {dateLabel ? (
            <time dateTime={post.publishedAt ?? undefined} className="text-xs font-medium uppercase tracking-wider text-accent">
              {dateLabel}
            </time>
          ) : null}
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-primary md:text-4xl">{post.title}</h1>
          {post.excerpt ? (
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>
          ) : null}
        </header>

        {post.coverImage ? (
          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-lg bg-muted">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        ) : null}

        <div className="mt-8">{renderMarkdownLite(post.content)}</div>
      </article>
    </main>
  );
}
