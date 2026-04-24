import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";
import { stageOrder, stages, type StageKey } from "@/data/journeyStages";

type Props = {
  stage: StageKey;
  score?: number;
  onRetake?: () => void;
};

const stageIndex = (s: StageKey) => stageOrder.indexOf(s);

const QuizResultView = ({ stage, score, onRetake }: Props) => {
  const s = stages[stage];
  const idx = stageIndex(stage);
  const total = stageOrder.length;
  const related = s.relatedSlugs
    .map((slug) => blogPosts.find((p) => p.slug === slug))
    .filter(Boolean) as typeof blogPosts;

  const PrimaryCta = () => {
    if (s.primaryCta.external) {
      return (
        <a
          href={s.primaryCta.href}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          {s.primaryCta.label}
        </a>
      );
    }
    if (s.primaryCta.href.startsWith("/") || s.primaryCta.href.startsWith("#")) {
      return (
        <a href={s.primaryCta.href} className="btn-primary">
          {s.primaryCta.label}
        </a>
      );
    }
    return (
      <Link to={s.primaryCta.href} className="btn-primary">
        {s.primaryCta.label}
      </Link>
    );
  };

  const SecondaryCta = () => {
    if (s.secondaryCta.to) {
      return (
        <Link to={s.secondaryCta.to} className="btn-secondary">
          {s.secondaryCta.label}
        </Link>
      );
    }
    if (s.secondaryCta.href?.startsWith("#") || s.secondaryCta.href?.startsWith("/")) {
      return (
        <a href={s.secondaryCta.href} className="btn-secondary">
          {s.secondaryCta.label}
        </a>
      );
    }
    return (
      <a
        href={s.secondaryCta.href}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-secondary"
      >
        {s.secondaryCta.label}
      </a>
    );
  };

  return (
    <div>
      <p className="eyebrow text-accent-primary mb-4">{s.badge}</p>
      <h1 className="h1-display mb-3">You're at: {s.title}</h1>
      <p className="font-serif italic text-ink-secondary text-xl md:text-2xl mb-8">{s.tagline}</p>

      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          {stageOrder.map((k, i) => (
            <div
              key={k}
              className={`h-1.5 flex-1 rounded-full ${
                i <= idx ? "bg-accent-primary" : "bg-rule"
              }`}
            />
          ))}
        </div>
        <p className="stat-label text-ink-muted">
          Stage {idx + 1} of {total}
        </p>
      </div>

      <p className="lede mb-8">{s.summary}</p>

      <div className="flex flex-wrap gap-4 mb-12 pb-10 border-b border-rule">
        <PrimaryCta />
        <SecondaryCta />
      </div>

      <div className="border-l-4 border-accent-primary bg-bg-elevated rounded-r-[4px] p-6 md:p-8 mb-12">
        <p className="eyebrow text-accent-primary mb-3">The Math at This Stage</p>
        <p className="text-[16px] leading-relaxed text-ink-secondary">{s.mathContext}</p>
      </div>

      <div className="bg-bg-elevated border border-rule border-t-[3px] border-t-accent-primary rounded-[4px] p-7 md:p-10 mb-10 shadow-[0_12px_28px_rgba(28,26,23,0.06)]">
        <p className="eyebrow text-accent-primary mb-5">What to Do Next</p>
        <ol className="space-y-5">
          {s.nextSteps.map((step, i) => (
            <li key={step} className="flex gap-4 text-[17px] text-ink-secondary leading-relaxed">
              <span
                aria-hidden
                className="mt-0.5 flex-shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full bg-accent-primary text-background font-serif text-sm font-semibold leading-none"
              >
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-10">
        <div className="bg-background border border-rule rounded-[4px] p-6 md:p-8">
          <p className="eyebrow text-ink-muted mb-4">Common Pitfalls Here</p>
          <ul className="space-y-3">
            {s.pitfalls.map((p) => (
              <li key={p} className="flex gap-3 text-[15px] text-ink-secondary leading-relaxed">
                <span
                  aria-hidden
                  className="mt-1 flex-shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full border border-ink-muted/60 text-ink-muted text-[11px] font-bold leading-none"
                >
                  !
                </span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-background border border-rule rounded-[4px] p-6 md:p-8">
          <p className="eyebrow text-accent-secondary mb-4">What Unlocks the Next Stage</p>
          <p className="text-[15px] text-ink-secondary leading-relaxed">{s.unlocksNext}</p>
        </div>
      </div>

      <div className="mb-12">
        <p className="eyebrow mb-5">Your 30 / 60 / 90 Day Starter Plan</p>
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {s.thirtySixtyNinety.map((item) => (
            <div
              key={item.day}
              className="bg-background border border-rule rounded-[4px] p-6 flex flex-col"
            >
              <p className="stat-label text-accent-primary mb-2">Day {item.day}</p>
              <p className="text-[15px] text-ink-secondary leading-relaxed">{item.action}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-l-4 border-accent-primary bg-background pl-5 py-3 mb-10">
        <p className="stat-label text-ink-muted mb-1">Start Here in the Book</p>
        <p className="font-serif text-lg md:text-xl text-foreground mb-2">{s.chapter.name}</p>
        <p className="text-sm text-ink-secondary leading-relaxed">{s.chapter.why}</p>
      </div>

      {related.length > 0 && (
        <div className="mb-12">
          <p className="eyebrow mb-5">Related Field Notes</p>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {related.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group block bg-background border border-rule rounded-[4px] p-6 transition-shadow hover:shadow-[0_14px_36px_rgba(28,26,23,0.08)]"
              >
                <p className="stat-label text-ink-muted mb-2">{post.category}</p>
                <h3 className="font-serif text-lg font-medium text-foreground mb-2 leading-snug group-hover:text-accent-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-ink-secondary leading-relaxed">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-4 mb-10">
        <PrimaryCta />
        <SecondaryCta />
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-rule">
        {onRetake ? (
          <button
            type="button"
            onClick={onRetake}
            className="text-sm text-ink-muted hover:text-foreground transition-colors"
          >
            Retake the quiz
          </button>
        ) : (
          <Link to="/quiz" className="text-sm text-ink-muted hover:text-foreground transition-colors">
            Retake the quiz
          </Link>
        )}
        {typeof score === "number" && (
          <p className="text-xs text-ink-muted">
            Score: {score} · Stage: {s.title}
          </p>
        )}
      </div>
    </div>
  );
};

export default QuizResultView;
