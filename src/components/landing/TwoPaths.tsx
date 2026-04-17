const conventional = [
  "Work until 65. Or later.",
  "Max out a 401(k) you can't touch without a penalty.",
  "Watch a market you don't control decide when you get to stop.",
  "Pay taxes on every dollar on the way out.",
  "Hope the number is big enough when you finally get there.",
];

const newPath = [
  "Build passive income that covers your life in 10 years or less.",
  "Own assets you actually control.",
  "Access your capital when you need it not when the IRS allows it.",
  "Keep more of what you make.",
  "Exit on your terms.",
];

const TwoPaths = () => (
  <section className="section bg-bg-elevated">
    <div className="container-page">
      <div className="text-center mb-14">
        <p className="eyebrow mb-4">Us vs. Them</p>
        <h2 className="h2-display">Two Paths. One Decision.</h2>
      </div>

      <div className="relative grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
        {/* Center "VS" divider on desktop */}
        <div
          aria-hidden
          className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 h-12 w-12 items-center justify-center rounded-full bg-bg-elevated border border-rule font-serif text-sm font-semibold tracking-widest text-ink-muted uppercase"
        >
          vs
        </div>

        {/* Column A - The conventional way (dulled) */}
        <div className="bg-background/60 border border-rule rounded-[4px] p-8 md:p-10">
          <p className="eyebrow text-ink-muted mb-3">What Everyone Else Does</p>
          <h3 className="font-serif text-xl md:text-2xl font-medium text-ink-secondary mb-6 pb-4 border-b border-rule">
            The Conventional Path
          </h3>
          <ul className="space-y-4">
            {conventional.map((item) => (
              <li key={item} className="flex gap-3 text-[17px] text-ink-muted leading-relaxed">
                <span
                  aria-hidden
                  className="mt-1 flex-shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full border border-ink-muted/60 text-ink-muted text-[11px] font-bold leading-none"
                >
                  ×
                </span>
                <span className="line-through decoration-ink-muted/50 decoration-1">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Column B - The book's path (emphasized) */}
        <div className="relative bg-background border-2 border-accent-primary rounded-[4px] p-8 md:p-10 shadow-[0_14px_36px_rgba(28,26,23,0.10)]">
          <p className="eyebrow text-accent-primary mb-3">What the Book Teaches</p>
          <h3 className="font-serif text-xl md:text-2xl font-medium text-accent-primary mb-6 pb-4 border-b border-accent-primary/30">
            The Path in This Book
          </h3>
          <ul className="space-y-4">
            {newPath.map((item) => (
              <li key={item} className="flex gap-3 text-[17px] text-foreground leading-relaxed font-medium">
                <span
                  aria-hidden
                  className="mt-1 flex-shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full bg-accent-primary text-background text-[11px] font-bold leading-none"
                >
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="pull-quote text-center mt-16 max-w-2xl mx-auto text-xl md:text-2xl text-ink-secondary leading-snug">
        The people on Path B aren't smarter than you. They just stopped following advice
        that was never written for them.
      </p>
    </div>
  </section>
);

export default TwoPaths;
