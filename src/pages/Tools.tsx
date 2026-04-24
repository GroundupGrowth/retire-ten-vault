import { Link } from "react-router-dom";
import { ArrowRight, Compass, Flame, LineChart, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import TopBar from "@/components/landing/TopBar";
import Footer from "@/components/landing/Footer";

type ToolCard = {
  to: string;
  eyebrow: string;
  title: string;
  description: string;
  meta: string;
  icon: LucideIcon;
  accent: "primary" | "secondary";
};

const tools: ToolCard[] = [
  {
    to: "/quiz",
    eyebrow: "Quiz",
    title: "Journey Quiz",
    description:
      "Five questions, two minutes. You'll land on one of five stages — Foundation to At-FI — with stage-specific next moves and the chapter of the book to open first.",
    meta: "5 questions · personalized result",
    icon: Compass,
    accent: "primary",
  },
  {
    to: "/tools/fire-calculator",
    eyebrow: "Tool 01",
    title: "FIRE Calculator",
    description:
      "How much you need. How many years. Your Financial Independence number, mapped against your real savings rate and an annual trajectory chart.",
    meta: "6 inputs · trajectory chart",
    icon: Flame,
    accent: "primary",
  },
  {
    to: "/tools/compound-interest-calculator",
    eyebrow: "Tool 02",
    title: "Compound Interest Calculator",
    description:
      "Project growth on a starting amount plus monthly contributions. Stacked-area chart separates what you put in from what the market did.",
    meta: "4 inputs · chart + table",
    icon: LineChart,
    accent: "secondary",
  },
  {
    to: "/tools/401k-true-cost-calculator",
    eyebrow: "Tool 03",
    title: "401(k) True Cost Calculator",
    description:
      "What the brochure doesn't say: plan fees plus the marginal-rate tax event on withdrawal. See the gap between the gross projection and what you actually keep.",
    meta: "6 inputs · chart + breakdown",
    icon: Wallet,
    accent: "primary",
  },
];

const accentStyles = {
  primary: {
    border: "border-t-accent-primary",
    iconBg: "bg-accent-primary/10",
    iconFg: "text-accent-primary",
    cta: "text-accent-primary",
    eyebrow: "text-accent-primary",
  },
  secondary: {
    border: "border-t-accent-secondary",
    iconBg: "bg-accent-secondary/10",
    iconFg: "text-accent-secondary",
    cta: "text-accent-secondary",
    eyebrow: "text-accent-secondary",
  },
} as const;

const Tools = () => (
  <main className="bg-background min-h-screen">
    <TopBar />
    <section className="section">
      <div className="container-page">
        <div className="mb-14 max-w-2xl">
          <p className="eyebrow mb-6">The Tools</p>
          <h1 className="h1-display mb-6">Run Your Own Numbers.</h1>
          <p className="lede">
            Calculators Barry uses when he works with readers. Change the inputs, watch the math
            move. No email gate, no sign-up.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {tools.map((t) => {
            const Icon = t.icon;
            const s = accentStyles[t.accent];
            return (
              <Link
                key={t.to}
                to={t.to}
                className={`group relative flex flex-col bg-background border border-rule border-t-[3px] ${s.border} rounded-[4px] p-8 md:p-10 transition-shadow hover:shadow-[0_14px_36px_rgba(28,26,23,0.10)]`}
              >
                <div
                  className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full ${s.iconBg} ${s.iconFg}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <p className={`eyebrow ${s.eyebrow} mb-3`}>{t.eyebrow}</p>
                <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mb-4 leading-tight">
                  {t.title}
                </h2>
                <p className="text-ink-secondary text-[16px] leading-relaxed mb-6 flex-1">
                  {t.description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-rule">
                  <span className="stat-label text-ink-muted">{t.meta}</span>
                  <span
                    className={`inline-flex items-center gap-1.5 ${s.cta} font-medium text-sm transition-transform group-hover:translate-x-0.5`}
                  >
                    Open <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            );
          })}
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

export default Tools;
