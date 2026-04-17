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

const CompoundCalculator = () => {
  const [principal, setPrincipal] = useState(10000);
  const [monthly, setMonthly] = useState(1000);
  const [years, setYears] = useState(20);
  const [rate, setRate] = useState(8);

  const { schedule, finalBalance, totalContributions, totalInterest } = useMemo(() => {
    const r = rate / 100 / 12;
    const months = Math.max(0, Math.round(years * 12));
    const rows: Array<{ year: number; balance: number; contributed: number; interest: number }> = [];
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
          interest: balance - contributed,
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
      <p className="eyebrow text-accent-secondary mb-3">Tool 02</p>
      <h2 className="h2-display mb-3">Compound Interest Calculator</h2>
      <p className="text-ink-secondary text-[15px] leading-relaxed mb-8">
        Project growth on a lump sum plus monthly contributions. Assumes monthly compounding.
      </p>

      <div className="grid md:grid-cols-2 gap-10 md:gap-12">
        <div className="space-y-5">
          <NumberField
            id="comp-principal"
            label="Starting Amount"
            value={principal}
            onChange={setPrincipal}
            prefix="$"
            step={1000}
            min={0}
          />
          <NumberField
            id="comp-monthly"
            label="Monthly Contribution"
            value={monthly}
            onChange={setMonthly}
            prefix="$"
            step={50}
            min={0}
          />
          <div className="grid grid-cols-2 gap-4">
            <NumberField
              id="comp-years"
              label="Years"
              value={years}
              onChange={setYears}
              step={1}
              min={1}
              max={60}
            />
            <NumberField
              id="comp-rate"
              label="Annual Return"
              value={rate}
              onChange={setRate}
              suffix="%"
              step={0.1}
              min={-20}
              max={30}
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

            <div className="grid grid-cols-2 gap-4 mb-5">
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
          <p className="text-xs text-ink-muted mt-4 italic leading-relaxed">
            Contributions applied at the end of each month. Returns compound monthly. Taxes, fees,
            and inflation are not modeled.
          </p>
        </div>
      </div>

      {schedule.length > 0 && (
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
                  {schedule.map((row) => (
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
