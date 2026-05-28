import { BOOK_COVER_PAPERBACK_URL } from "@/assets/bookCover";
import MainCTA, { type CtaMode } from "@/components/cta/MainCTA";
import SignedCopyCTA from "@/components/cta/SignedCopyCTA";
import TrustpilotWidget from "@/components/trust/TrustpilotWidget";

const FASTPAY_URL =
  "https://link.fastpaydirect.com/payment-link/69e6335e7dd3512d9207788d";

type Props = {
  ctaMode?: CtaMode;
};

const Hero = ({ ctaMode = "buy" }: Props) => (
  <section className="section bg-background relative overflow-hidden">
    {/* Soft warm-light backdrop */}
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(ellipse 70% 50% at 50% 0%, hsl(var(--bg-elevated)) 0%, transparent 70%)",
      }}
    />
    {/* Faint corner ornaments */}
    <div
      aria-hidden
      className="hidden md:block absolute top-16 left-8 lg:left-16 h-16 w-px bg-gradient-to-b from-accent-primary/30 to-transparent pointer-events-none"
    />
    <div
      aria-hidden
      className="hidden md:block absolute bottom-16 right-8 lg:right-16 h-16 w-px bg-gradient-to-t from-accent-primary/30 to-transparent pointer-events-none"
    />

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
        <div
          aria-hidden
          className="flex items-center justify-center gap-2.5 mb-4"
        >
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
          Built through the 2008 crash. Stress-tested through 17 years. Written down for the
          first time in <em>Live Rich, Die Rich</em>.
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
        <p className="eyebrow text-accent-primary mb-1">Step 02 · Pick Your Next Step</p>
        <p className="text-sm text-ink-muted">
          Book a call, grab the eBook, or order the signed copy.
        </p>
      </div>

      <div className="text-center">
        <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
          <MainCTA mode={ctaMode} />
          {ctaMode === "call" && (
            <a
              href={FASTPAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Or Get the PDF eBook — $19.97
            </a>
          )}
          <SignedCopyCTA />
        </div>
        <p className="micro-trust max-w-xl mx-auto">
          {ctaMode === "call"
            ? "30 minutes with Barry, the PDF eBook for $19.97, or a signed copy for $33.95."
            : "Instant PDF download for $19.97. Signed physical copy from Barry's store for $33.95."}
        </p>
      </div>
    </div>
  </section>
);

export default Hero;
