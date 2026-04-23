import type { ReactNode } from "react";
import { Link } from "react-router-dom";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readMinutes: number;
  category: string;
  content: ReactNode;
};

const BookCTA = () => (
  <div className="mt-12 bg-bg-elevated border border-rule border-t-[3px] border-t-accent-primary rounded-[4px] p-7 md:p-10">
    <p className="eyebrow text-accent-primary mb-3">The Full Playbook</p>
    <h3 className="font-serif text-xl md:text-2xl font-medium text-foreground mb-3 leading-snug">
      Want the framework this post is built on?
    </h3>
    <p className="text-ink-secondary text-[16px] leading-relaxed mb-6">
      <em>Live Rich, Die Rich</em> is Barry's 17-year playbook for retiring in 10 years — the
      portfolio, the framework, and the infrastructure piece nobody told you about.
    </p>
    <a
      href="https://link.fastpaydirect.com/payment-link/69e6335e7dd3512d9207788d"
      target="_blank"
      rel="noopener noreferrer"
      className="btn-primary"
    >
      Get the Book $19.97
    </a>
  </div>
);

export const blogPosts: BlogPost[] = [
  {
    slug: "why-the-4-percent-rule-wasnt-written-for-you",
    title: "Why the 4% Rule Wasn't Written for You",
    excerpt:
      "The Trinity Study is great math for a specific kind of retiree. If you're not that retiree, the rule is a suggestion, not a plan.",
    date: "2026-03-12",
    readMinutes: 5,
    category: "Framework",
    content: (
      <>
        <p>
          The 4% rule shows up in every retirement conversation like gravity. It's not gravity. It's
          a paper. William Bengen published it in 1994 after looking at a specific window of U.S.
          stock and bond returns, a specific portfolio mix, and a specific retirement length. The
          rule that fell out of that math — you can withdraw 4% of your portfolio in year one and
          adjust for inflation — has been treated ever since like a universal law.
        </p>
        <p>It's not. It's a rule of thumb for a very specific person.</p>

        <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mt-10 mb-4">
          The assumptions hiding in the 4%
        </h2>
        <p>
          Bengen's study assumed a 30-year retirement, starting at 65. It assumed a 50/50 or 60/40
          portfolio of U.S. equities and intermediate treasuries. It assumed the retiree rode out
          every downturn without touching the asset mix. And it was backward-looking — it tested
          the rule against history, not future market conditions.
        </p>
        <p>
          Every one of those assumptions changes the rule. If your retirement is 40 years long
          instead of 30 (you're retiring at 50, not 65), the safe rate drops closer to 3%. If U.S.
          equities return less than their historical average for the first decade of your
          retirement — which is called "sequence of returns risk," and it is the thing that actually
          ruins early retirees — 4% is too high. Bengen himself has updated his own number several
          times.
        </p>

        <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mt-10 mb-4">
          What the rule quietly asks of you
        </h2>
        <p>
          Run the 4% rule on $80,000 of annual expenses. You need $2 million. If you're making
          $150k a year, saving 20% of it, and earning 7% real returns on a 401(k), the math says
          you'll hit $2 million in roughly 24 years. That's not retiring in 10. That's retiring in
          24 — if the market cooperates, if your expenses don't drift, and if nothing about your
          life surprises you.
        </p>
        <p>
          That's the unspoken trade the 4% rule asks you to make. A long enough runway and a
          cooperative enough market, and the math works. For most high earners doing the responsible
          things, it's a 25- or 30-year plan dressed up as a 10-year goal.
        </p>

        <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mt-10 mb-4">
          What changes the picture
        </h2>
        <p>
          Two things change it. The first is the asset. Real estate doesn't follow the same
          withdrawal mechanics as a stock portfolio. A property throwing off $4,000 a month of
          rent isn't governed by a 4% rule — it's governed by whether the tenant pays and whether
          the roof holds. Income-producing assets you control flip the question from "how big is
          the pile" to "how reliable is the stream."
        </p>
        <p>
          The second is what happens underneath the asset — the place you warehouse capital between
          deals, the place you store reserves so a bad year doesn't force a sale. That's a separate
          piece most people don't have. Most retirement plans skip it entirely.
        </p>
        <p>
          The 4% rule isn't wrong. It's just narrow. It answers a question — how much can this one
          kind of portfolio safely spend down — that isn't the question most 35-year-olds wanting
          to retire in 10 years are actually asking.
        </p>

        <BookCTA />
      </>
    ),
  },
  {
    slug: "infrastructure-piece-most-investors-dont-see",
    title: "The Infrastructure Piece Most Real Estate Investors Don't See",
    excerpt:
      "Everyone obsesses over the asset. The wealthy obsess over what sits underneath it. That's the piece that compounds everything else.",
    date: "2026-02-20",
    readMinutes: 6,
    category: "The Vault",
    content: (
      <>
        <p>
          I've watched hundreds of real estate investors over 17 years. The ones who scale look
          different from the ones who stall — not in their deals, but in what sits underneath their
          deals.
        </p>
        <p>
          The stallers have a property, a spreadsheet, and a savings account. When the next
          opportunity shows up, they have to choose: take equity out of the property (slow, capped,
          expensive), borrow from a bank (slow, underwritten, capped), or pass. Most of them pass.
          Opportunities don't wait.
        </p>
        <p>
          The ones who scale have something else. They have an infrastructure piece. A pool of
          capital that stays liquid, compounds while it sits, and can be deployed into the next
          deal without asking a bank for permission. Most of them didn't build it on purpose the
          first time. They saw someone else using it and copied the structure.
        </p>

        <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mt-10 mb-4">
          What the infrastructure actually does
        </h2>
        <p>Three things. All boring. All compounding.</p>
        <p>
          <strong>It earns while it waits.</strong> Most people's reserve money sits in a checking
          account earning nothing. The infrastructure piece earns a contractual rate — modest, but
          contractual — whether you use it or not.
        </p>
        <p>
          <strong>It's liquid without a liquidity penalty.</strong> You can pull capital out to
          fund a deal without selling anything, without triggering a tax event, and without waiting
          on a bank's underwriting window.
        </p>
        <p>
          <strong>It keeps compounding even when you've pulled money out.</strong> This is the part
          that takes most people two reads to believe. The structure is designed so that your
          withdrawal doesn't zero out the growth of the account it came from. Wealthy families
          have used this for 150 years for exactly this reason.
        </p>

        <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mt-10 mb-4">
          Why most investors never see it
        </h2>
        <p>
          Because financial media covers asset classes. It covers stocks, bonds, crypto, REITs,
          syndication deals. It doesn't cover the <em>plumbing</em> underneath your portfolio. The
          plumbing is unglamorous. There's no cover story about warehousing capital.
        </p>
        <p>
          The other reason: the institutions that actually sell the infrastructure piece don't
          advertise it the way a brokerage advertises index funds. You usually find it because
          someone richer than you, someone older than you, and someone less worried than you about
          retirement mentions it in passing.
        </p>

        <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mt-10 mb-4">
          What it changes about your timeline
        </h2>
        <p>
          Short version: it cuts the dead time. Most investors spend 30–50% of their investing life
          waiting — for a deal, for financing, for reserves to rebuild. The infrastructure piece
          shrinks that dead time toward zero. Capital is ready when the deal shows up. You don't
          miss the ones you'd otherwise pass on.
        </p>
        <p>
          Ten years is a realistic timeline for someone with a decent income and an average asset
          strategy <em>and</em> this piece underneath. Without it, the same person needs 20+ years
          to get to the same place.
        </p>
        <p>
          I walk through exactly how the structure works, how it integrates with real estate, and
          how I use it in my own portfolio in the book.
        </p>

        <BookCTA />
      </>
    ),
  },
  {
    slug: "what-2008-taught-me-about-reserves",
    title: "What 2008 Taught Me About Cash Reserves",
    excerpt:
      "In 2008, the deals didn't kill people. The lack of reserves killed people. That's the difference between investors who survived and investors who didn't.",
    date: "2026-01-15",
    readMinutes: 4,
    category: "Lessons",
    content: (
      <>
        <p>
          I started investing in real estate before 2008. I lived through 2008. I kept buying after
          2008, when most of the people who'd been louder than me on the way up went quiet on the
          way down.
        </p>
        <p>
          The lesson from that stretch is not the one most people take from it. The standard lesson
          is "real estate is risky." It isn't. The specific lesson is: <em>the asset didn't kill
          people. The lack of reserves killed people.</em>
        </p>

        <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mt-10 mb-4">
          Who actually lost everything
        </h2>
        <p>
          The investors I knew who went bankrupt in 2008–2010 didn't own bad properties. A lot of
          them owned good properties. The properties stayed rented. The rents dropped, sure, but
          not to zero.
        </p>
        <p>
          What killed them was the gap. Rents dropped 15%, vacancies rose, a tenant stopped
          paying, a water heater blew, the HVAC went. Any one of those things is survivable.
          Stacked on each other in the same quarter, they're not — if you don't have reserves.
          And most investors had reserves sitting in places that either (a) couldn't be accessed
          quickly, or (b) had dropped in value with the market at the exact moment they were
          needed.
        </p>

        <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mt-10 mb-4">
          The setup that kept me buying
        </h2>
        <p>
          I had access to a pool of liquid capital that wasn't correlated with the stock market,
          wasn't locked up in a retirement account, and wasn't going to show up in some underwriter's
          denial letter. It had been compounding on its own for years, at a modest but contractual
          rate, and it was there when I needed it.
        </p>
        <p>
          That capital did two things. First, it covered the gap months — the HVAC, the vacancy,
          the late tenant. Second, and more importantly: <em>it funded the next deal</em>. Prices
          in 2009 and 2010 were the best prices of my investing career. The investors who didn't
          have liquid reserves couldn't take advantage. The ones who did, did.
        </p>

        <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mt-10 mb-4">
          What I took away
        </h2>
        <p>
          The cycle decides when the opportunities show up. The asset decides what the upside
          looks like. The reserves decide whether you're there to catch any of it.
        </p>
        <p>
          Most investors run the first two and skip the third. They size their portfolio to the
          best-case months and hope the worst-case months don't all land at once. When the
          worst-case months land at once — and the history says they do, roughly every 10 to 15
          years — the investors without reserves sell at the bottom. The investors with reserves
          buy from them.
        </p>
        <p>
          I don't say that to be grim. I say it because the piece most investors are missing is
          boring and sitting in plain sight. The book walks through exactly how to build it, and
          where to store it so it actually works in a downturn instead of disappearing with the
          market.
        </p>

        <BookCTA />
      </>
    ),
  },
];

export const getPost = (slug: string): BlogPost | undefined =>
  blogPosts.find((p) => p.slug === slug);

export const getRelated = (slug: string, limit = 2): BlogPost[] =>
  blogPosts.filter((p) => p.slug !== slug).slice(0, limit);

export const RelatedLink = ({ post }: { post: BlogPost }) => (
  <Link
    to={`/blog/${post.slug}`}
    className="group block bg-background border border-rule rounded-[4px] p-6 transition-shadow hover:shadow-[0_14px_36px_rgba(28,26,23,0.10)]"
  >
    <p className="stat-label text-ink-muted mb-2">{post.category}</p>
    <h3 className="font-serif text-lg md:text-xl font-medium text-foreground mb-2 leading-snug group-hover:text-accent-primary transition-colors">
      {post.title}
    </h3>
    <p className="text-sm text-ink-secondary leading-relaxed">{post.excerpt}</p>
  </Link>
);
