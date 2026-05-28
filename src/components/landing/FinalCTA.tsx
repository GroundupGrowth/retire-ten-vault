import MainCTA, { type CtaMode } from "@/components/cta/MainCTA";
import SignedCopyCTA from "@/components/cta/SignedCopyCTA";

type Props = {
  ctaMode?: CtaMode;
};

const FinalCTA = ({ ctaMode = "buy" }: Props) => (
  <section id="checkout" className="section" style={{ background: "hsl(var(--accent-primary))" }}>
    <div className="container-prose text-center">
      <h2
        className="font-serif font-medium leading-tight mb-6"
        style={{
          color: "hsl(var(--background))",
          fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
          letterSpacing: "-0.02em",
        }}
      >
        The Next 10 Years Are Going to Pass Either Way.
      </h2>
      <p
        className="mb-10 text-lg md:text-xl"
        style={{ color: "hsl(var(--background) / 0.85)", fontWeight: 400 }}
      >
        The only question is what you own at the end of them.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <MainCTA mode={ctaMode} variant="inverted" />
        <SignedCopyCTA variant="inverted-outline" />
      </div>

      <p
        className="mt-5 text-sm"
        style={{ color: "hsl(var(--background) / 0.7)" }}
      >
        {ctaMode === "call"
          ? "30 minutes with Barry. PDF eBook for $19.97 or signed copy for $33.95."
          : "Instant PDF download for $19.97 or signed physical copy for $33.95."}
      </p>
    </div>
  </section>
);

export default FinalCTA;
