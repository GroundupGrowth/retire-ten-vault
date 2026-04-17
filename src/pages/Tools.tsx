import { Link } from "react-router-dom";
import TopBar from "@/components/landing/TopBar";
import Footer from "@/components/landing/Footer";
import FireCalculator from "@/components/tools/FireCalculator";
import CompoundCalculator from "@/components/tools/CompoundCalculator";

const Tools = () => (
  <main className="bg-background">
    <TopBar />

    <section className="section">
      <div className="container-page">
        <div className="mb-14 max-w-2xl">
          <p className="eyebrow mb-6">The Tools</p>
          <h1 className="h1-display mb-6">Run Your Own Numbers.</h1>
          <p className="lede">
            Two calculators Barry uses when he works with readers.
            Change the inputs, watch the math move. No email gate, no sign-up.
          </p>
        </div>

        <div className="space-y-16 md:space-y-20">
          <FireCalculator />
          <CompoundCalculator />
        </div>

        <div className="mt-20 text-center">
          <Link to="/" className="btn-secondary">
            Back to the Book
          </Link>
        </div>
      </div>
    </section>

    <Footer />
  </main>
);

export default Tools;
