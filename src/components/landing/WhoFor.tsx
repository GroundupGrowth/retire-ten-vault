const WhoFor = () => (
  <section className="section bg-background">
    <div className="container-prose">
      <p className="eyebrow mb-6">Read This If</p>
      <h2 className="h2-display mb-10">You've Already Run the Numbers. You Already Know.</h2>

      <div className="prose-body">
        <p>
          You're over 35. You earn well. You've done the responsible things maxed the 401(k),
          bought the house, stayed out of consumer debt.
        </p>
        <p>And somewhere in the last year or two, you ran the numbers.</p>
        <p>
          You looked at the contribution limits, the withdrawal rules, the market assumptions
          your advisor keeps handing you. You did the math on what your account actually has
          to hit to replace your income. And you noticed something.
        </p>
      </div>

      <blockquote className="my-10 border-l-4 border-accent-primary pl-6 md:pl-8">
        <p className="pull-quote text-xl md:text-2xl text-foreground leading-snug">
          The math doesn't work. Not in 10 years. Not in 15. Probably not in 25 not without
          a bull market you can't count on and a life that doesn't surprise you.
        </p>
      </blockquote>

      <div className="bg-bg-elevated border border-rule rounded-[4px] p-7 md:p-8">
        <p className="eyebrow text-accent-primary mb-3">If That's You</p>
        <p className="text-[17px] text-foreground leading-relaxed" style={{ fontWeight: 500 }}>
          You don't need another spreadsheet. You need a different asset,
          a different structure, and someone who's actually done it.
        </p>
      </div>
    </div>
  </section>
);

export default WhoFor;
