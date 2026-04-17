import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const StrategyCTA = () => (
  <section id="strategy-call" className="section bg-background">
    <div className="container-prose">
      <div className="bg-bg-elevated border border-rule border-t-[3px] border-t-accent-secondary rounded-[4px] p-10 md:p-14 text-center shadow-[0_12px_28px_rgba(28,26,23,0.06)]">
        <p className="eyebrow text-accent-secondary mb-4">For Readers Who Want to Go Deeper</p>
        <h2 className="h2-display mb-8">Prefer to Talk It Through?</h2>

        <p className="lede mb-10 text-left md:text-center">
          If you'd rather skip ahead and run your actual numbers with someone who's done this for
          17 years, Barry keeps a limited number of strategy sessions open each week.
          No pitch. No pressure. Just your situation, your goals, and a straight answer on
          whether a 10-year plan is realistic for you.
        </p>

        <Dialog>
          <DialogTrigger asChild>
            <button type="button" className="btn-secondary">
              Book a Strategy Session with Barry
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl w-[95vw] p-0 overflow-hidden sm:rounded-lg bg-background">
            <DialogTitle className="sr-only">Book a Strategy Session with Barry Brooksby</DialogTitle>
            <iframe
              src="https://api.leadconnectorhq.com/widget/bookings/insuranceandestates/barrybrooksby"
              title="Book a strategy session with Barry Brooksby"
              className="w-full h-[85vh] max-h-[820px] border-0"
              loading="lazy"
            />
          </DialogContent>
        </Dialog>

        <p className="micro-trust mt-4 italic">30 minutes. No cost. No obligation.</p>
      </div>
    </div>
  </section>
);

export default StrategyCTA;
