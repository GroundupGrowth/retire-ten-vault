import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import TopBar from "@/components/landing/TopBar";
import Footer from "@/components/landing/Footer";
import { blogPosts } from "@/data/blogPosts";
import { stageOrder, stages } from "@/data/journeyStages";

type Entry = {
  path: string;
  title: string;
  description: string;
  hidden?: boolean;
};

type Group = {
  eyebrow: string;
  heading: string;
  entries: Entry[];
};

const groups: Group[] = [
  {
    eyebrow: "Landing",
    heading: "Top-of-funnel pages",
    entries: [
      {
        path: "/",
        title: "Call Funnel (Homepage)",
        description:
          "Title on top, big VSL, primary CTA opens the booking calendar popup. Secondary CTA lets users buy the book directly.",
      },
      {
        path: "/book",
        title: "Book Sales",
        description:
          "Same layout as /, but every CTA goes to the FastPayDirect checkout. Includes the Book JSON-LD schema for SEO.",
      },
      {
        path: "/test",
        title: "VSL-First Variant",
        description: "Centered hero with VSL front and center for testing against the homepage.",
      },
    ],
  },
  {
    eyebrow: "Blog",
    heading: "Field Notes",
    entries: [
      {
        path: "/blog",
        title: "Field Notes Hub",
        description: "Featured post + grid of essays.",
      },
      ...blogPosts.map((p) => ({
        path: `/blog/${p.slug}`,
        title: p.title,
        description: p.excerpt,
      })),
    ],
  },
  {
    eyebrow: "Quiz",
    heading: "Journey Funnel",
    entries: [
      {
        path: "/quiz",
        title: "Journey Quiz",
        description: "Five questions to map a reader to one of five stages.",
      },
      ...stageOrder.map((key) => {
        const s = stages[key];
        return {
          path: `/quiz/result/${key}`,
          title: `${s.badge} — ${s.title}`,
          description: s.tagline,
        };
      }),
      {
        path: "/journeyresults",
        title: "All Result Pages (Preview)",
        description:
          "Internal QA page listing every quiz result. Not linked from public navigation.",
        hidden: true,
      },
    ],
  },
  {
    eyebrow: "Tools",
    heading: "Calculators & Lead-Gen Tools",
    entries: [
      {
        path: "/tools",
        title: "Tools Hub",
        description: "Card grid of every tool.",
      },
      {
        path: "/tools/fire-calculator",
        title: "FIRE Calculator",
        description: "FI number + years to FI with a trajectory chart. Six inputs, all sliders.",
      },
      {
        path: "/tools/compound-interest-calculator",
        title: "Compound Interest Calculator",
        description:
          "Stacked-area chart separating contributions from interest. Year-by-year table underneath.",
      },
      {
        path: "/tools/401k-true-cost-calculator",
        title: "401(k) True Cost Calculator",
        description:
          "Projects how much a 401(k) quietly diverts to fees and taxes over time. Contrarian hook.",
      },
    ],
  },
  {
    eyebrow: "Confirmation",
    heading: "Post-conversion thank-you pages",
    entries: [
      {
        path: "/thank-you",
        title: "Strategy Session Thank You",
        description:
          "Redirect target after a booking is made in GHL. Confirmation + what-happens-next steps. Fires the Meta Pixel Lead event on mount.",
      },
      {
        path: "/book-thank-you",
        title: "Book Purchase Thank You",
        description:
          "Redirect target after a FastPayDirect purchase. Includes an embedded calendar so new readers can book a strategy call right away.",
      },
    ],
  },
  {
    eyebrow: "Internal",
    heading: "Admin / config",
    entries: [
      {
        path: "/settings",
        title: "Site Settings",
        description:
          "View and locally override the Meta Pixel ID and booking calendar URL. Overrides live in your browser only.",
        hidden: true,
      },
      {
        path: "/journeyresults",
        title: "All Quiz Result Pages",
        description: "Internal QA listing of every stage result. Not linked from public navigation.",
        hidden: true,
      },
    ],
  },
];

const isExternal = (path: string) => path.startsWith("http");

const Pages = () => (
  <main className="bg-background min-h-screen">
    <TopBar />
    <section className="section">
      <div className="container-page">
        <div className="mb-14 max-w-2xl">
          <p className="eyebrow mb-5">Internal · Send to Client</p>
          <h1 className="h1-display mb-6">All Pages</h1>
          <p className="lede">
            Every public page on the site, grouped. Click any link to open it in this tab. Use this
            URL to walk a client through the build.
          </p>
        </div>

        <div className="space-y-14 md:space-y-20">
          {groups.map((g) => (
            <div key={g.heading}>
              <div className="flex items-baseline justify-between mb-6 pb-4 border-b border-rule">
                <div>
                  <p className="eyebrow text-accent-primary mb-1">{g.eyebrow}</p>
                  <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground">
                    {g.heading}
                  </h2>
                </div>
                <p className="stat-label text-ink-muted">
                  {g.entries.length} page{g.entries.length === 1 ? "" : "s"}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                {g.entries.map((e) => {
                  const Wrapper = isExternal(e.path) ? "a" : Link;
                  const wrapperProps: Record<string, unknown> = isExternal(e.path)
                    ? { href: e.path, target: "_blank", rel: "noopener noreferrer" }
                    : { to: e.path };
                  return (
                    <Wrapper
                      key={e.path}
                      {...wrapperProps}
                      className="group block bg-background border border-rule rounded-[4px] p-5 md:p-6 transition-shadow hover:shadow-[0_12px_28px_rgba(28,26,23,0.08)]"
                    >
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="font-serif text-lg md:text-xl font-medium text-foreground leading-snug group-hover:text-accent-primary transition-colors">
                          {e.title}
                        </h3>
                        <ArrowUpRight className="h-4 w-4 flex-shrink-0 mt-1.5 text-ink-muted group-hover:text-accent-primary transition-colors" />
                      </div>
                      <p className="font-mono text-xs text-ink-muted mb-3 break-all">{e.path}</p>
                      <p className="text-[14px] text-ink-secondary leading-relaxed">
                        {e.description}
                      </p>
                      {e.hidden && (
                        <p className="mt-3 stat-label text-accent-primary">Hidden from nav</p>
                      )}
                    </Wrapper>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Link to="/" className="btn-secondary">
            Back to the homepage
          </Link>
        </div>
      </div>
    </section>
    <Footer />
  </main>
);

export default Pages;
