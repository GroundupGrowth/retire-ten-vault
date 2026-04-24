import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import TopBar from "@/components/landing/TopBar";
import Footer from "@/components/landing/Footer";
import FourOhOneKCalculator from "@/components/tools/FourOhOneKCalculator";

const FourOhOneKCalculatorPage = () => (
  <main className="bg-background min-h-screen">
    <TopBar />
    <section className="section">
      <div className="container-page">
        <Link
          to="/tools"
          className="inline-flex items-center gap-1 text-ink-muted hover:text-foreground text-sm mb-10 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          All Tools
        </Link>

        <div className="mb-10 max-w-2xl">
          <p className="eyebrow text-accent-primary mb-4">Tool 03</p>
          <h1 className="h1-display mb-6">401(k) True Cost Calculator</h1>
          <p className="lede">
            What the "tax-advantaged" brochure doesn't mention: annual plan fees, compounding drag,
            and the marginal-rate tax event on the way out. Plug in your numbers — see the gap
            between what your 401(k) projects and what you actually keep.
          </p>
        </div>

        <FourOhOneKCalculator />

        <div className="mt-16 text-center">
          <Link to="/tools" className="btn-secondary">
            Back to Tools
          </Link>
        </div>
      </div>
    </section>
    <Footer />
  </main>
);

export default FourOhOneKCalculatorPage;
