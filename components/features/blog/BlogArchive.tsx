import Link from "next/link";
import { ScrollText } from "@/components/common/ScrollText";
import { BLOG_CATEGORIES, type BlogPost } from "@/lib/blog";
import { BlogList } from "./BlogList";
import styles from "./Blog.module.css";

type BlogArchiveProps = {
  title: string;
  description: string;
  posts: BlogPost[];
  activeCategory?: string;
};

export function BlogArchive({ title, description, posts, activeCategory = "all" }: BlogArchiveProps) {
  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <ScrollText as="h1">{title}</ScrollText>
        <ScrollText>{description}</ScrollText>
      </header>
      <nav aria-label="Blog categories" className={styles.categories}>
        <Link href="/blog" aria-current={activeCategory === "all" ? "page" : undefined}>All stories</Link>
        {BLOG_CATEGORIES.map((category) => (
          <Link key={category.id} href={`/blog/category/${category.id}`} aria-current={activeCategory === category.id ? "page" : undefined}>{category.label}</Link>
        ))}
      </nav>
      <BlogList posts={posts} />
    </div>
  );
}
