import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import TopBar from "@/components/landing/TopBar";
import Footer from "@/components/landing/Footer";
import { blogPosts } from "@/data/blogPosts";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

const Blog = () => {
  useEffect(() => {
    document.title = "Field Notes | Live Rich, Die Rich by Barry Brooksby";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        "content",
        "Essays from Barry Brooksby on retiring in 10 years, the infrastructure piece most investors miss, and what 17 years of real estate taught him.",
      );
    }
  }, []);

  const [featured, ...rest] = blogPosts;

  return (
    <main className="bg-background min-h-screen">
      <TopBar />
      <section className="section">
        <div className="container-page">
          <div className="mb-14 max-w-2xl">
            <p className="eyebrow mb-6">Field Notes</p>
            <h1 className="h1-display mb-6">Essays, Not Articles.</h1>
            <p className="lede">
              Short reads from Barry on the portfolio, the framework, and the infrastructure piece
              most people miss. Written for the reader who wants to know the math before they buy
              the book.
            </p>
          </div>

          {featured && (
            <Link
              to={`/blog/${featured.slug}`}
              className="group block bg-background border border-rule border-t-[3px] border-t-accent-primary rounded-[4px] p-8 md:p-12 mb-12 transition-shadow hover:shadow-[0_14px_36px_rgba(28,26,23,0.10)]"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center justify-center h-6 px-3 rounded-full bg-accent-primary text-background stat-label leading-none">
                  Featured
                </span>
                <span className="stat-label text-ink-muted">{featured.category}</span>
                <span className="text-xs text-ink-muted">{formatDate(featured.date)}</span>
                <span className="text-xs text-ink-muted">· {featured.readMinutes} min read</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4 leading-tight group-hover:text-accent-primary transition-colors">
                {featured.title}
              </h2>
              <p className="text-ink-secondary text-[17px] leading-relaxed mb-5 max-w-3xl">
                {featured.excerpt}
              </p>
              <span className="inline-flex items-center gap-1.5 text-accent-primary font-medium text-sm transition-transform group-hover:translate-x-0.5">
                Read the essay <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          )}

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {rest.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group block bg-background border border-rule rounded-[4px] p-8 transition-shadow hover:shadow-[0_14px_36px_rgba(28,26,23,0.10)]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="stat-label text-ink-muted">{post.category}</span>
                  <span className="text-xs text-ink-muted">{formatDate(post.date)}</span>
                  <span className="text-xs text-ink-muted">· {post.readMinutes} min</span>
                </div>
                <h3 className="font-serif text-2xl font-medium text-foreground mb-3 leading-snug group-hover:text-accent-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-ink-secondary text-[16px] leading-relaxed mb-5">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-1.5 text-accent-primary font-medium text-sm transition-transform group-hover:translate-x-0.5">
                  Read <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-20 text-center">
            <Link to="/" className="btn-secondary">
              Back to the Book
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Blog;
