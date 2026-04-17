import Hero from "@/components/landing/Hero";
import TwoPaths from "@/components/landing/TwoPaths";
import WhoFor from "@/components/landing/WhoFor";
import Credibility from "@/components/landing/Credibility";
import InsideBook from "@/components/landing/InsideBook";
import Mechanism from "@/components/landing/Mechanism";
import BonusStack from "@/components/landing/BonusStack";
import StrategyCTA from "@/components/landing/StrategyCTA";
import Objections from "@/components/landing/Objections";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

const Index = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: "Live Rich, Die Rich",
    author: { "@type": "Person", name: "Barry Brooksby" },
    offers: {
      "@type": "Offer",
      price: "19.97",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    description:
      "A 17-year real estate investor's playbook for retiring in 10 years — without the stock market, without a 401(k), and without waiting until 65.",
  };

  return (
    <main className="bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <TwoPaths />
      <WhoFor />
      <Credibility />
      <InsideBook />
      <Mechanism />
      <BonusStack />
      <StrategyCTA />
      <Objections />
      <FinalCTA />
      <Footer />
    </main>
  );
};

export default Index;
