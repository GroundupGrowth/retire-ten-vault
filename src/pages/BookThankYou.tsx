import { Link } from "react-router-dom";
import TopBar from "@/components/landing/TopBar";
import Footer from "@/components/landing/Footer";

const steps = [
  "A receipt and your download link are landing in your inbox right now. Check spam if you don't see it in a minute.",
  "The print edition (if selected) ships within 2 business days. Digital is instant.",
  "Open Chapter 6 first if you only have an hour. That's where The Vault lives.",
];

const BookThankYou = () => (
  <main className="bg-background min-h-screen">
    <TopBar />

    <section className="section">
      <div className="container-prose text-center">
        <p className="eyebrow text-accent-primary mb-6">Purchase Confirmed</p>
        <h1 className="h1-display mb-6">Your Copy Is On The Way.</h1>
        <p className="lede mb-10">
          Thanks for grabbing <em>Live Rich, Die Rich</em>. Here's what happens next and a short
          invitation at the bottom.
        </p>

        <div className="bg-bg-elevated border border-rule border-t-[3px] border-t-accent-primary rounded-[4px] p-7 md:p-10 text-left mb-16 shadow-[0_12px_28px_rgba(28,26,23,0.06)]">
          <p className="eyebrow text-accent-primary mb-5">What Happens Next</p>
          <ol className="space-y-5">
            {steps.map((s, i) => (
              <li key={s} className="flex gap-4 text-[17px] text-ink-secondary leading-relaxed">
                <span
                  aria-hidden
                  className="mt-0.5 flex-shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full bg-accent-primary text-background font-serif text-sm font-semibold leading-none"
                >
                  {i + 1}
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>

    <section className="bg-bg-elevated">
      <div className="container-prose section text-center">
        <p className="eyebrow text-accent-secondary mb-6">While You're Here</p>
        <h2 className="h2-display mb-6">Want to Talk It Through With Barry?</h2>
        <p className="lede mb-10">
          Barry keeps a limited number of strategy sessions open each week for new readers. If
          you'd like 30 minutes to run your actual numbers with him while the book is fresh, pick a
          time below. No pitch. No pressure.
        </p>

        <div className="bg-background border border-rule rounded-[4px] overflow-hidden shadow-[0_12px_28px_rgba(28,26,23,0.08)]">
          <iframe
            src="https://api.leadconnectorhq.com/widget/bookings/insuranceandestates/barrybrooksby"
            title="Book a strategy session with Barry Brooksby"
            className="w-full h-[760px] border-0"
            loading="lazy"
          />
        </div>

        <p className="micro-trust mt-6 italic">30 minutes. No cost. No obligation.</p>
      </div>
    </section>

    <section className="section bg-background">
      <div className="container-prose text-center">
        <Link to="/" className="btn-secondary">
          Back to the Book
        </Link>
      </div>
    </section>

    <Footer />
  </main>
);

export default BookThankYou;
