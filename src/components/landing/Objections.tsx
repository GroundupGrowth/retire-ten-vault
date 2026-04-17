const items = [
  {
    q: "Is this just another real estate guru pitch?",
    a: "No. Barry doesn't sell a coaching program, a mastermind, or a course. He sells a book. What's in it is what he's used in his own portfolio for 17 years.",
  },
  {
    q: "I've heard 'retire in 10 years' before. Why is this different?",
    a: "Because the mechanism is different. Most 10-year plans depend on a market doing what it did last decade. This one doesn't. The infrastructure is the reason.",
  },
  {
    q: "What if I already invest in real estate?",
    a: "Then you're further along than most readers — and the Vault piece in Chapter 6 is probably the highest-leverage thing you'll read this year. Most real estate investors are missing it.",
  },
];

const Objections = () => (
  <section className="section bg-bg-elevated">
    <div className="container-page">
      <div className="text-center mb-14">
        <p className="eyebrow mb-6">Before You Ask</p>
        <h2 className="h2-display">The Three Questions Everyone Has</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
        {items.map((it) => (
          <div
            key={it.q}
            className="bg-background border border-rule rounded-[4px] p-8 flex flex-col"
          >
            <p className="pull-quote text-lg md:text-xl text-foreground leading-snug mb-5">
              "{it.q}"
            </p>
            <div className="hairline mb-5" />
            <p className="text-[15px] text-ink-secondary leading-relaxed">{it.a}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Objections;
