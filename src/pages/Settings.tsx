import { useState } from "react";
import { Link } from "react-router-dom";
import TopBar from "@/components/landing/TopBar";
import Footer from "@/components/landing/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  clearSiteOverrides,
  getDefaults,
  getOverrides,
  setSiteOverrides,
  type SiteConfig,
} from "@/config/site";

type FieldProps = {
  id: string;
  label: string;
  description: string;
  usedFor: string[];
  value: string;
  onChange: (v: string) => void;
  defaultValue: string;
  isOverride: boolean;
  monospace?: boolean;
};

const Field = ({
  id,
  label,
  description,
  usedFor,
  value,
  onChange,
  defaultValue,
  isOverride,
  monospace = true,
}: FieldProps) => (
  <div className="bg-background border border-rule rounded-[4px] p-6 md:p-8">
    <div className="flex items-baseline justify-between gap-4 mb-2 flex-wrap">
      <Label htmlFor={id} className="text-foreground font-sans text-base font-medium">
        {label}
      </Label>
      <span
        className={`stat-label ${isOverride ? "text-accent-primary" : "text-ink-muted"}`}
      >
        {isOverride ? "Overridden in this browser" : "Using code default"}
      </span>
    </div>
    <p className="text-sm text-ink-secondary mb-4">{description}</p>
    <Input
      id={id}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`h-11 bg-background border-rule ${monospace ? "font-mono text-xs md:text-sm" : ""}`}
    />
    <div className="mt-3 text-xs text-ink-muted">
      <p className="mb-1">
        <span className="font-medium">Default:</span>{" "}
        <span className="font-mono break-all">{defaultValue}</span>
      </p>
      <p>
        <span className="font-medium">Used on:</span> {usedFor.join(" · ")}
      </p>
    </div>
  </div>
);

const Settings = () => {
  const defaults = getDefaults();
  const [overrides, setOverridesState] = useState<Partial<SiteConfig>>(getOverrides());
  const [pixelInput, setPixelInput] = useState<string>(
    overrides.metaPixelId ?? defaults.metaPixelId,
  );
  const [bookingInput, setBookingInput] = useState<string>(
    overrides.bookingUrl ?? defaults.bookingUrl,
  );
  const [savedAt, setSavedAt] = useState<Date | null>(null);

  const dirtyPixel = pixelInput !== (overrides.metaPixelId ?? defaults.metaPixelId);
  const dirtyBooking = bookingInput !== (overrides.bookingUrl ?? defaults.bookingUrl);
  const dirty = dirtyPixel || dirtyBooking;

  const handleSave = () => {
    const next: Partial<SiteConfig> = {};
    if (pixelInput.trim() && pixelInput !== defaults.metaPixelId) next.metaPixelId = pixelInput.trim();
    if (bookingInput.trim() && bookingInput !== defaults.bookingUrl) next.bookingUrl = bookingInput.trim();
    setSiteOverrides(next);
    setOverridesState(next);
    setSavedAt(new Date());
  };

  const handleReset = () => {
    clearSiteOverrides();
    setOverridesState({});
    setPixelInput(defaults.metaPixelId);
    setBookingInput(defaults.bookingUrl);
    setSavedAt(new Date());
  };

  return (
    <main className="bg-background min-h-screen">
      <TopBar />
      <section className="section">
        <div className="container-prose">
          <p className="eyebrow mb-5">Internal · Site Config</p>
          <h1 className="h1-display mb-5">Settings</h1>
          <p className="lede mb-8">
            Current values for the Meta Pixel ID and the booking calendar URL. Edit and save to
            override locally for testing — overrides live in your browser only and don't push to
            production.
          </p>

          <div className="bg-bg-elevated border border-rule rounded-[4px] p-5 md:p-6 mb-10 text-sm text-ink-secondary leading-relaxed">
            <p className="mb-2">
              <strong className="text-foreground">Local override only.</strong> Saving here writes
              to <code className="font-mono text-xs">localStorage</code> in this browser — only{" "}
              <em>your</em> visits use the override. To change values for every visitor, edit{" "}
              <code className="font-mono text-xs">src/config/site.ts</code> and (for the pixel
              fallback) <code className="font-mono text-xs">index.html</code>, or just ask me.
            </p>
          </div>

          <div className="space-y-6 mb-10">
            <Field
              id="meta-pixel-id"
              label="Meta Pixel ID"
              description="The Facebook / Meta pixel ID used to fire PageView site-wide and the Schedule event on /thank-you after a strategy session is booked."
              usedFor={["Every page (PageView)", "/thank-you (Schedule)"]}
              value={pixelInput}
              onChange={setPixelInput}
              defaultValue={defaults.metaPixelId}
              isOverride={typeof overrides.metaPixelId === "string"}
            />
            <Field
              id="booking-url"
              label="Booking Calendar URL"
              description="The GHL bookings widget URL embedded as an iframe whenever a 'Book a Call' or 'Book a Strategy Session' CTA opens."
              usedFor={[
                "BookingDialog popup (everywhere)",
                "/book-thank-you (embedded calendar)",
              ]}
              value={bookingInput}
              onChange={setBookingInput}
              defaultValue={defaults.bookingUrl}
              isOverride={typeof overrides.bookingUrl === "string"}
            />
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-8">
            <button
              type="button"
              onClick={handleSave}
              disabled={!dirty}
              className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Save Override
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="btn-secondary"
            >
              Reset to Defaults
            </button>
            {savedAt && (
              <span className="text-xs text-ink-muted">
                Saved at {savedAt.toLocaleTimeString()} · Reload pages to apply pixel change.
              </span>
            )}
          </div>

          <div className="pt-6 border-t border-rule">
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

export default Settings;
