import barry from "@/assets/barry-headshot.jpg";

const stats = [
  { num: "17 Years", label: "investing through a full real estate cycle" },
  { num: "2 Downturns", label: "scaled through 2008 and 2020" },
  { num: "10,000+", label: "families guided through the framework" },
  { num: "$0 Pitch", label: "attorney-founded, education-first" },
];

const Credibility = () => (
  <section className="section bg-bg-elevated">
    <div className="container-page">
      <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
        <div className="md:col-span-5">
          <div className="relative max-w-[400px] mx-auto md:mx-0">
            <div className="absolute inset-0 translate-x-3 translate-y-3 bg-accent-primary/10 rounded-[4px]" />
            <img
              src={barry}
              alt="Barry Brooksby, author and 17-year real estate investor"
              width={800}
              height={800}
              loading="lazy"
              className="relative w-full aspect-square object-cover rounded-[4px] border border-rule"
            />
          </div>
        </div>

        <div className="md:col-span-7">
          <p className="eyebrow mb-6">Who Wrote This</p>
          <h2 className="h2-display mb-8">17 Years. One Full Cycle. Real Deals.</h2>
          <div className="prose-body">
            <p>
              Barry Brooksby has been investing in real estate for 17 years. He started before 2008.
              He lived through 2008. He kept buying after 2008when most of the people who'd been
              louder than him on the way up went quiet on the way down.
            </p>
            <p>
              The framework in this book is what he figured out in the years that followed.
              Not theory. Not a course he bought. The system he actually used to rebuild, scale,
              and design a portfolio that now throws off passive income whether he works that
              month or not.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-20 md:mt-24">
        <div className="hairline" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10">
          {stats.map((s) => (
            <div key={s.num} className="text-center md:text-left">
              <div className="stat-num mb-2">{s.num}</div>
              <div className="stat-label leading-snug max-w-[180px] mx-auto md:mx-0">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="hairline" />
      </div>
    </div>
  </section>
);

export default Credibility;
