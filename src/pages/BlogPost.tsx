import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import TopBar from "@/components/landing/TopBar";
import Footer from "@/components/landing/Footer";
import { RelatedLink, getPost, getRelated } from "@/data/blogPosts";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPost(slug) : undefined;

  useEffect(() => {
    if (!post) return;
    document.title = `${post.title} | Field Notes by Barry Brooksby`;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", post.excerpt);
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;

  const related = getRelated(post.slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Person", name: "Barry Brooksby" },
    articleSection: post.category,
  };

  return (
    <main className="bg-background min-h-screen">
      <TopBar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="section">
        <div className="container-prose">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1 text-ink-muted hover:text-foreground text-sm mb-10 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            All Essays
          </Link>

          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <span className="inline-flex items-center justify-center h-6 px-3 rounded-full bg-accent-primary text-background stat-label leading-none">
              {post.category}
            </span>
            <span className="text-xs text-ink-muted">{formatDate(post.date)}</span>
            <span className="text-xs text-ink-muted">· {post.readMinutes} min read</span>
          </div>

          <h1 className="h1-display mb-6">{post.title}</h1>
          <p className="lede mb-10">{post.excerpt}</p>

          <div className="hairline mb-10" />

          <div className="prose-body text-[17px]">{post.content}</div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section bg-bg-elevated">
          <div className="container-page">
            <p className="eyebrow mb-4">Keep Reading</p>
            <h2 className="h2-display mb-10">More Field Notes</h2>
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {related.map((r) => (
                <RelatedLink key={r.slug} post={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
};

export default BlogPost;
