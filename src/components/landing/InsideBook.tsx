import bookCover from "@/assets/book-cover.png";

const bullets = [
  'Why "retire in 10 years" is a math number, not a marketing number and the exact conditions under which it works',
  "The three asset categories wealthy families actually hold (hint: not the three your 401(k) offers)",
  "How Barry evaluates a real estate deal in under 10 minutes the same filter that kept him out of the worst deals of 2007",
  "What the wealthy do with their cash while they're waiting for the next opportunity",
  "The difference between passive income and income that pretends to be passive and why most people own the second kind without knowing it",
  "The infrastructure piece most real estate investors don't have and how it compounds the returns on everything else you own",
  "Why rate-of-return is the wrong question, and what question to ask instead",
];

const InsideBook = () => (
  <section className="section bg-bg-elevated">
    <div className="container-page">
      <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-start">
        <div className="md:col-span-4 flex justify-center md:justify-start">
          <img
            src={bookCover}
            alt="Live Rich, Die Rich book cover"
            width={400}
            height={500}
            loading="lazy"
            className="w-64 md:w-full max-w-[320px] -rotate-[4deg] drop-shadow-[0_24px_40px_rgba(28,26,23,0.25)]"
          />
        </div>

        <div className="md:col-span-8">
          <p className="eyebrow mb-6">Inside the Book</p>
          <h2 className="h2-display mb-10">What You'll Know by the Last Page</h2>

          <ul className="space-y-5 mb-10">
            {bullets.map((b) => (
              <li key={b} className="flex gap-4 text-[17px] leading-relaxed text-ink-secondary">
                <span
                  aria-hidden
                  className="mt-0.5 flex-shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-primary text-background text-[12px] font-bold leading-none"
                >
                  ✓
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <a href="#checkout" className="btn-primary">
            Get the Book $19.97
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default InsideBook;
