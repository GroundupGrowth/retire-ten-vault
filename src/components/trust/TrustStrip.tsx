import TrustpilotWidget from "./TrustpilotWidget";

type Props = {
  eyebrow?: string;
};

const TrustStrip = ({ eyebrow = "Trusted by Readers" }: Props) => (
  <section className="py-12 md:py-16 bg-background">
    <div className="container-page">
      <p className="eyebrow text-center mb-6 text-ink-muted">{eyebrow}</p>
      <TrustpilotWidget />
    </div>
  </section>
);

export default TrustStrip;
