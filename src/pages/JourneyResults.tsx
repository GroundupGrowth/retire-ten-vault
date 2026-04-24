import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import TopBar from "@/components/landing/TopBar";
import Footer from "@/components/landing/Footer";
import { stageOrder, stages } from "@/data/journeyStages";

const JourneyResults = () => (
  <main className="bg-background min-h-screen">
    <TopBar />
    <section className="section">
      <div className="container-page">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow mb-5">Preview · Not linked from nav</p>
          <h1 className="h1-display mb-5">All Journey Result Pages</h1>
          <p className="lede">
            Every quiz stage result, linked directly so you can review the copy and CTAs without
            retaking the quiz each time.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {stageOrder.map((key) => {
            const s = stages[key];
            return (
              <Link
                key={key}
                to={`/quiz/result/${key}`}
                className="group block bg-background border border-rule border-t-[3px] border-t-accent-primary rounded-[4px] p-8 transition-shadow hover:shadow-[0_14px_36px_rgba(28,26,23,0.10)]"
              >
                <p className="eyebrow text-accent-primary mb-3">{s.badge}</p>
                <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mb-2 leading-tight group-hover:text-accent-primary transition-colors">
                  {s.title}
                </h2>
                <p className="font-serif italic text-ink-secondary text-base mb-4">{s.tagline}</p>
                <p className="text-ink-secondary text-[15px] leading-relaxed mb-5">{s.summary}</p>
                <span className="inline-flex items-center gap-1.5 text-accent-primary font-medium text-sm transition-transform group-hover:translate-x-0.5">
                  View result page <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <Link to="/quiz" className="btn-secondary">
            Take the quiz
          </Link>
        </div>
      </div>
    </section>
    <Footer />
  </main>
);

export default JourneyResults;
