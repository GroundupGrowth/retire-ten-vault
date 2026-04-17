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
  "Access your capital when you need it — not when the IRS allows it.",
  "Keep more of what you make.",
  "Exit on your terms.",
];

const TwoPaths = () => (
  <section className="section bg-bg-elevated">
    <div className="container-page">
      <div className="text-center mb-16">
        <h2 className="h2-display">Two Paths. One Decision.</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-12 md:gap-16 max-w-5xl mx-auto">
        {/* Column A */}
        <div>
          <h3 className="font-serif text-xl font-medium text-ink-secondary mb-6 pb-4 border-b border-rule">
            The Conventional Path
          </h3>
          <ul className="space-y-4">
            {conventional.map((item) => (
              <li key={item} className="flex gap-4 text-[17px] text-ink-secondary leading-relaxed">
                <span className="text-ink-muted font-serif text-lg leading-tight mt-0.5 select-none">×</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Column B */}
        <div>
          <h3 className="font-serif text-xl font-medium text-accent-primary mb-6 pb-4 border-b border-rule">
            The Path in This Book
          </h3>
          <ul className="space-y-4">
            {newPath.map((item) => (
              <li key={item} className="flex gap-4 text-[17px] text-foreground leading-relaxed">
                <span className="text-accent-primary font-serif text-lg leading-tight mt-0.5 select-none">→</span>
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
