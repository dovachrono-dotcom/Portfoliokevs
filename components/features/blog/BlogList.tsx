import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { BLOG_POSTS, formatPostDate, getCategoryLabel, getReadingMinutes, type BlogPost } from "@/lib/blog";
import styles from "./Blog.module.css";

export function BlogList({ posts = BLOG_POSTS }: { posts?: BlogPost[] }) {
  if (!posts.length) {
    return <div className={styles.empty}><p>No stories here yet.</p><Link href="/blog">Read all stories</Link></div>;
  }

  const layout = posts.length === 1 ? "single" : posts.length === 2 ? "pair" : "featured";

  return (
    <ul className={styles.storyList} data-layout={layout}>
      {posts.map((post, index) => {
        const featured = index === 0 && layout !== "pair";
        const titleId = `story-title-${post.slug}`;
        const excerptId = `story-excerpt-${post.slug}`;
        const sizes = layout === "single" ? "(max-width: 1200px) 90vw, 1100px" : featured ? "(max-width: 850px) 90vw, (max-width: 1200px) 58vw, 680px" : "(max-width: 850px) 90vw, (max-width: 1200px) 40vw, 550px";

        return <li key={post.slug} className={featured ? styles.featuredStory : undefined}>
          <article className={styles.story}>
            <Link href={`/blog/${post.slug}`} className={styles.storyLink} aria-labelledby={titleId} aria-describedby={featured ? excerptId : undefined}>
              <Image src={post.cover.src} alt={post.cover.alt} fill sizes={sizes} priority={index === 0}
                className={styles.coverImage} style={{ objectPosition: post.cover.position ?? "center", "--story-image-scale": post.cover.scale ?? 1 } as CSSProperties} />
              <span className={styles.coverScrim} aria-hidden="true" />
              <span className={styles.storyCategory}>{getCategoryLabel(post.category)}</span>
              <div className={styles.storyContent}>
                <h2 id={titleId}>{post.title}</h2>
                {featured && <p id={excerptId} className={styles.storyExcerpt}>{post.excerpt}</p>}
                <div className={styles.storyBottom}>
                  <div className={styles.storyMeta}>
                    <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
                    <span>{getReadingMinutes(post)} min read</span>
                  </div>
                  <ArrowUpRight size={20} className={styles.storyArrow} aria-hidden="true" />
                </div>
              </div>
            </Link>
          </article>
        </li>;
      })}
    </ul>
  );
}
