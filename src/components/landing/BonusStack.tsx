const cards = [
  {
    n: "01",
    title: "The BookLive Rich, Die Rich",
    desc: "The full 17-year playbook, in print or digital.",
    value: "$24",
  },
  {
    n: "02",
    title: "The Retire-in-10 Worksheet",
    desc: "The exact math Barry uses to pressure-test a 10-year plan against real numbers.",
    value: "$49",
  },
  {
    n: "03",
    title: "The Vault Primer (Video)",
    desc: "A 30-minute walkthrough of the infrastructure piece from Section 6.",
    value: "$97",
  },
];

const BonusStack = () => (
  <section className="section bg-bg-elevated">
    <div className="container-page">
      <div className="text-center mb-14">
        <p className="eyebrow mb-6">Included With the Book</p>
        <h2 className="h2-display">What You Get at $19.97</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
        {cards.map((c) => (
          <div
            key={c.n}
            className="relative bg-background border border-rule rounded-[4px] p-8 flex flex-col"
          >
            <span className="absolute top-6 left-6 stat-label text-ink-muted">{c.n}</span>
            <div className="pt-10">
              <h3 className="font-serif text-xl font-medium text-foreground mb-3 leading-snug">
                {c.title}
              </h3>
              <p className="text-[15px] text-ink-secondary leading-relaxed mb-6">{c.desc}</p>
              <div className="mt-auto pt-4 border-t border-rule">
                <span className="stat-label text-ink-muted">Value</span>
                <span className="ml-3 font-serif text-lg font-medium text-accent-primary">{c.value}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="pull-quote text-center mt-14 text-xl md:text-2xl text-ink-secondary">
        Total value: $170. Yours today for $19.97.
      </p>

      <div className="text-center mt-10">
        <a href="#checkout" className="btn-primary">
          Get the Book$19.97
        </a>
      </div>
    </div>
  </section>
);

export default BonusStack;
