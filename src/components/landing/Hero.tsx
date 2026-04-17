import { Play } from "lucide-react";
import { useState } from "react";
import bookCover from "@/assets/book-cover.png";

const Hero = () => {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="section bg-background">
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left column */}
          <div className="lg:col-span-6 order-1">
            <h1 className="h1-display text-foreground mb-6">
              How to Retire in 10 Years{" "}
              <span className="text-accent-primary italic">Without</span> the Stock Market,{" "}
              <span className="text-accent-primary italic">Without</span> a 401(k), and{" "}
              <span className="text-accent-primary italic">Without</span> Waiting Until You're 65
            </h1>
            <p className="lede mb-8 max-w-[34rem]">
              The portfolio, the framework, and the infrastructure piece nobody told you about.
              Built through the 2008 crash. Stress-tested through 17 years. Written down for the
              first time in <em>Live Rich, Die Rich</em>.
            </p>

            <a href="#checkout" className="btn-primary mb-4">
              Get the Book $19.97
            </a>

            <p className="micro-trust max-w-[32rem]">
              Ships today as instant digital download. Print edition available at checkout.
              17 years of real deals. Over 10,000 readers.
            </p>
          </div>

          {/* Right column video + book overlay */}
          <div className="lg:col-span-6 order-2 relative">
            <div className="relative">
              <div className="relative aspect-video w-full overflow-hidden rounded-[4px] bg-foreground/90 border border-rule">
                {!playing ? (
                  <button
                    type="button"
                    onClick={() => setPlaying(true)}
                    aria-label="Play Barry's 90-second story"
                    className="group absolute inset-0 flex items-center justify-center"
                  >
                    {/* Faux backdrop */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(ellipse at center, hsl(36 11% 26%) 0%, hsl(30 9% 10%) 75%)",
                      }}
                    />
                    <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-background/95 transition-transform duration-300 group-hover:scale-105">
                      <Play className="h-7 w-7 fill-accent-primary text-accent-primary ml-1" />
                    </span>
                    <span className="sr-only">Play video</span>
                  </button>
                ) : (
                  <iframe
                    title="Barry Brooksby the 2008 story"
                    src="about:blank"
                    className="absolute inset-0 h-full w-full"
                  />
                )}
              </div>

              {/* Book cover overlay desktop */}
              <img
                src={bookCover}
                alt="Live Rich, Die Rich book by Barry Brooksby"
                width={400}
                height={500}
                className="hidden md:block absolute -bottom-8 -right-6 w-40 lg:w-48 drop-shadow-[0_18px_30px_rgba(28,26,23,0.25)] rotate-[3deg]"
              />
            </div>

            <p className="text-center mt-6 text-sm italic text-ink-muted">
              Barry Brooksby the 2008 story, in 90 seconds.
            </p>

            {/* Mobile book cover */}
            <div className="md:hidden flex justify-center mt-6">
              <img
                src={bookCover}
                alt="Live Rich, Die Rich book cover"
                width={400}
                height={500}
                className="w-44 drop-shadow-[0_18px_30px_rgba(28,26,23,0.25)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
