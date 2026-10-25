import type { Metadata } from "next";
import { BlogArchive } from "@/components/features/blog/BlogArchive";
import { BLOG_POSTS } from "@/lib/blog";

export const metadata: Metadata = { title: "Blog archive" };

export default async function FilterPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug = [] } = await params;
  const valid = slug.length <= 3 && (!slug.length || /^\d{4}$/.test(slug[0])) && (slug.length < 2 || /^(0?[1-9]|1[0-2])$/.test(slug[1])) && (slug.length < 3 || /^(0?[1-9]|[12]\d|3[01])$/.test(slug[2]));
  const datePrefix = slug.map((part, index) => index ? part.padStart(2, "0") : part).join("-");
  const posts = valid ? BLOG_POSTS.filter((post) => post.publishedAt.startsWith(datePrefix)) : [];
  return <BlogArchive title="Blog archive" description={slug.length ? `Stories for ${slug.join(" / ")}.` : "All stories, from the latest entry onward."} posts={posts} />;
}
