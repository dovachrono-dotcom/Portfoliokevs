import type { Metadata } from "next";
import { BlogArchive } from "@/components/features/blog/BlogArchive";
import { BLOG_POSTS } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Kevin's stories about building HerbalAI, getting through capstone problems, and life as a working student.",
};

export default function BlogPage() {
  return <BlogArchive title="Blog" description="Notes on building things, getting stuck, and balancing school with work." posts={BLOG_POSTS} />;
}
