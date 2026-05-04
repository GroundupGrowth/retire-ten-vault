import TopBar from "@/components/landing/TopBar";
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

const Index = () => (
  <main className="bg-background">
    <TopBar />
    <Hero ctaMode="call" />
    <TwoPaths />
    <WhoFor />
    <Credibility />
    <InsideBook />
    <Mechanism />
    <BonusStack />
    <StrategyCTA />
    <Objections />
    <FinalCTA ctaMode="call" />
    <Footer />
  </main>
);

export default Index;
