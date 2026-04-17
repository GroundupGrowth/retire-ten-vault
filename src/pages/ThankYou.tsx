import { Link } from "react-router-dom";

const steps = [
  "A confirmation email is landing in your inbox right now with the time and a calendar invite.",
  "You'll get a short intake form — fill it out before the call so the 30 minutes go to your situation, not warm-up.",
  "Show up at the time you picked. Barry will have your numbers open and a straight answer ready.",
];

const ThankYou = () => (
  <main className="bg-background min-h-screen flex items-center justify-center py-16">
    <div className="container-prose text-center">
      <p className="eyebrow text-accent-primary mb-6">Session Booked</p>
      <h1 className="h1-display mb-6">You're on Barry's Calendar.</h1>
      <p className="lede mb-10">
        Your strategy session is locked in. Here's what happens between now and the call.
      </p>

      <div className="bg-bg-elevated border border-rule border-t-[3px] border-t-accent-primary rounded-[4px] p-7 md:p-10 text-left mb-12 shadow-[0_12px_28px_rgba(28,26,23,0.06)]">
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

      <p className="micro-trust mb-8 italic">
        Didn't get the confirmation? Check spam, then email support@insuranceandestates.com.
      </p>

      <Link to="/" className="btn-secondary">
        Back to the Book
      </Link>
    </div>
  </main>
);

export default ThankYou;
