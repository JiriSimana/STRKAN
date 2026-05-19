import { getPostBySlug } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link } from '@/i18n/navigation';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return { title: 'Článek nenalezen' };
  }
  return {
    title: post.title,
    description: post.perex,
  };
}

export const revalidate = 3600;

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // schema.org Article
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.perex,
    "datePublished": post.published_at,
    "author": {
      "@type": "Organization",
      "name": "STRKAN s.r.o."
    }
  };

  return (
    <div className="flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      <section className="bg-brand-dark-blue text-white py-20 pt-32">
        <Container className="max-w-4xl">
          <div className="flex items-center space-x-4 mb-6">
            <span className="inline-block px-3 py-1 bg-brand-sky-blue text-brand-dark-blue text-xs font-bold uppercase tracking-wider">
              {post.category || 'Zpráva'}
            </span>
            <time dateTime={post.published_at} className="text-brand-gray font-semibold text-sm">
              {new Date(post.published_at).toLocaleDateString('cs-CZ', {
                day: 'numeric', month: 'long', year: 'numeric'
              })}
            </time>
          </div>
          <h1 className="text-[2.5rem] md:text-display font-bold text-white animate-fade-in leading-tight">
            {post.title}
          </h1>
        </Container>
      </section>

      <section className="py-24 bg-white">
        <Container className="max-w-4xl">
          
          <div className="text-xl text-brand-gray font-bold leading-relaxed mb-12 border-l-4 border-brand-sky-blue pl-6">
            {post.perex}
          </div>

          <div className="prose prose-lg prose-headings:text-brand-dark-blue prose-headings:font-bold prose-p:text-brand-gray prose-a:text-brand-sky-blue max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content_md}
            </ReactMarkdown>
          </div>

          <div className="mt-20 pt-10 border-t border-brand-clean-gray">
            <Link href="/novinky" className="text-brand-sky-blue font-bold uppercase text-sm tracking-wider hover:text-brand-dark-blue transition-colors">
              ← Zpět na všechny novinky
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
