import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export type NumberFieldProps = {
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

const NumberField = ({
  id,
  label,
  hint,
  value,
  onChange,
  prefix,
  suffix,
  step,
  min,
  max,
}: NumberFieldProps) => {
  const hasSlider = typeof min === "number" && typeof max === "number";
  const sliderValue = hasSlider
    ? Math.max(min as number, Math.min(max as number, Number.isFinite(value) ? value : (min as number)))
    : 0;

  return (
    <div>
      <Label
        htmlFor={id}
        className="block mb-2 text-foreground font-sans text-sm font-medium"
      >
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
      {hasSlider && (
        <Slider
          className="mt-3"
          value={[sliderValue]}
          onValueChange={([v]) => onChange(v)}
          min={min}
          max={max}
          step={step ?? 1}
          aria-label={label}
        />
      )}
      {hint && <p className="mt-2 text-xs text-ink-muted">{hint}</p>}
    </div>
  );
};

export default NumberField;
