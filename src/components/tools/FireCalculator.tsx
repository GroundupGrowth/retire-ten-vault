import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const money = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.max(0, Math.round(n)));

type Field = {
  id: string;
  label: string;
  hint?: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
  min?: number;
  max?: number;
};

const NumberField = ({ id, label, hint, value, onChange, prefix, suffix, step, min, max }: Field) => (
  <div>
    <Label htmlFor={id} className="block mb-2 text-foreground font-sans text-sm font-medium">
      {label}
    </Label>
    <div className="relative">
      {prefix && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted text-sm select-none">
          {prefix}
        </span>
      )}
      <Input
        id={id}
        type="number"
        inputMode="decimal"
        value={Number.isFinite(value) ? value : ""}
        onChange={(e) => {
          const n = Number(e.target.value);
          onChange(Number.isFinite(n) ? n : 0);
        }}
        step={step}
        min={min}
        max={max}
        className={`h-11 bg-background border-rule focus-visible:ring-accent-primary ${prefix ? "pl-7" : ""} ${suffix ? "pr-10" : ""}`}
      />
      {suffix && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted text-sm select-none">
          {suffix}
        </span>
      )}
    </div>
    {hint && <p className="mt-1.5 text-xs text-ink-muted">{hint}</p>}
  </div>
);

const FireCalculator = () => {
  const [currentAge, setCurrentAge] = useState(35);
  const [currentSavings, setCurrentSavings] = useState(100000);
  const [annualSavings, setAnnualSavings] = useState(60000);
  const [annualExpenses, setAnnualExpenses] = useState(80000);
  const [returnRate, setReturnRate] = useState(7);
  const [withdrawalRate, setWithdrawalRate] = useState(4);

  const result = useMemo(() => {
    const swr = Math.max(0, withdrawalRate) / 100;
    const r = returnRate / 100;
    const fiNumber = swr > 0 ? annualExpenses / swr : Number.POSITIVE_INFINITY;

    let balance = Math.max(0, currentSavings);
    let years = 0;
    const cap = 80;
    while (balance < fiNumber && years < cap) {
      balance = balance * (1 + r) + annualSavings;
      years += 1;
    }
    const reached = balance >= fiNumber && Number.isFinite(fiNumber);

    return {
      fiNumber,
      years: reached ? years : null,
      ageAtFi: reached ? currentAge + years : null,
      monthlyIncomeAtFi: (fiNumber * swr) / 12,
    };
  }, [currentAge, currentSavings, annualSavings, annualExpenses, returnRate, withdrawalRate]);

  const savingsRate =
    annualSavings + annualExpenses > 0
      ? Math.round((annualSavings / (annualSavings + annualExpenses)) * 100)
      : 0;

  return (
    <div className="bg-background border border-rule border-t-[3px] border-t-accent-primary rounded-[4px] p-6 md:p-10 shadow-[0_12px_28px_rgba(28,26,23,0.06)]">
      <p className="eyebrow text-accent-primary mb-3">Tool 01</p>
      <h2 className="h2-display mb-3">FIRE Calculator</h2>
      <p className="text-ink-secondary text-[15px] leading-relaxed mb-8">
        Financial Independence, Retire Early. Enter your numbers and see the year the math actually
        works.
      </p>

      <div className="grid md:grid-cols-2 gap-10 md:gap-12">
        <div className="space-y-5">
          <NumberField
            id="fire-age"
            label="Current Age"
            value={currentAge}
            onChange={setCurrentAge}
            min={18}
            max={80}
            step={1}
          />
          <NumberField
            id="fire-savings"
            label="Current Savings / Investments"
            hint="What you already have compounding."
            value={currentSavings}
            onChange={setCurrentSavings}
            prefix="$"
            step={1000}
            min={0}
          />
          <NumberField
            id="fire-annual-savings"
            label="Annual Savings"
            hint="How much you invest per year from income."
            value={annualSavings}
            onChange={setAnnualSavings}
            prefix="$"
            step={1000}
            min={0}
          />
          <NumberField
            id="fire-expenses"
            label="Annual Expenses in Retirement"
            hint="What your life costs per year, today's dollars."
            value={annualExpenses}
            onChange={setAnnualExpenses}
            prefix="$"
            step={1000}
            min={0}
          />
          <div className="grid grid-cols-2 gap-4">
            <NumberField
              id="fire-return"
              label="Expected Return"
              value={returnRate}
              onChange={setReturnRate}
              suffix="%"
              step={0.1}
              min={-20}
              max={30}
            />
            <NumberField
              id="fire-swr"
              label="Withdrawal Rate"
              value={withdrawalRate}
              onChange={setWithdrawalRate}
              suffix="%"
              step={0.1}
              min={0.5}
              max={10}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="bg-bg-elevated border border-rule rounded-[4px] p-6 md:p-8 flex-1">
            <p className="eyebrow text-accent-primary mb-5">Your Numbers</p>

            <div className="space-y-6">
              <div>
                <p className="stat-label mb-1">FI Number</p>
                <p className="font-serif text-3xl md:text-4xl font-semibold text-foreground">
                  {money(result.fiNumber)}
                </p>
                <p className="text-xs text-ink-muted mt-1">
                  {annualExpenses.toLocaleString()} ÷ {withdrawalRate}% withdrawal rate
                </p>
              </div>

              <div className="hairline" />

              <div>
                <p className="stat-label mb-1">Years to Financial Independence</p>
                <p className="font-serif text-3xl md:text-4xl font-semibold text-accent-primary">
                  {result.years !== null ? `${result.years} yrs` : "> 80 yrs"}
                </p>
                {result.ageAtFi !== null && (
                  <p className="text-xs text-ink-muted mt-1">
                    You hit FI around age {result.ageAtFi}
                  </p>
                )}
              </div>

              <div className="hairline" />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="stat-label mb-1">Savings Rate</p>
                  <p className="font-serif text-xl font-medium text-foreground">{savingsRate}%</p>
                </div>
                <div>
                  <p className="stat-label mb-1">Monthly income at FI</p>
                  <p className="font-serif text-xl font-medium text-foreground">
                    {money(result.monthlyIncomeAtFi)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <p className="text-xs text-ink-muted mt-4 italic leading-relaxed">
            Projection uses real (inflation-adjusted) returns. Assumes you keep saving at the same
            pace and returns compound annually. Not financial advice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FireCalculator;
