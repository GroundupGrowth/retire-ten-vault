import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Printer, RotateCcw } from "lucide-react";
import TopBar from "@/components/landing/TopBar";
import Footer from "@/components/landing/Footer";

const STORAGE_KEY = "retire-ten-vault:worksheet";

type ActionItem = {
  key: string;
  prompt: string;
  hint?: string;
};

const actionItems: ActionItem[] = [
  {
    key: "save",
    prompt: "Save aggressively.",
    hint: "Aim for 40–70% of income if possible. What's your current rate and target?",
  },
  {
    key: "debt",
    prompt: "Pay off high-interest debt quickly.",
    hint: "Especially consumer debt. List remaining balances + the order you'll attack them.",
  },
  {
    key: "diversify",
    prompt: "Invest consistently across a diversified mix.",
    hint:
      "Real estate, cash value life insurance, stocks, crypto, business. Which mix fits your situation?",
  },
  {
    key: "match",
    prompt: "Max out employer match — but no more.",
    hint: "If there's no match, don't contribute. What's your current match %?",
  },
  {
    key: "income",
    prompt: "Increase your income.",
    hint:
      "Promotions, side work, new skills, or start a business. What's your next concrete income move?",
  },
  {
    key: "streams",
    prompt: "Build extra income streams.",
    hint: "Rental income, dividends, consulting, royalties. Which stream do you build first?",
  },
  {
    key: "expenses",
    prompt: "Reduce major expenses.",
    hint: "Housing and car payments are the two biggest levers. What can you cut or downsize?",
  },
  {
    key: "emergency",
    prompt: "Keep an emergency fund and plan for healthcare costs.",
    hint: "Target: 3–6 months of expenses liquid. How many months are you at today?",
  },
  {
    key: "track",
    prompt: "Track your progress with the Cash Flow Optimizer.",
    hint: "Barry provides this to clients. Note your check-in cadence (weekly? monthly?).",
  },
  {
    key: "lifestyle",
    prompt: "Avoid lifestyle inflation as your income grows.",
    hint: "Decide the rule ahead of time. E.g. \"every raise: 80% to investments, 20% to lifestyle.\"",
  },
];

type ActionState = { done: boolean; note: string };

type State = {
  position: string;
  actions: Record<string, ActionState>;
  annualExpenses: string;
  practiceBudget: ActionState;
  tenYearReflection: string;
  name: string;
  date: string;
};

const defaultActions = (): Record<string, ActionState> =>
  actionItems.reduce<Record<string, ActionState>>((acc, item) => {
    acc[item.key] = { done: false, note: "" };
    return acc;
  }, {});

const DEFAULT_STATE: State = {
  position: "",
  actions: defaultActions(),
  annualExpenses: "",
  practiceBudget: { done: false, note: "" },
  tenYearReflection: "",
  name: "",
  date: "",
};

const loadState = (): State => {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as Partial<State>;
    return {
      ...DEFAULT_STATE,
      ...parsed,
      actions: { ...defaultActions(), ...(parsed.actions ?? {}) },
      practiceBudget: { ...DEFAULT_STATE.practiceBudget, ...(parsed.practiceBudget ?? {}) },
    };
  } catch {
    return DEFAULT_STATE;
  }
};

const money = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.max(0, Math.round(n)));

const Worksheet = () => {
  const [state, setState] = useState<State>(loadState);
  const [savedAt, setSavedAt] = useState<Date | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    setSavedAt(new Date());
  }, [state]);

  const fiNumber = useMemo(() => {
    const n = parseFloat(state.annualExpenses.replace(/[^0-9.]/g, ""));
    if (!Number.isFinite(n) || n <= 0) return null;
    return n * 25;
  }, [state.annualExpenses]);

  const updateAction = (key: string, patch: Partial<ActionState>) =>
    setState((s) => ({
      ...s,
      actions: { ...s.actions, [key]: { ...s.actions[key], ...patch } },
    }));

  const handleReset = () => {
    if (typeof window !== "undefined" && !window.confirm("Clear all worksheet answers?")) return;
    setState(DEFAULT_STATE);
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") window.print();
  };

  const completedCount = Object.values(state.actions).filter((a) => a.done).length;

  return (
    <main className="bg-background min-h-screen worksheet-page">
      <TopBar />

      <section className="section">
        <div className="container-prose">
          <p className="eyebrow text-accent-primary mb-5">Worksheet · $500 Value</p>
          <h1 className="h1-display mb-5">The Retire-in-10 Worksheet</h1>
          <p className="lede mb-8">
            Barry's working playbook for compressing a 30-year plan into 10. Fill it in honestly,
            commit to the actions, and check back quarterly. Your answers save automatically in
            this browser.
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-10 print:hidden">
            <button type="button" onClick={handlePrint} className="btn-secondary">
              <Printer className="mr-2 h-4 w-4 inline-block" />
              Print / Save as PDF
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-[4px] border border-rule text-sm text-ink-secondary hover:text-foreground hover:border-ink-muted transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
            {savedAt && (
              <span className="text-xs text-ink-muted">
                Auto-saved at {savedAt.toLocaleTimeString()}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            <div>
              <label htmlFor="ws-name" className="block stat-label text-ink-muted mb-2">
                Name
              </label>
              <input
                id="ws-name"
                type="text"
                value={state.name}
                onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))}
                className="w-full h-11 px-3 bg-background border border-rule rounded-[4px] focus:outline-none focus:ring-2 focus:ring-accent-primary"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="ws-date" className="block stat-label text-ink-muted mb-2">
                Date
              </label>
              <input
                id="ws-date"
                type="text"
                value={state.date}
                onChange={(e) => setState((s) => ({ ...s, date: e.target.value }))}
                className="w-full h-11 px-3 bg-background border border-rule rounded-[4px] focus:outline-none focus:ring-2 focus:ring-accent-primary"
                placeholder="Today"
              />
            </div>
          </div>

          <SectionHeader number="01" title="Where are you saving and investing today?" />
          <p className="text-ink-secondary text-[15px] mb-4 leading-relaxed">
            List each account or asset — 401(k), IRA, brokerage, real estate, business equity,
            cash, cash value life insurance, crypto. For each one, write the balance and how
            efficient it is at getting you to FI in 10 years.
          </p>
          <textarea
            value={state.position}
            onChange={(e) => setState((s) => ({ ...s, position: e.target.value }))}
            rows={6}
            placeholder={
              "e.g. 401(k) — $120k — 7% return, locked until 59½, drag from fees\nRental property — $310k equity — $1,800/mo net cash flow\nCash reserve — $40k — earning 4.5% HYSA"
            }
            className="w-full px-4 py-3 bg-background border border-rule rounded-[4px] focus:outline-none focus:ring-2 focus:ring-accent-primary text-[15px] leading-relaxed mb-12"
          />

          <SectionHeader number="02" title="The 10-Year Action Plan" />
          <div className="flex items-center gap-3 mb-6">
            <div className="h-1 w-full bg-rule rounded-full overflow-hidden">
              <div
                className="h-full bg-accent-primary transition-all duration-300"
                style={{ width: `${(completedCount / actionItems.length) * 100}%` }}
              />
            </div>
            <span className="stat-label text-ink-muted whitespace-nowrap">
              {completedCount} / {actionItems.length}
            </span>
          </div>
          <div className="space-y-4 mb-12">
            {actionItems.map((item) => {
              const a = state.actions[item.key];
              return (
                <div
                  key={item.key}
                  className={`border rounded-[4px] p-5 transition-colors ${
                    a.done ? "border-accent-primary bg-accent-primary/5" : "border-rule bg-background"
                  }`}
                >
                  <label className="flex items-start gap-3 cursor-pointer">
                    <span
                      onClick={(e) => {
                        e.preventDefault();
                        updateAction(item.key, { done: !a.done });
                      }}
                      className={`mt-1 flex-shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-[3px] border-2 transition-colors ${
                        a.done
                          ? "border-accent-primary bg-accent-primary text-background"
                          : "border-rule"
                      }`}
                    >
                      {a.done && (
                        <svg viewBox="0 0 12 12" className="h-3 w-3" fill="currentColor">
                          <path d="M4.5 9L1.5 6l1-1 2 2 4-4 1 1z" />
                        </svg>
                      )}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-serif text-base md:text-lg font-medium text-foreground leading-snug">
                        {item.prompt}
                      </p>
                      {item.hint && (
                        <p className="text-sm text-ink-secondary mt-1 leading-relaxed">
                          {item.hint}
                        </p>
                      )}
                    </div>
                  </label>
                  <textarea
                    value={a.note}
                    onChange={(e) => updateAction(item.key, { note: e.target.value })}
                    rows={2}
                    placeholder="Your specific plan or notes…"
                    className="mt-3 w-full px-3 py-2 bg-background border border-rule rounded-[4px] focus:outline-none focus:ring-2 focus:ring-accent-primary text-[14px] leading-relaxed"
                  />
                </div>
              );
            })}
          </div>

          <SectionHeader number="03" title="Your Retirement Number" />
          <p className="text-ink-secondary text-[15px] mb-6 leading-relaxed">
            Estimate how much you'll need each year in retirement (today's dollars).{" "}
            <strong className="text-foreground">FI Number = Annual expenses × 25</strong> (the 4%
            withdrawal rule).
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label htmlFor="ws-expenses" className="block stat-label text-ink-muted mb-2">
                Annual Retirement Expenses
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted text-sm">
                  $
                </span>
                <input
                  id="ws-expenses"
                  type="text"
                  inputMode="decimal"
                  value={state.annualExpenses}
                  onChange={(e) =>
                    setState((s) => ({ ...s, annualExpenses: e.target.value }))
                  }
                  className="w-full h-11 pl-7 pr-3 bg-background border border-rule rounded-[4px] focus:outline-none focus:ring-2 focus:ring-accent-primary"
                  placeholder="80,000"
                />
              </div>
            </div>
            <div className="bg-bg-elevated border border-rule border-t-[3px] border-t-accent-primary rounded-[4px] p-5">
              <p className="stat-label text-accent-primary mb-1">Your FI Number</p>
              <p className="font-serif text-3xl font-semibold text-foreground">
                {fiNumber !== null ? money(fiNumber) : "—"}
              </p>
              <p className="text-xs text-ink-muted mt-1">Annual expenses × 25</p>
            </div>
          </div>

          <div
            className={`border rounded-[4px] p-5 mb-12 transition-colors ${
              state.practiceBudget.done
                ? "border-accent-primary bg-accent-primary/5"
                : "border-rule bg-background"
            }`}
          >
            <label className="flex items-start gap-3 cursor-pointer">
              <span
                onClick={(e) => {
                  e.preventDefault();
                  setState((s) => ({
                    ...s,
                    practiceBudget: { ...s.practiceBudget, done: !s.practiceBudget.done },
                  }));
                }}
                className={`mt-1 flex-shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-[3px] border-2 transition-colors ${
                  state.practiceBudget.done
                    ? "border-accent-primary bg-accent-primary text-background"
                    : "border-rule"
                }`}
              >
                {state.practiceBudget.done && (
                  <svg viewBox="0 0 12 12" className="h-3 w-3" fill="currentColor">
                    <path d="M4.5 9L1.5 6l1-1 2 2 4-4 1 1z" />
                  </svg>
                )}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-serif text-base md:text-lg font-medium text-foreground leading-snug">
                  Practice living on your future retirement budget before you retire.
                </p>
                <p className="text-sm text-ink-secondary mt-1 leading-relaxed">
                  Try 3 months on retirement-only spending. What needed to flex? What didn't?
                </p>
              </div>
            </label>
            <textarea
              value={state.practiceBudget.note}
              onChange={(e) =>
                setState((s) => ({
                  ...s,
                  practiceBudget: { ...s.practiceBudget, note: e.target.value },
                }))
              }
              rows={2}
              placeholder="Notes from your dry run…"
              className="mt-3 w-full px-3 py-2 bg-background border border-rule rounded-[4px] focus:outline-none focus:ring-2 focus:ring-accent-primary text-[14px] leading-relaxed"
            />
          </div>

          <SectionHeader number="04" title="Stay the Course" />
          <p className="text-ink-secondary text-[15px] mb-6 leading-relaxed">
            Ten years is short enough to plan and long enough to feel impossible at year four.
            Write down — in your own words — why you're committing, what would make you quit
            early, and how you'll recommit when that happens.
          </p>
          <textarea
            value={state.tenYearReflection}
            onChange={(e) => setState((s) => ({ ...s, tenYearReflection: e.target.value }))}
            rows={6}
            placeholder="My 10-year commitment, written to my future self…"
            className="w-full px-4 py-3 bg-background border border-rule rounded-[4px] focus:outline-none focus:ring-2 focus:ring-accent-primary text-[15px] leading-relaxed mb-12"
          />

          <div className="bg-bg-elevated border border-rule rounded-[4px] p-6 md:p-8 mb-10 print:hidden">
            <p className="eyebrow text-accent-primary mb-3">Want the Full Framework?</p>
            <p className="text-[15px] text-ink-secondary leading-relaxed mb-5">
              This worksheet is the surface layer. The portfolio strategy, the infrastructure
              piece, and the deal filter all live in <em>Live Rich, Die Rich</em>.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://link.fastpaydirect.com/payment-link/69e6335e7dd3512d9207788d"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Get the PDF eBook — $19.97
              </a>
              <a
                href="https://focuswealthgroup.com/order1744162850420"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Get a Signed Copy — $33.95
              </a>
            </div>
          </div>

          <div className="pt-6 border-t border-rule print:hidden">
            <Link to="/" className="text-sm text-ink-muted hover:text-foreground transition-colors">
              ← Back to homepage
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

const SectionHeader = ({ number, title }: { number: string; title: string }) => (
  <div className="flex items-baseline gap-4 mb-3 pb-3 border-b border-rule">
    <span className="font-serif text-2xl md:text-3xl font-semibold text-accent-primary leading-none">
      {number}
    </span>
    <h2 className="font-serif text-xl md:text-2xl font-medium text-foreground">{title}</h2>
  </div>
);

export default Worksheet;
