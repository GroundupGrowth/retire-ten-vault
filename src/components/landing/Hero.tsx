import bookCover from "@/assets/book-cover.png";
import MainCTA, { type CtaMode } from "@/components/cta/MainCTA";
import TrustpilotWidget from "@/components/trust/TrustpilotWidget";

const FASTPAY_URL =
  "https://link.fastpaydirect.com/payment-link/69e6335e7dd3512d9207788d";

type Props = {
  ctaMode?: CtaMode;
};

const Hero = ({ ctaMode = "buy" }: Props) => (
  <section className="section bg-background">
    <div className="container-page">
      <div className="relative text-center max-w-3xl mx-auto mb-8">
        <img
          src={bookCover}
          alt=""
          aria-hidden="true"
          width={400}
          height={500}
          className="hidden md:block absolute top-2 -right-4 lg:-right-12 w-20 lg:w-28 drop-shadow-[0_18px_30px_rgba(28,26,23,0.25)] rotate-[8deg]"
        />
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
        <div className="w-full max-w-sm">
          <TrustpilotWidget
            templateId="5419b6a8b0d04a076446a9ad"
            height="24px"
            width="100%"
          />
        </div>
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
              Or Get the Book — $19.97
            </a>
          )}
        </div>
        <p className="micro-trust max-w-xl mx-auto">
          {ctaMode === "call"
            ? "30 minutes with Barry, or skip ahead and grab the book. No pitch either way."
            : "Ships today as instant digital download. Print edition available at checkout. 17 years of real deals. Over 10,000 readers."}
        </p>
      </div>

      <div className="flex justify-center mt-14">
        <img
          src={bookCover}
          alt="Live Rich, Die Rich book by Barry Brooksby"
          width={400}
          height={500}
          className="w-36 md:w-44 drop-shadow-[0_18px_30px_rgba(28,26,23,0.25)] rotate-[-3deg]"
        />
      </div>
    </div>
  </section>
);

export default Hero;
