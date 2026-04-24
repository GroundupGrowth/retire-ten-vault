import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import NumberField from "@/components/tools/NumberField";

const money = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.max(0, Math.round(n)));

const compactMoney = (n: number) => {
  if (Math.abs(n) >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (Math.abs(n) >= 1_000) return `$${Math.round(n / 1_000)}k`;
  return `$${Math.round(n)}`;
};

const FourOhOneKCalculator = () => {
  const [balance, setBalance] = useState(75000);
  const [monthly, setMonthly] = useState(1500);
  const [years, setYears] = useState(25);
  const [returnRate, setReturnRate] = useState(7);
  const [fees, setFees] = useState(0.75);
  const [taxRate, setTaxRate] = useState(22);

  const result = useMemo(() => {
    const months = Math.max(0, Math.round(years * 12));
    const rGross = returnRate / 100 / 12;
    const rNet = Math.max(-0.95 / 12, (returnRate - fees) / 100 / 12);
    const tax = Math.max(0, Math.min(100, taxRate)) / 100;

    const schedule: Array<{ year: number; gross: number; afterFees: number; afterTax: number }> = [
      { year: 0, gross: balance, afterFees: balance, afterTax: balance * (1 - tax) },
    ];

    let gross = balance;
    let afterFees = balance;
    for (let m = 1; m <= months; m += 1) {
      gross = gross * (1 + rGross) + monthly;
      afterFees = afterFees * (1 + rNet) + monthly;
      if (m % 12 === 0) {
        schedule.push({
          year: m / 12,
          gross,
          afterFees,
          afterTax: afterFees * (1 - tax),
        });
      }
    }

    const grossFinal = gross;
    const afterFeesFinal = afterFees;
    const afterTaxFinal = afterFees * (1 - tax);
    const feesLost = Math.max(0, grossFinal - afterFeesFinal);
    const taxLost = Math.max(0, afterFeesFinal - afterTaxFinal);
    const totalLost = feesLost + taxLost;
    const pctLost = grossFinal > 0 ? (totalLost / grossFinal) * 100 : 0;

    return { schedule, grossFinal, afterFeesFinal, afterTaxFinal, feesLost, taxLost, totalLost, pctLost };
  }, [balance, monthly, years, returnRate, fees, taxRate]);

  const keepPct = result.grossFinal > 0 ? (result.afterTaxFinal / result.grossFinal) * 100 : 0;
  const feesPct = result.grossFinal > 0 ? (result.feesLost / result.grossFinal) * 100 : 0;
  const taxPct = result.grossFinal > 0 ? (result.taxLost / result.grossFinal) * 100 : 0;

  return (
    <div className="bg-background border border-rule border-t-[3px] border-t-accent-primary rounded-[4px] p-6 md:p-10 shadow-[0_12px_28px_rgba(28,26,23,0.06)]">
      <div className="grid md:grid-cols-2 gap-10 md:gap-12">
        <div className="space-y-5">
          <p className="eyebrow text-accent-primary">Your Inputs</p>
          <NumberField
            id="k401-balance"
            label="Current 401(k) Balance"
            value={balance}
            onChange={setBalance}
            prefix="$"
            step={1000}
            min={0}
            max={500_000}
          />
          <NumberField
            id="k401-monthly"
            label="Monthly Contribution"
            hint="Yours + any employer match that's actually vesting."
            value={monthly}
            onChange={setMonthly}
            prefix="$"
            step={50}
            min={0}
            max={3000}
          />
          <div className="grid grid-cols-2 gap-4">
            <NumberField
              id="k401-years"
              label="Years Until Retirement"
              value={years}
              onChange={setYears}
              step={1}
              min={1}
              max={40}
            />
            <NumberField
              id="k401-return"
              label="Expected Return"
              value={returnRate}
              onChange={setReturnRate}
              suffix="%"
              step={0.25}
              min={-5}
              max={15}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <NumberField
              id="k401-fees"
              label="Plan Fees"
              hint="Expense ratio + admin fees. Often 0.5–1.5%."
              value={fees}
              onChange={setFees}
              suffix="%"
              step={0.05}
              min={0}
              max={2}
            />
            <NumberField
              id="k401-tax"
              label="Retirement Tax Rate"
              hint="Your marginal rate when you withdraw."
              value={taxRate}
              onChange={setTaxRate}
              suffix="%"
              step={1}
              min={0}
              max={50}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-bg-elevated border border-rule rounded-[4px] p-6 md:p-8">
            <p className="eyebrow text-ink-muted mb-3">Gross Projection</p>
            <p className="font-serif text-2xl md:text-3xl font-medium text-ink-secondary mb-1">
              {money(result.grossFinal)}
            </p>
            <p className="text-xs text-ink-muted">Before fees and taxes, on paper.</p>
          </div>

          <div
            className="bg-bg-elevated border border-rule border-t-[3px] rounded-[4px] p-6 md:p-8"
            style={{ borderTopColor: "hsl(var(--destructive))" }}
          >
            <p className="eyebrow mb-3" style={{ color: "hsl(var(--destructive))" }}>
              True Cost
            </p>
            <p
              className="font-serif text-3xl md:text-4xl font-semibold mb-1"
              style={{ color: "hsl(var(--destructive))" }}
            >
              −{money(result.totalLost)}
            </p>
            <p className="text-xs text-ink-muted">
              Fees + taxes over {years} years — {result.pctLost.toFixed(1)}% of the gross projection
              you never actually see.
            </p>
          </div>

          <div className="bg-background border-2 border-accent-primary rounded-[4px] p-6 md:p-8 shadow-[0_14px_36px_rgba(28,26,23,0.08)]">
            <p className="eyebrow text-accent-primary mb-3">What You Actually Keep</p>
            <p className="font-serif text-3xl md:text-4xl font-semibold text-foreground">
              {money(result.afterTaxFinal)}
            </p>
            <p className="text-xs text-ink-muted mt-1">After fees. After retirement-rate tax.</p>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex items-baseline justify-between mb-4">
          <p className="eyebrow">Gross vs. Net-of-Fees Over Time</p>
          <p className="text-xs text-ink-muted">
            The gap is the quiet drag of fees, compounded.
          </p>
        </div>
        <div className="h-72 md:h-80 w-full bg-bg-elevated border border-rule rounded-[4px] p-3 md:p-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={result.schedule} margin={{ top: 12, right: 20, bottom: 8, left: 4 }}>
              <CartesianGrid strokeDasharray="2 4" stroke="hsl(var(--rule))" vertical={false} />
              <XAxis
                dataKey="year"
                stroke="hsl(var(--ink-muted))"
                tick={{ fontSize: 11 }}
                tickMargin={6}
                label={{
                  value: "Year",
                  position: "insideBottom",
                  offset: -2,
                  fill: "hsl(var(--ink-muted))",
                  fontSize: 11,
                }}
              />
              <YAxis
                stroke="hsl(var(--ink-muted))"
                tick={{ fontSize: 11 }}
                tickFormatter={(n: number) => compactMoney(n)}
                width={60}
              />
              <Tooltip
                formatter={(v: number, name) => [
                  money(v),
                  name === "gross" ? "Gross (no fees)" : "After fees",
                ]}
                labelFormatter={(y) => `Year ${y}`}
                contentStyle={{
                  background: "hsl(var(--background))",
                  border: "1px solid hsl(var(--rule))",
                  borderRadius: 4,
                  fontSize: 12,
                }}
                labelStyle={{
                  color: "hsl(var(--ink-muted))",
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              />
              <Line
                type="monotone"
                dataKey="gross"
                stroke="hsl(var(--ink-muted))"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="afterFees"
                stroke="hsl(var(--accent-primary))"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-10">
        <p className="eyebrow mb-4">Where the Gross Projection Actually Goes</p>
        <div className="flex h-11 w-full overflow-hidden rounded-[4px] border border-rule">
          <div
            title={`Net to you: ${money(result.afterTaxFinal)}`}
            className="flex items-center justify-center text-[11px] font-medium tracking-wide"
            style={{
              width: `${keepPct}%`,
              background: "hsl(var(--accent-primary))",
              color: "hsl(var(--background))",
            }}
          >
            {keepPct > 12 ? `Keep ${keepPct.toFixed(0)}%` : ""}
          </div>
          <div
            title={`Fees: ${money(result.feesLost)}`}
            className="flex items-center justify-center text-[11px] font-medium tracking-wide text-foreground"
            style={{ width: `${feesPct}%`, background: "hsl(var(--gold))" }}
          >
            {feesPct > 8 ? `Fees ${feesPct.toFixed(0)}%` : ""}
          </div>
          <div
            title={`Taxes: ${money(result.taxLost)}`}
            className="flex items-center justify-center text-[11px] font-medium tracking-wide"
            style={{
              width: `${taxPct}%`,
              background: "hsl(var(--destructive))",
              color: "hsl(var(--background))",
            }}
          >
            {taxPct > 8 ? `Tax ${taxPct.toFixed(0)}%` : ""}
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-5 text-xs text-ink-muted">
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ background: "hsl(var(--accent-primary))" }} />
            Net to you {money(result.afterTaxFinal)}
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ background: "hsl(var(--gold))" }} />
            Lost to fees {money(result.feesLost)}
          </span>
          <span className="inline-flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-sm"
              style={{ background: "hsl(var(--destructive))" }}
            />
            Lost to taxes {money(result.taxLost)}
          </span>
        </div>
      </div>

      <div className="mt-10 border-l-4 border-accent-primary bg-bg-elevated rounded-r-[4px] p-6 md:p-8">
        <p className="eyebrow text-accent-primary mb-3">The Trade You Made Without Knowing</p>
        <p className="text-[16px] leading-relaxed text-ink-secondary">
          You deferred taxes at {taxRate}% today. In exchange, the plan charges {fees}% a year for
          the next {years} years, and you'll pay {taxRate}% again — on a larger number — when you
          withdraw. This calculator is simplified. It does not model the 10% penalty for pre-59½
          withdrawals, required minimum distributions, or the cost of having your capital locked
          while opportunities pass. Chapter 6 of <em>Live Rich, Die Rich</em> covers what the
          wealthy use instead.
        </p>
      </div>

      <p className="text-xs text-ink-muted mt-6 italic leading-relaxed">
        Educational projection. Not tax, legal, or investment advice. Real 401(k) outcomes depend
        on plan design, match formulas, vesting, state taxes, and your actual withdrawal
        trajectory.
      </p>
    </div>
  );
};

export default FourOhOneKCalculator;
