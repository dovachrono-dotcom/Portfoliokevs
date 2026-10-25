import type { Metadata } from "next";
import { BlogArchive } from "@/components/features/blog/BlogArchive";
import { BLOG_POSTS, getCategoryLabel } from "@/lib/blog";

export const metadata: Metadata = { title: "Blog categories" };

export default async function CategoryPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const category = slug.join("/");
  const posts = BLOG_POSTS.filter((post) => post.category === category);
  return <BlogArchive title={posts.length ? getCategoryLabel(category) : "Category archive"} description="Stories from this part of my life." posts={posts} activeCategory={category} />;
}
