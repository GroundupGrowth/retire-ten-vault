import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Compass } from "lucide-react";
import TopBar from "@/components/landing/TopBar";
import Footer from "@/components/landing/Footer";
import QuizResultView from "@/components/tools/QuizResultView";
import { scoreToStage } from "@/data/journeyStages";

type SingleQuestion = {
  id: string;
  kind: "single";
  text: string;
  subtitle: string;
  options: { id: string; label: string; points: number }[];
};

type MultiQuestion = {
  id: string;
  kind: "multi";
  text: string;
  subtitle: string;
  options: { id: string; label: string }[];
};

type Question = SingleQuestion | MultiQuestion;

const questions: Question[] = [
  {
    id: "age",
    kind: "single",
    text: "How old are you?",
    subtitle: "Your age sets the clock on the math.",
    options: [
      { id: "under-35", label: "Under 35", points: 0 },
      { id: "35-44", label: "35 – 44", points: 3 },
      { id: "45-54", label: "45 – 54", points: 6 },
      { id: "55-plus", label: "55 or older", points: 9 },
    ],
  },
  {
    id: "assets",
    kind: "single",
    text: "Your current investable net worth?",
    subtitle: "Savings, investments, and equity — not counting your primary home.",
    options: [
      { id: "u50", label: "Under $50k", points: 0 },
      { id: "50-250", label: "$50k – $250k", points: 15 },
      { id: "250-750", label: "$250k – $750k", points: 30 },
      { id: "750-2m", label: "$750k – $2M", points: 50 },
      { id: "2m+", label: "Over $2M", points: 70 },
    ],
  },
  {
    id: "savings",
    kind: "single",
    text: "How much do you save or invest per year?",
    subtitle: "From income, after taxes, across all accounts.",
    options: [
      { id: "u20", label: "Under $20k", points: 0 },
      { id: "20-50", label: "$20k – $50k", points: 8 },
      { id: "50-100", label: "$50k – $100k", points: 15 },
      { id: "100+", label: "Over $100k", points: 22 },
    ],
  },
  {
    id: "holdings",
    kind: "multi",
    text: "Which of these do you currently hold?",
    subtitle: "Select all that apply.",
    options: [
      { id: "401k", label: "401(k) or IRA" },
      { id: "brokerage", label: "Taxable brokerage / index funds" },
      { id: "real-estate", label: "Rental or investment real estate" },
      { id: "business", label: "Equity in a business you run or own" },
      { id: "cash", label: "Meaningful cash / reserve position" },
      { id: "none", label: "None of these yet" },
    ],
  },
  {
    id: "blocker",
    kind: "single",
    text: "What's actually in the way?",
    subtitle: "Pick the one that sounds the most like you.",
    options: [
      { id: "start", label: "I don't know where to start.", points: 0 },
      { id: "math", label: "I'm saving, but the math won't get me there in time.", points: 0 },
      { id: "deploy", label: "I have capital but no system to deploy it.", points: 0 },
      { id: "infra", label: "I have a portfolio but no infrastructure underneath.", points: 0 },
      { id: "close", label: "I'm close. I just want to tune the last 20%.", points: 0 },
    ],
  },
];

const FiQuiz = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [submitted, setSubmitted] = useState<{ stage: ReturnType<typeof scoreToStage>; score: number } | null>(null);

  const currentQuestion = step >= 0 && step < questions.length ? questions[step] : null;
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;
  const canAdvance = currentQuestion
    ? currentQuestion.kind === "multi"
      ? Array.isArray(currentAnswer) && currentAnswer.length > 0
      : typeof currentAnswer === "string" && currentAnswer.length > 0
    : false;

  const score = useMemo(() => {
    let s = 0;
    for (const q of questions) {
      if (q.kind !== "single") continue;
      const a = answers[q.id];
      if (typeof a !== "string") continue;
      const opt = q.options.find((o) => o.id === a);
      if (opt) s += opt.points;
    }
    return s;
  }, [answers]);

  const setSingle = (questionId: string, optionId: string) =>
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));

  const toggleMulti = (questionId: string, optionId: string) =>
    setAnswers((prev) => {
      const existing = Array.isArray(prev[questionId]) ? (prev[questionId] as string[]) : [];
      const next = existing.includes(optionId)
        ? existing.filter((x) => x !== optionId)
        : [...existing, optionId];
      return { ...prev, [questionId]: next };
    });

  const reset = () => {
    setAnswers({});
    setStep(-1);
    setSubmitted(null);
  };

  const handleNext = () => {
    if (step === questions.length - 1) {
      const stage = scoreToStage(score);
      setSubmitted({ stage, score });
      navigate(`/quiz/result/${stage}?score=${score}`, { replace: false });
    } else {
      setStep((s) => s + 1);
    }
  };

  return (
    <main className="bg-background min-h-screen">
      <TopBar />
      <section className="section">
        <div className="container-prose">
          {step === -1 && !submitted && (
            <div>
              <div className="mb-10 inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent-primary/10 text-accent-primary">
                <Compass className="h-6 w-6" />
              </div>
              <p className="eyebrow text-accent-primary mb-6">The Journey Quiz</p>
              <h1 className="h1-display mb-6">Where Are You on the Path to Financial Independence?</h1>
              <p className="lede mb-10">
                Five questions, about two minutes. You'll land on one of five stages — from
                Foundation to already-there — with a written 30/60/90-day plan, the pitfalls
                everyone hits at your stage, and the chapter of the book to open first.
              </p>

              <div className="bg-bg-elevated border border-rule rounded-[4px] p-6 md:p-8 mb-10">
                <p className="eyebrow text-ink-muted mb-3">What You'll Get</p>
                <ul className="space-y-3 text-[16px] text-ink-secondary leading-relaxed">
                  {[
                    "Your current stage and what the math actually looks like there.",
                    "Three next moves matched to the stage, not generic advice.",
                    "A 30 / 60 / 90 day starter plan with specific actions.",
                    "Common pitfalls at your stage and what unlocks the next one.",
                    "Which chapter of Live Rich, Die Rich to open first.",
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <span
                        aria-hidden
                        className="mt-0.5 flex-shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-primary text-background text-[12px] font-bold leading-none"
                      >
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button type="button" onClick={() => setStep(0)} className="btn-primary">
                Start the Quiz <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              <p className="micro-trust mt-4 italic">No email. No sign-up. Just the result.</p>
            </div>
          )}

          {currentQuestion && !submitted && (
            <div>
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <p className="stat-label text-ink-muted">
                    Question {step + 1} of {questions.length}
                  </p>
                  <button
                    type="button"
                    onClick={reset}
                    className="text-xs text-ink-muted hover:text-foreground transition-colors"
                  >
                    Start over
                  </button>
                </div>
                <div className="h-1 w-full bg-rule rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent-primary transition-all duration-300"
                    style={{ width: `${((step + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              <h2 className="h2-display mb-4">{currentQuestion.text}</h2>
              <p className="text-ink-secondary text-[16px] mb-8">{currentQuestion.subtitle}</p>

              <div className="space-y-3 mb-10">
                {currentQuestion.kind === "single"
                  ? currentQuestion.options.map((opt) => {
                      const selected = currentAnswer === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setSingle(currentQuestion.id, opt.id)}
                          className={`w-full text-left flex items-center gap-4 p-4 md:p-5 rounded-[4px] border transition-colors ${
                            selected
                              ? "border-accent-primary bg-accent-primary/5"
                              : "border-rule bg-background hover:border-ink-muted"
                          }`}
                        >
                          <span
                            aria-hidden
                            className={`flex-shrink-0 h-5 w-5 rounded-full border-2 transition-colors ${
                              selected ? "border-accent-primary bg-accent-primary" : "border-rule"
                            }`}
                          />
                          <span
                            className={`text-[16px] ${selected ? "text-foreground font-medium" : "text-ink-secondary"}`}
                          >
                            {opt.label}
                          </span>
                        </button>
                      );
                    })
                  : currentQuestion.options.map((opt) => {
                      const checked =
                        Array.isArray(currentAnswer) && currentAnswer.includes(opt.id);
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => toggleMulti(currentQuestion.id, opt.id)}
                          className={`w-full text-left flex items-center gap-4 p-4 md:p-5 rounded-[4px] border transition-colors ${
                            checked
                              ? "border-accent-primary bg-accent-primary/5"
                              : "border-rule bg-background hover:border-ink-muted"
                          }`}
                        >
                          <span
                            aria-hidden
                            className={`flex-shrink-0 h-5 w-5 rounded-[3px] border-2 flex items-center justify-center transition-colors ${
                              checked
                                ? "border-accent-primary bg-accent-primary text-background"
                                : "border-rule"
                            }`}
                          >
                            {checked && (
                              <svg viewBox="0 0 12 12" className="h-3 w-3" fill="currentColor">
                                <path d="M4.5 9L1.5 6l1-1 2 2 4-4 1 1z" />
                              </svg>
                            )}
                          </span>
                          <span
                            className={`text-[16px] ${checked ? "text-foreground font-medium" : "text-ink-secondary"}`}
                          >
                            {opt.label}
                          </span>
                        </button>
                      );
                    })}
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(-1, s - 1))}
                  className="inline-flex items-center gap-1 text-ink-muted hover:text-foreground text-sm transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {step === 0 ? "Back to intro" : "Previous"}
                </button>
                <button
                  type="button"
                  disabled={!canAdvance}
                  onClick={handleNext}
                  className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {step === questions.length - 1 ? "See My Stage" : "Next"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {submitted && (
            <QuizResultView stage={submitted.stage} score={submitted.score} onRetake={reset} />
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default FiQuiz;
