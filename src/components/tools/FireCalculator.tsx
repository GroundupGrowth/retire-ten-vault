import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
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

    const trajectory: Array<{ year: number; age: number; balance: number }> = [
      { year: 0, age: currentAge, balance: Math.max(0, currentSavings) },
    ];
    let balance = Math.max(0, currentSavings);
    let years = 0;
    let reached = false;
    const cap = 60;
    while (years < cap) {
      balance = balance * (1 + r) + annualSavings;
      years += 1;
      trajectory.push({ year: years, age: currentAge + years, balance });
      if (!reached && balance >= fiNumber) {
        reached = true;
        break;
      }
    }

    return {
      fiNumber,
      years: reached ? years : null,
      ageAtFi: reached ? currentAge + years : null,
      monthlyIncomeAtFi: (fiNumber * swr) / 12,
      trajectory,
    };
  }, [currentAge, currentSavings, annualSavings, annualExpenses, returnRate, withdrawalRate]);

  const savingsRate =
    annualSavings + annualExpenses > 0
      ? Math.round((annualSavings / (annualSavings + annualExpenses)) * 100)
      : 0;

  return (
    <div className="bg-background border border-rule border-t-[3px] border-t-accent-primary rounded-[4px] p-6 md:p-10 shadow-[0_12px_28px_rgba(28,26,23,0.06)]">
      <div className="grid md:grid-cols-2 gap-10 md:gap-12">
        <div className="space-y-5">
          <p className="eyebrow text-accent-primary">Your Inputs</p>
          <NumberField id="fire-age" label="Current Age" value={currentAge} onChange={setCurrentAge} min={18} max={80} step={1} />
          <NumberField
            id="fire-savings"
            label="Current Savings / Investments"
            hint="What you already have compounding."
            value={currentSavings}
            onChange={setCurrentSavings}
            prefix="$"
            step={1000}
            min={0}
            max={2_000_000}
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
            max={250_000}
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
            max={250_000}
          />
          <div className="grid grid-cols-2 gap-4">
            <NumberField
              id="fire-return"
              label="Expected Return"
              value={returnRate}
              onChange={setReturnRate}
              suffix="%"
              step={0.25}
              min={-5}
              max={15}
            />
            <NumberField
              id="fire-swr"
              label="Withdrawal Rate"
              value={withdrawalRate}
              onChange={setWithdrawalRate}
              suffix="%"
              step={0.1}
              min={2}
              max={8}
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
                  {result.years !== null ? `${result.years} yrs` : "> 60 yrs"}
                </p>
                {result.ageAtFi !== null && (
                  <p className="text-xs text-ink-muted mt-1">You hit FI around age {result.ageAtFi}</p>
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
        </div>
      </div>

      <div className="mt-10">
        <div className="flex items-baseline justify-between mb-4">
          <p className="eyebrow">Trajectory to FI</p>
          <p className="text-xs text-ink-muted">Balance vs. year</p>
        </div>
        <div className="h-72 md:h-80 w-full bg-bg-elevated border border-rule rounded-[4px] p-3 md:p-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={result.trajectory} margin={{ top: 12, right: 20, bottom: 8, left: 4 }}>
              <defs>
                <linearGradient id="fireGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--accent-primary))" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="hsl(var(--accent-primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="2 4" stroke="hsl(var(--rule))" vertical={false} />
              <XAxis
                dataKey="year"
                stroke="hsl(var(--ink-muted))"
                tick={{ fontSize: 11 }}
                tickMargin={6}
                label={{ value: "Year", position: "insideBottom", offset: -2, fill: "hsl(var(--ink-muted))", fontSize: 11 }}
              />
              <YAxis
                stroke="hsl(var(--ink-muted))"
                tick={{ fontSize: 11 }}
                tickFormatter={(n: number) => compactMoney(n)}
                width={60}
              />
              <Tooltip
                formatter={(v: number) => [money(v), "Balance"]}
                labelFormatter={(y) => `Year ${y}`}
                contentStyle={{
                  background: "hsl(var(--background))",
                  border: "1px solid hsl(var(--rule))",
                  borderRadius: 4,
                  fontSize: 12,
                }}
                labelStyle={{ color: "hsl(var(--ink-muted))", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em" }}
              />
              {Number.isFinite(result.fiNumber) && (
                <ReferenceLine
                  y={result.fiNumber}
                  stroke="hsl(var(--accent-secondary))"
                  strokeDasharray="4 4"
                  label={{
                    value: `FI ${compactMoney(result.fiNumber)}`,
                    position: "right",
                    fill: "hsl(var(--accent-secondary))",
                    fontSize: 11,
                  }}
                />
              )}
              <Area
                type="monotone"
                dataKey="balance"
                stroke="hsl(var(--accent-primary))"
                strokeWidth={2}
                fill="url(#fireGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-ink-muted mt-3 italic leading-relaxed">
          Projection uses real (inflation-adjusted) returns. Assumes you keep saving at the same pace
          and returns compound annually. Not financial advice.
        </p>
      </div>
    </div>
  );
};

export default FireCalculator;
