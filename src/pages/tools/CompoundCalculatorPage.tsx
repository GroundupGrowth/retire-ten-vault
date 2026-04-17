import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import TopBar from "@/components/landing/TopBar";
import Footer from "@/components/landing/Footer";
import CompoundCalculator from "@/components/tools/CompoundCalculator";

const CompoundCalculatorPage = () => (
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
          <p className="eyebrow text-accent-secondary mb-4">Tool 02</p>
          <h1 className="h1-display mb-6">Compound Interest Calculator</h1>
          <p className="lede">
            Project growth on a starting amount plus monthly contributions. See the split between
            what you put in and what the market did.
          </p>
        </div>

        <CompoundCalculator />

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

export default CompoundCalculatorPage;
