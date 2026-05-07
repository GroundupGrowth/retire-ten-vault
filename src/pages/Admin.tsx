import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  BookOpen,
  Compass,
  FileText,
  LayoutGrid,
  LogOut,
  Lock,
  Settings as SettingsIcon,
  Wrench,
} from "lucide-react";
import TopBar from "@/components/landing/TopBar";
import Footer from "@/components/landing/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isAuthed, isUsingDefaultPassword, login, logout } from "@/auth/auth";
import {
  clearSiteOverrides,
  getDefaults,
  getOverrides,
  setSiteOverrides,
  type SiteConfig,
} from "@/config/site";
import { blogPosts } from "@/data/blogPosts";
import { stageOrder, stages } from "@/data/journeyStages";

type Tab = "overview" | "pages" | "settings" | "content";

type PageEntry = {
  path: string;
  title: string;
  description: string;
  hidden?: boolean;
};

type PageGroup = {
  eyebrow: string;
  heading: string;
  entries: PageEntry[];
};

const buildGroups = (): PageGroup[] => [
  {
    eyebrow: "Landing",
    heading: "Top-of-funnel pages",
    entries: [
      {
        path: "/",
        title: "Call Funnel (Homepage)",
        description:
          "Title on top, big VSL, primary CTA opens the booking calendar popup. Secondary CTA lets users buy the book directly.",
      },
      {
        path: "/book",
        title: "Book Sales",
        description:
          "Same layout as /, but every CTA goes to the FastPayDirect checkout. Includes the Book JSON-LD schema for SEO.",
      },
      {
        path: "/test",
        title: "VSL-First Variant",
        description: "Centered hero with VSL front and center for testing against the homepage.",
      },
    ],
  },
  {
    eyebrow: "Blog",
    heading: "Field Notes",
    entries: [
      { path: "/blog", title: "Field Notes Hub", description: "Featured post + grid of essays." },
      ...blogPosts.map((p) => ({
        path: `/blog/${p.slug}`,
        title: p.title,
        description: p.excerpt,
      })),
    ],
  },
  {
    eyebrow: "Quiz",
    heading: "Journey Funnel",
    entries: [
      {
        path: "/quiz",
        title: "Journey Quiz",
        description: "Five questions to map a reader to one of five stages.",
      },
      ...stageOrder.map((key) => {
        const s = stages[key];
        return {
          path: `/quiz/result/${key}`,
          title: `${s.badge} — ${s.title}`,
          description: s.tagline,
        };
      }),
      {
        path: "/journeyresults",
        title: "All Result Pages (Preview)",
        description: "Internal QA page listing every quiz result.",
        hidden: true,
      },
    ],
  },
  {
    eyebrow: "Tools",
    heading: "Calculators & Lead-Gen Tools",
    entries: [
      { path: "/tools", title: "Tools Hub", description: "Card grid of every tool." },
      {
        path: "/tools/fire-calculator",
        title: "FIRE Calculator",
        description: "FI number + years to FI with a trajectory chart.",
      },
      {
        path: "/tools/compound-interest-calculator",
        title: "Compound Interest Calculator",
        description: "Stacked-area chart + year-by-year table.",
      },
      {
        path: "/tools/401k-true-cost-calculator",
        title: "401(k) True Cost Calculator",
        description: "Projects fees + tax drag against the gross projection.",
      },
    ],
  },
  {
    eyebrow: "Confirmation",
    heading: "Post-conversion thank-you pages",
    entries: [
      {
        path: "/thank-you",
        title: "Strategy Session Thank You",
        description: "Post-booking redirect. Fires Meta Pixel Lead event.",
      },
      {
        path: "/book-thank-you",
        title: "Book Purchase Thank You",
        description: "Post-purchase redirect. Embeds the booking calendar.",
      },
    ],
  },
  {
    eyebrow: "Internal",
    heading: "Admin / config",
    entries: [
      {
        path: "/admin",
        title: "Admin Dashboard",
        description: "This page. Auth-gated tabs for site config, pages, and content.",
        hidden: true,
      },
      {
        path: "/settings",
        title: "Site Settings (standalone)",
        description: "Direct link to the same Settings tab below.",
        hidden: true,
      },
      {
        path: "/pages",
        title: "All Pages (standalone)",
        description: "Direct link to the same Pages tab below.",
        hidden: true,
      },
    ],
  },
];

const LoginScreen = ({ onSuccess }: { onSuccess: () => void }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const usingDefault = isUsingDefaultPassword();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      setError(null);
      onSuccess();
    } else {
      setError("Wrong password.");
    }
  };

  return (
    <main className="bg-background min-h-screen flex flex-col">
      <TopBar />
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent-primary/10 text-accent-primary mb-5">
              <Lock className="h-5 w-5" />
            </div>
            <p className="eyebrow text-accent-primary mb-3">Admin Access</p>
            <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground">Sign in</h1>
            <p className="text-sm text-ink-secondary mt-3">
              Enter the admin password to continue.
            </p>
          </div>

          <form
            onSubmit={submit}
            className="bg-bg-elevated border border-rule rounded-[4px] p-6 md:p-8 space-y-4"
          >
            <div>
              <Label
                htmlFor="admin-password"
                className="block mb-2 text-foreground font-sans text-sm font-medium"
              >
                Password
              </Label>
              <Input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 bg-background border-rule"
                autoFocus
              />
            </div>
            {error && <p className="text-sm" style={{ color: "hsl(var(--destructive))" }}>{error}</p>}
            <button type="submit" className="btn-primary w-full">
              Sign in
            </button>
          </form>

          <p className="text-center text-xs text-ink-muted mt-6">
            Session lasts 7 days on this browser.
          </p>

          {usingDefault && (
            <div className="mt-6 bg-bg-elevated border border-rule border-l-4 border-l-accent-primary rounded-r-[4px] p-4 text-xs text-ink-secondary leading-relaxed">
              <p className="font-medium text-foreground mb-1">First-time setup</p>
              <p>
                You're on the default password. Set{" "}
                <code className="font-mono">VITE_ADMIN_PASSWORD</code> in your Vercel project's
                environment variables to override. Redeploy for the new password to apply.
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
};

const StatCard = ({ label, value }: { label: string; value: number | string }) => (
  <div className="bg-background border border-rule rounded-[4px] p-6">
    <p className="stat-label text-ink-muted mb-2">{label}</p>
    <p className="font-serif text-3xl font-semibold text-foreground">{value}</p>
  </div>
);

const QuickLink = ({
  to,
  icon: Icon,
  label,
  hint,
}: {
  to: string;
  icon: typeof LayoutGrid;
  label: string;
  hint: string;
}) => (
  <Link
    to={to}
    className="group block bg-background border border-rule rounded-[4px] p-5 transition-shadow hover:shadow-[0_12px_28px_rgba(28,26,23,0.08)]"
  >
    <div className="flex items-start gap-4">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent-primary/10 text-accent-primary flex-shrink-0">
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-serif text-base font-medium text-foreground mb-1 group-hover:text-accent-primary transition-colors">
          {label}
        </p>
        <p className="text-xs text-ink-secondary leading-relaxed">{hint}</p>
      </div>
      <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-ink-muted group-hover:text-accent-primary transition-colors" />
    </div>
  </Link>
);

const OverviewTab = ({
  groups,
  onTab,
}: {
  groups: PageGroup[];
  onTab: (t: Tab) => void;
}) => {
  const totalPages = groups.reduce((acc, g) => acc + g.entries.length, 0);
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
        <StatCard label="Total pages" value={totalPages} />
        <StatCard label="Blog posts" value={blogPosts.length} />
        <StatCard label="Quiz stages" value={stageOrder.length} />
        <StatCard label="Calculators" value={3} />
      </div>

      <p className="eyebrow mb-4">Jump To</p>
      <div className="grid md:grid-cols-2 gap-4 mb-12">
        <button type="button" onClick={() => onTab("pages")} className="text-left">
          <QuickLink
            to="#"
            icon={LayoutGrid}
            label="All Pages"
            hint="Every public page on the site, grouped by purpose."
          />
        </button>
        <button type="button" onClick={() => onTab("settings")} className="text-left">
          <QuickLink
            to="#"
            icon={SettingsIcon}
            label="Site Config"
            hint="Meta Pixel ID and booking calendar URL."
          />
        </button>
        <button type="button" onClick={() => onTab("content")} className="text-left">
          <QuickLink
            to="#"
            icon={FileText}
            label="Content"
            hint="Blog posts and quiz stages — read-only without a backend."
          />
        </button>
        <QuickLink
          to="/"
          icon={ArrowUpRight}
          label="View live site"
          hint="Open the public homepage in this tab."
        />
      </div>

      <div className="bg-bg-elevated border border-rule rounded-[4px] p-6 text-sm text-ink-secondary leading-relaxed">
        <p className="font-medium text-foreground mb-2">About this admin</p>
        <p>
          The site is a static SPA, so "real" content edits (blog posts, quiz copy, hero text) still
          require code changes — ask Claude or edit <code className="font-mono">src/data/...</code>.
          The Settings tab lets you override the Meta Pixel ID and booking calendar URL in this
          browser via localStorage. For permanent overrides, edit{" "}
          <code className="font-mono">src/config/site.ts</code>.
        </p>
      </div>
    </div>
  );
};

const PagesTab = ({ groups }: { groups: PageGroup[] }) => (
  <div className="space-y-12">
    {groups.map((g) => (
      <div key={g.heading}>
        <div className="flex items-baseline justify-between mb-5 pb-3 border-b border-rule">
          <div>
            <p className="eyebrow text-accent-primary mb-1">{g.eyebrow}</p>
            <h3 className="font-serif text-xl md:text-2xl font-medium text-foreground">
              {g.heading}
            </h3>
          </div>
          <p className="stat-label text-ink-muted">
            {g.entries.length} page{g.entries.length === 1 ? "" : "s"}
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-4 md:gap-5">
          {g.entries.map((e) => (
            <Link
              key={e.path}
              to={e.path}
              className="group block bg-background border border-rule rounded-[4px] p-5 transition-shadow hover:shadow-[0_12px_28px_rgba(28,26,23,0.08)]"
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <h4 className="font-serif text-base md:text-lg font-medium text-foreground leading-snug group-hover:text-accent-primary transition-colors">
                  {e.title}
                </h4>
                <ArrowUpRight className="h-4 w-4 flex-shrink-0 mt-1 text-ink-muted group-hover:text-accent-primary transition-colors" />
              </div>
              <p className="font-mono text-xs text-ink-muted mb-2 break-all">{e.path}</p>
              <p className="text-[13px] text-ink-secondary leading-relaxed">{e.description}</p>
              {e.hidden && (
                <p className="mt-2 stat-label text-accent-primary">Hidden from nav</p>
              )}
            </Link>
          ))}
        </div>
      </div>
    ))}
  </div>
);

type FieldProps = {
  id: string;
  label: string;
  description: string;
  usedFor: string[];
  value: string;
  onChange: (v: string) => void;
  defaultValue: string;
  isOverride: boolean;
};

const SettingsField = ({
  id,
  label,
  description,
  usedFor,
  value,
  onChange,
  defaultValue,
  isOverride,
}: FieldProps) => (
  <div className="bg-background border border-rule rounded-[4px] p-6">
    <div className="flex items-baseline justify-between gap-4 mb-2 flex-wrap">
      <Label htmlFor={id} className="text-foreground font-sans text-base font-medium">
        {label}
      </Label>
      <span className={`stat-label ${isOverride ? "text-accent-primary" : "text-ink-muted"}`}>
        {isOverride ? "Overridden in this browser" : "Using code default"}
      </span>
    </div>
    <p className="text-sm text-ink-secondary mb-4">{description}</p>
    <Input
      id={id}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-11 bg-background border-rule font-mono text-xs md:text-sm"
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

const SettingsTab = () => {
  const defaults = getDefaults();
  const [overrides, setOverridesState] = useState<Partial<SiteConfig>>(getOverrides());
  const [pixelInput, setPixelInput] = useState<string>(
    overrides.metaPixelId ?? defaults.metaPixelId,
  );
  const [bookingInput, setBookingInput] = useState<string>(
    overrides.bookingUrl ?? defaults.bookingUrl,
  );
  const [savedAt, setSavedAt] = useState<Date | null>(null);

  const dirty =
    pixelInput !== (overrides.metaPixelId ?? defaults.metaPixelId) ||
    bookingInput !== (overrides.bookingUrl ?? defaults.bookingUrl);

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
    <div>
      <div className="bg-bg-elevated border border-rule rounded-[4px] p-5 mb-8 text-sm text-ink-secondary leading-relaxed">
        <p>
          <strong className="text-foreground">Local override only.</strong> Saves to{" "}
          <code className="font-mono">localStorage</code> in this browser. For permanent changes,
          edit <code className="font-mono">src/config/site.ts</code>.
        </p>
      </div>

      <div className="space-y-5 mb-8">
        <SettingsField
          id="meta-pixel-id"
          label="Meta Pixel ID"
          description="Fires PageView site-wide and the Lead event on /thank-you after a strategy session is booked."
          usedFor={["Every page (PageView)", "/thank-you (Lead)"]}
          value={pixelInput}
          onChange={setPixelInput}
          defaultValue={defaults.metaPixelId}
          isOverride={typeof overrides.metaPixelId === "string"}
        />
        <SettingsField
          id="booking-url"
          label="Booking Calendar URL"
          description="GHL bookings widget URL embedded as an iframe whenever a 'Book a Call' or 'Book a Strategy Session' CTA opens."
          usedFor={["BookingDialog popup (everywhere)", "/book-thank-you (embedded calendar)"]}
          value={bookingInput}
          onChange={setBookingInput}
          defaultValue={defaults.bookingUrl}
          isOverride={typeof overrides.bookingUrl === "string"}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={handleSave}
          disabled={!dirty}
          className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Save Override
        </button>
        <button type="button" onClick={handleReset} className="btn-secondary">
          Reset to Defaults
        </button>
        {savedAt && (
          <span className="text-xs text-ink-muted">
            Saved at {savedAt.toLocaleTimeString()} · Reload pages to apply pixel change.
          </span>
        )}
      </div>
    </div>
  );
};

const ContentTab = () => (
  <div className="space-y-12">
    <div>
      <div className="flex items-baseline justify-between mb-5 pb-3 border-b border-rule">
        <div>
          <p className="eyebrow text-accent-primary mb-1">Blog</p>
          <h3 className="font-serif text-xl md:text-2xl font-medium text-foreground">
            Field Notes posts
          </h3>
        </div>
        <p className="stat-label text-ink-muted">{blogPosts.length} posts</p>
      </div>
      <p className="text-xs text-ink-muted mb-4">
        Read-only here. To add or edit, update <code className="font-mono">src/data/blogPosts.tsx</code>.
      </p>
      <div className="space-y-3">
        {blogPosts.map((p) => (
          <Link
            key={p.slug}
            to={`/blog/${p.slug}`}
            className="group block bg-background border border-rule rounded-[4px] p-5 transition-shadow hover:shadow-[0_10px_24px_rgba(28,26,23,0.06)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1 flex-wrap">
                  <span className="stat-label text-ink-muted">{p.category}</span>
                  <span className="text-xs text-ink-muted">{p.date}</span>
                  <span className="text-xs text-ink-muted">· {p.readMinutes} min</span>
                </div>
                <h4 className="font-serif text-base md:text-lg font-medium text-foreground group-hover:text-accent-primary transition-colors">
                  {p.title}
                </h4>
                <p className="text-[13px] text-ink-secondary mt-1 leading-relaxed">{p.excerpt}</p>
              </div>
              <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-ink-muted group-hover:text-accent-primary transition-colors" />
            </div>
          </Link>
        ))}
      </div>
    </div>

    <div>
      <div className="flex items-baseline justify-between mb-5 pb-3 border-b border-rule">
        <div>
          <p className="eyebrow text-accent-primary mb-1">Quiz</p>
          <h3 className="font-serif text-xl md:text-2xl font-medium text-foreground">
            Journey stages
          </h3>
        </div>
        <p className="stat-label text-ink-muted">{stageOrder.length} stages</p>
      </div>
      <p className="text-xs text-ink-muted mb-4">
        Read-only here. To edit summary, pitfalls, 30/60/90, or CTAs, update{" "}
        <code className="font-mono">src/data/journeyStages.tsx</code>.
      </p>
      <div className="space-y-3">
        {stageOrder.map((key) => {
          const s = stages[key];
          return (
            <Link
              key={key}
              to={`/quiz/result/${key}`}
              className="group block bg-background border border-rule rounded-[4px] p-5 transition-shadow hover:shadow-[0_10px_24px_rgba(28,26,23,0.06)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="stat-label text-accent-primary mb-1">{s.badge}</p>
                  <h4 className="font-serif text-base md:text-lg font-medium text-foreground group-hover:text-accent-primary transition-colors">
                    {s.title}
                  </h4>
                  <p className="font-serif italic text-sm text-ink-secondary mt-1">{s.tagline}</p>
                </div>
                <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-ink-muted group-hover:text-accent-primary transition-colors" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  </div>
);

const TabButton = ({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof LayoutGrid;
  label: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
      active
        ? "border-accent-primary text-foreground"
        : "border-transparent text-ink-muted hover:text-foreground"
    }`}
  >
    <Icon className="h-4 w-4" />
    {label}
  </button>
);

const Admin = () => {
  const [authed, setAuthed] = useState<boolean>(isAuthed());
  const [tab, setTab] = useState<Tab>("overview");
  const groups = useMemo(() => buildGroups(), []);

  if (!authed) return <LoginScreen onSuccess={() => setAuthed(true)} />;

  const handleLogout = () => {
    logout();
    setAuthed(false);
  };

  return (
    <main className="bg-background min-h-screen">
      <TopBar />

      <section className="bg-bg-elevated border-b border-rule">
        <div className="container-page py-10 md:py-12">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="eyebrow text-accent-primary mb-3">Admin</p>
              <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground">
                Site Dashboard
              </h1>
              <p className="text-sm text-ink-secondary mt-2">
                Browse pages, edit local config overrides, and review content.
              </p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-[4px] border border-rule text-sm text-ink-secondary hover:text-foreground hover:border-ink-muted transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      </section>

      <section className="border-b border-rule sticky top-0 z-10 bg-background">
        <div className="container-page">
          <div className="flex gap-1 overflow-x-auto">
            <TabButton
              active={tab === "overview"}
              onClick={() => setTab("overview")}
              icon={Compass}
              label="Overview"
            />
            <TabButton
              active={tab === "pages"}
              onClick={() => setTab("pages")}
              icon={LayoutGrid}
              label="Pages"
            />
            <TabButton
              active={tab === "settings"}
              onClick={() => setTab("settings")}
              icon={SettingsIcon}
              label="Settings"
            />
            <TabButton
              active={tab === "content"}
              onClick={() => setTab("content")}
              icon={BookOpen}
              label="Content"
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          {tab === "overview" && <OverviewTab groups={groups} onTab={setTab} />}
          {tab === "pages" && <PagesTab groups={groups} />}
          {tab === "settings" && <SettingsTab />}
          {tab === "content" && <ContentTab />}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Admin;
