import { useEffect } from "react";
import { Navigate, useParams, useSearchParams } from "react-router-dom";
import TopBar from "@/components/landing/TopBar";
import Footer from "@/components/landing/Footer";
import QuizResultView from "@/components/tools/QuizResultView";
import { stages, type StageKey } from "@/data/journeyStages";

const QuizResult = () => {
  const { stage } = useParams<{ stage: string }>();
  const [searchParams] = useSearchParams();
  const stageKey = stage as StageKey | undefined;
  const valid = stageKey && Object.prototype.hasOwnProperty.call(stages, stageKey);
  const scoreParam = searchParams.get("score");
  const score = scoreParam !== null && Number.isFinite(Number(scoreParam)) ? Number(scoreParam) : undefined;

  useEffect(() => {
    if (!valid) return;
    const s = stages[stageKey as StageKey];
    document.title = `${s.title} — Journey Result | Live Rich, Die Rich`;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", s.summary);
    window.scrollTo(0, 0);
  }, [valid, stageKey]);

  if (!valid) return <Navigate to="/quiz" replace />;

  return (
    <main className="bg-background min-h-screen">
      <TopBar />
      <section className="section">
        <div className="container-prose">
          <QuizResultView stage={stageKey as StageKey} score={score} />
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default QuizResult;
