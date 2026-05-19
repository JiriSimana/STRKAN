import type { Post } from '@/lib/supabase/types';
import { Reveal } from '@/components/motion/Reveal';
import { PostCard } from './PostCard';

type Props = {
  posts: Post[];
  featured?: boolean;
  emptyMessage?: string;
};

export function PostsGrid({
  posts,
  featured = false,
  emptyMessage = 'Zatím tu nic není. Brzy přibudou první články.',
}: Props) {
  if (posts.length === 0) {
    return (
      <div className="border border-dashed border-cloud bg-mist p-12 text-center type-body text-steel">
        {emptyMessage}
      </div>
    );
  }

  if (featured && posts.length >= 3) {
    const [first, ...rest] = posts;
    return (
      <div className="flex flex-col gap-16">
        <Reveal>
          <PostCard
            slug={first.slug}
            title={first.title}
            perex={first.perex}
            category={first.category}
            publishedAt={first.published_at ?? first.created_at}
            readingTime={first.reading_time}
            coverUrl={first.cover_url}
            size="large"
          />
        </Reveal>
        <ul className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <li key={post.id}>
              <Reveal delay={(i % 3) * 0.08}>
                <PostCard
                  slug={post.slug}
                  title={post.title}
                  perex={post.perex}
                  category={post.category}
                  publishedAt={post.published_at ?? post.created_at}
                  readingTime={post.reading_time}
                  coverUrl={post.cover_url}
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <ul className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, i) => (
        <li key={post.id}>
          <Reveal delay={(i % 3) * 0.08}>
            <PostCard
              slug={post.slug}
              title={post.title}
              perex={post.perex}
              category={post.category}
              publishedAt={post.published_at ?? post.created_at}
              readingTime={post.reading_time}
              coverUrl={post.cover_url}
            />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
