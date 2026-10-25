import Link from "next/link";
import Image from "next/image";
import { ScrollText } from "@/components/common/ScrollText";
import { BLOG_POSTS, formatPostDate, getCategoryLabel, getReadingMinutes, type BlogPost } from "@/lib/blog";
import { PORTFOLIO } from "@/lib/portfolio";
import styles from "./Blog.module.css";

export function BlogDetails({ post }: { post: BlogPost }) {
  const relatedPosts = BLOG_POSTS.filter((item) => item.slug !== post.slug);

  return (
    <div className={styles.postPage}>
      <Link href="/blog" className={styles.backLink}>Back to all stories</Link>
      <article className={styles.post}>
        <header className={styles.postHeader}>
          <Link href={`/blog/category/${post.category}`} className={styles.categoryLink}>{getCategoryLabel(post.category)}</Link>
          <ScrollText as="h1">{post.title}</ScrollText>
          <ScrollText className={styles.lead}>{post.excerpt}</ScrollText>
          <div className={styles.storyMeta}>
            <span>{PORTFOLIO.name}</span>
            <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
            <span>{getReadingMinutes(post)} min read</span>
          </div>
        </header>
        {post.photo && <figure className={styles.postPhoto}>
          <Image src={post.photo.src} alt={post.photo.alt} width={post.photo.width} height={post.photo.height}
            sizes="(max-width: 850px) 90vw, 760px" />
          <figcaption>{post.photo.caption}</figcaption>
        </figure>}
        {post.video && <figure className={styles.postVideo}>
          <video controls playsInline preload="none" poster={post.video.poster}
            width={post.video.width} height={post.video.height}
            aria-label={post.video.label} aria-describedby={`${post.slug}-video-caption`}>
            <source src={post.video.src} type="video/mp4" />
            Your browser does not support this video. <a href={post.video.src}>Open the video</a>.
          </video>
          <figcaption id={`${post.slug}-video-caption`}>{post.video.caption}</figcaption>
        </figure>}
        <div className={styles.prose}>
          {post.sections.map((section, index) => (
            <section key={section.heading ?? "introduction"} aria-labelledby={section.heading ? `story-section-${index}` : undefined}>
              {section.heading && <ScrollText as="h2" id={`story-section-${index}`}>{section.heading}</ScrollText>}
              {section.paragraphs.map((paragraph) => <ScrollText key={paragraph}>{paragraph}</ScrollText>)}
            </section>
          ))}
        </div>
      </article>
      <aside aria-labelledby="more-stories-heading" className={styles.moreStories}>
        <ScrollText as="h2" id="more-stories-heading">More stories</ScrollText>
        {relatedPosts.map((item) => <Link key={item.slug} href={`/blog/${item.slug}`}>{item.title}</Link>)}
      </aside>
    </div>
  );
}
