import bookCover from "@/assets/book-cover.png";
import MainCTA, { type CtaMode } from "@/components/cta/MainCTA";

type Props = {
  ctaMode?: CtaMode;
};

const Hero = ({ ctaMode = "buy" }: Props) => (
  <section className="section bg-background">
    <div className="container-page">
      <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
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
        <MainCTA mode={ctaMode} className="mb-4" />
        <p className="micro-trust max-w-xl mx-auto">
          {ctaMode === "call"
            ? "30 minutes. No cost. No obligation. 17 years of real deals."
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
