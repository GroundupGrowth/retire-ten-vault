import { BOOK_COVER_PAPERBACK_URL } from "@/assets/bookCover";
import MainCTA from "@/components/cta/MainCTA";
import TrustpilotWidget from "@/components/trust/TrustpilotWidget";

const Hero = () => (
  <section className="section bg-background relative overflow-hidden">
    {/* Layered warm light: top wash + soft bottom glow */}
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(ellipse 70% 50% at 50% 0%, hsl(var(--bg-elevated)) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 50% 100%, hsl(var(--bg-elevated)) 0%, transparent 65%)",
      }}
    />

    {/* Four-corner editorial hairlines (vertical + short horizontal printer's-mark) */}
    <div aria-hidden className="hidden md:block absolute top-12 left-8 lg:left-16 h-16 w-px bg-gradient-to-b from-accent-primary/35 to-transparent pointer-events-none" />
    <div aria-hidden className="hidden md:block absolute top-12 left-8 lg:left-16 h-px w-12 bg-gradient-to-r from-accent-primary/35 to-transparent pointer-events-none" />
    <div aria-hidden className="hidden md:block absolute top-12 right-8 lg:right-16 h-16 w-px bg-gradient-to-b from-accent-primary/35 to-transparent pointer-events-none" />
    <div aria-hidden className="hidden md:block absolute top-12 right-8 lg:right-16 h-px w-12 bg-gradient-to-l from-accent-primary/35 to-transparent pointer-events-none" />
    <div aria-hidden className="hidden md:block absolute bottom-12 left-8 lg:left-16 h-16 w-px bg-gradient-to-t from-accent-primary/35 to-transparent pointer-events-none" />
    <div aria-hidden className="hidden md:block absolute bottom-12 left-8 lg:left-16 h-px w-12 bg-gradient-to-r from-accent-primary/35 to-transparent pointer-events-none" />
    <div aria-hidden className="hidden md:block absolute bottom-12 right-8 lg:right-16 h-16 w-px bg-gradient-to-t from-accent-primary/35 to-transparent pointer-events-none" />
    <div aria-hidden className="hidden md:block absolute bottom-12 right-8 lg:right-16 h-px w-12 bg-gradient-to-l from-accent-primary/35 to-transparent pointer-events-none" />

    {/* Scattered side-margin dots */}
    <span aria-hidden className="hidden lg:block absolute top-28 left-24 h-1 w-1 rounded-full bg-accent-primary/40 pointer-events-none" />
    <span aria-hidden className="hidden lg:block absolute top-1/2 left-12 -translate-y-1/2 h-1 w-1 rounded-full bg-accent-primary/30 pointer-events-none" />
    <span aria-hidden className="hidden lg:block absolute bottom-32 left-32 h-1 w-1 rounded-full bg-accent-primary/40 pointer-events-none" />
    <span aria-hidden className="hidden lg:block absolute top-40 right-24 h-1 w-1 rounded-full bg-accent-primary/30 pointer-events-none" />
    <span aria-hidden className="hidden lg:block absolute bottom-28 right-32 h-1 w-1 rounded-full bg-accent-primary/40 pointer-events-none" />

    {/* Watermark page number */}
    <span aria-hidden className="hidden xl:block absolute top-1/2 left-4 -translate-y-1/2 font-serif text-[10rem] font-light leading-none text-accent-primary/[0.04] pointer-events-none select-none">
      10
    </span>
    <span aria-hidden className="hidden xl:block absolute top-1/2 right-4 -translate-y-1/2 font-serif text-[10rem] font-light leading-none text-accent-primary/[0.04] pointer-events-none select-none">
      YR
    </span>

    <div className="container-page relative">
      <div className="relative text-center max-w-3xl mx-auto mb-8">
        <img
          src={BOOK_COVER_PAPERBACK_URL}
          alt=""
          aria-hidden="true"
          width={400}
          height={500}
          className="hidden lg:block absolute -top-4 -right-32 xl:-right-40 w-28 xl:w-32 drop-shadow-[0_18px_30px_rgba(28,26,23,0.25)] rotate-[-10deg]"
        />
        <div aria-hidden className="flex items-center justify-center gap-2.5 mb-4">
          <span className="h-px w-10 bg-accent-primary/35" />
          <span className="h-1.5 w-1.5 rounded-full bg-accent-primary" />
          <span className="h-px w-10 bg-accent-primary/35" />
        </div>
        <p className="eyebrow mb-5">A New Playbook from a 17-Year Real Estate Investor</p>
        <h1 className="h1-display text-foreground mb-6">
          How to Retire in 10 Years{" "}
          <span className="text-accent-primary italic">Without</span> the Stock Market,{" "}
          <span className="text-accent-primary italic">Without</span> a 401(k), and{" "}
          <span className="text-accent-primary italic">Without</span> Waiting Until You're 65
        </h1>
        <p className="lede">
          The portfolio, the framework, and the infrastructure piece nobody told you about.
          Built through the 2008 crash. Stress-tested through 17 years. Distilled into one
          conversation with Barry.
        </p>
      </div>

      <div className="flex justify-center mb-10 md:mb-12">
        <div className="w-full max-w-md">
          <TrustpilotWidget />
        </div>
      </div>

      <div className="text-center mb-5">
        <p className="eyebrow text-accent-primary mb-1">Step 01 · Watch the Masterclass</p>
        <p className="text-sm text-ink-muted italic">Barry's 2008 story, in 90 seconds.</p>
      </div>

      <div className="mx-auto w-full max-w-4xl mb-10 md:mb-14">
        <div className="relative aspect-video w-full overflow-hidden rounded-[14px] bg-foreground/90 border border-rule shadow-[0_24px_48px_rgba(28,26,23,0.22)]">
          <iframe
            title="Barry Brooksby the 2008 story"
            src="https://www.tella.tv/video/vid_cmorbvz5t00ye04i286li9168/embed?b=0&title=0&a=1&loop=0&t=0&muted=0&wt=0&o=1"
            className="absolute inset-0 h-full w-full"
            allow="autoplay; fullscreen"
            allowTransparency
            loading="lazy"
          />
        </div>
      </div>

      <div className="text-center mb-5">
        <p className="eyebrow text-accent-primary mb-1">Step 02 · Book Your Call</p>
        <p className="text-sm text-ink-muted">
          Run your actual numbers with someone who's done this for 17 years.
        </p>
      </div>

      <div className="text-center">
        <MainCTA className="mb-4" />
        <p className="micro-trust max-w-xl mx-auto">
          30 minutes with Barry. No pitch. No pressure. Just your situation, your goals, and a
          straight answer on whether a 10-year plan is realistic for you.
        </p>
      </div>
    </div>
  </section>
);

export default Hero;
