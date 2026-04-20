import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
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

const CompoundCalculator = () => {
  const [principal, setPrincipal] = useState(10000);
  const [monthly, setMonthly] = useState(1000);
  const [years, setYears] = useState(20);
  const [rate, setRate] = useState(8);

  const { schedule, finalBalance, totalContributions, totalInterest } = useMemo(() => {
    const r = rate / 100 / 12;
    const months = Math.max(0, Math.round(years * 12));
    const rows: Array<{ year: number; balance: number; contributed: number; interest: number }> = [
      { year: 0, balance: Math.max(0, principal), contributed: Math.max(0, principal), interest: 0 },
    ];
    let balance = Math.max(0, principal);
    let contributed = Math.max(0, principal);
    for (let m = 1; m <= months; m += 1) {
      balance = balance * (1 + r) + monthly;
      contributed += monthly;
      if (m % 12 === 0) {
        rows.push({
          year: m / 12,
          balance,
          contributed,
          interest: Math.max(0, balance - contributed),
        });
      }
    }
    return {
      schedule: rows,
      finalBalance: balance,
      totalContributions: contributed,
      totalInterest: balance - contributed,
    };
  }, [principal, monthly, years, rate]);

  return (
    <div className="bg-background border border-rule border-t-[3px] border-t-accent-secondary rounded-[4px] p-6 md:p-10 shadow-[0_12px_28px_rgba(28,26,23,0.06)]">
      <div className="grid md:grid-cols-2 gap-10 md:gap-12">
        <div className="space-y-5">
          <p className="eyebrow text-accent-secondary">Your Inputs</p>
          <NumberField
            id="comp-principal"
            label="Starting Amount"
            value={principal}
            onChange={setPrincipal}
            prefix="$"
            step={1000}
            min={0}
            max={500_000}
          />
          <NumberField
            id="comp-monthly"
            label="Monthly Contribution"
            value={monthly}
            onChange={setMonthly}
            prefix="$"
            step={50}
            min={0}
            max={10_000}
          />
          <div className="grid grid-cols-2 gap-4">
            <NumberField
              id="comp-years"
              label="Years"
              value={years}
              onChange={setYears}
              step={1}
              min={1}
              max={50}
            />
            <NumberField
              id="comp-rate"
              label="Annual Return"
              value={rate}
              onChange={setRate}
              suffix="%"
              step={0.25}
              min={-5}
              max={15}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="bg-bg-elevated border border-rule rounded-[4px] p-6 md:p-8">
            <p className="eyebrow text-accent-secondary mb-5">Projected Balance</p>
            <p className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-6">
              {money(finalBalance)}
            </p>

            <div className="hairline mb-5" />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="stat-label mb-1">Contributed</p>
                <p className="font-serif text-xl font-medium text-ink-secondary">
                  {money(totalContributions)}
                </p>
              </div>
              <div>
                <p className="stat-label mb-1">Interest Earned</p>
                <p className="font-serif text-xl font-medium text-accent-secondary">
                  {money(totalInterest)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex items-baseline justify-between mb-4">
          <p className="eyebrow">Growth Over Time</p>
          <p className="text-xs text-ink-muted">Contributed vs. earned</p>
        </div>
        <div className="h-72 md:h-80 w-full bg-bg-elevated border border-rule rounded-[4px] p-3 md:p-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={schedule} margin={{ top: 12, right: 20, bottom: 8, left: 4 }}>
              <defs>
                <linearGradient id="contribGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--accent-primary))" stopOpacity={0.55} />
                  <stop offset="100%" stopColor="hsl(var(--accent-primary))" stopOpacity={0.2} />
                </linearGradient>
                <linearGradient id="interestGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--accent-secondary))" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="hsl(var(--accent-secondary))" stopOpacity={0.2} />
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
                formatter={(v: number, name) => [money(v), name === "contributed" ? "Contributed" : "Interest"]}
                labelFormatter={(y) => `Year ${y}`}
                contentStyle={{
                  background: "hsl(var(--background))",
                  border: "1px solid hsl(var(--rule))",
                  borderRadius: 4,
                  fontSize: 12,
                }}
                labelStyle={{ color: "hsl(var(--ink-muted))", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em" }}
              />
              <Legend
                verticalAlign="top"
                align="right"
                height={24}
                iconType="square"
                wrapperStyle={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "hsl(var(--ink-muted))" }}
                formatter={(v) => (v === "contributed" ? "Contributed" : "Interest")}
              />
              <Area
                type="monotone"
                dataKey="contributed"
                stackId="1"
                stroke="hsl(var(--accent-primary))"
                strokeWidth={1.5}
                fill="url(#contribGradient)"
              />
              <Area
                type="monotone"
                dataKey="interest"
                stackId="1"
                stroke="hsl(var(--accent-secondary))"
                strokeWidth={1.5}
                fill="url(#interestGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-ink-muted mt-3 italic leading-relaxed">
          Contributions applied at the end of each month. Returns compound monthly. Taxes, fees, and
          inflation are not modeled.
        </p>
      </div>

      {schedule.length > 1 && (
        <div className="mt-10">
          <p className="eyebrow mb-4">Year by Year</p>
          <div className="border border-rule rounded-[4px] overflow-hidden">
            <div className="max-h-72 overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="bg-bg-elevated sticky top-0">
                  <tr className="text-left">
                    <th className="stat-label px-4 py-3">Year</th>
                    <th className="stat-label px-4 py-3">Contributed</th>
                    <th className="stat-label px-4 py-3">Interest</th>
                    <th className="stat-label px-4 py-3 text-right">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.slice(1).map((row) => (
                    <tr key={row.year} className="border-t border-rule">
                      <td className="px-4 py-2.5 font-serif text-foreground">{row.year}</td>
                      <td className="px-4 py-2.5 text-ink-secondary">{money(row.contributed)}</td>
                      <td className="px-4 py-2.5 text-accent-secondary">{money(row.interest)}</td>
                      <td className="px-4 py-2.5 text-right font-serif font-medium text-foreground">
                        {money(row.balance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompoundCalculator;
