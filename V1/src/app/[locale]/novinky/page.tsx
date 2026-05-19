import { getAllPosts } from '@/lib/blog';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Novinky',
  description: 'Přečtěte si nejnovější aktuality, technologické inovace a probíhající projekty z výroby STRKAN s.r.o.',
};

export const revalidate = 3600; // ISR revalidation every 1 hour

export default async function BlogListingPage() {
  const posts = await getAllPosts();

  return (
    <div className="flex flex-col">
      <section className="bg-brand-dark-blue text-white py-20 pt-32">
        <Container>
          <h1 className="text-display font-bold text-white animate-fade-in">Novinky</h1>
          <div className="h-1 w-20 bg-brand-sky-blue mt-6 animate-fade-in" style={{ animationDelay: '0.2s' }} />
        </Container>
      </section>

      <section className="py-24 bg-white">
        <Container>
          <SectionHeading 
            title="Aktuality ze světa STRKAN" 
            subtitle="Přečtěte si nejnovější zprávy z našeho provozu, informace o realizovaných projektech a oborové aktuality."
          />
          
          {posts.length === 0 ? (
            <div className="py-16 text-center bg-brand-clean-gray border border-brand-gray/20">
              <p className="text-xl text-brand-dark-blue font-bold">Zatím nebyly publikovány žádné články.</p>
              <p className="text-brand-gray mt-2">Doplňte obsah v Supabase databázi do tabulky `posts`.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {posts.map((post) => (
                <div key={post.id} className="h-full">
                  <span className="inline-block px-3 py-1 bg-[#F2F2F2] text-brand-dark-blue text-xs font-bold uppercase tracking-wider mb-2">
                    {post.category || 'Novinky'}
                  </span>
                  <p className="text-brand-gray text-xs mb-3 font-semibold">
                    {new Date(post.published_at).toLocaleDateString('cs-CZ')}
                  </p>
                  <Card 
                    title={post.title}
                    description={post.perex}
                    href={`/novinky/${post.slug}`}
                    className="border-none bg-transparent shadow-none hover:shadow-none !p-0"
                  />
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
