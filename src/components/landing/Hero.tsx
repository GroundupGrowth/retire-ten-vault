import bookCover from "@/assets/book-cover.png";

const Hero = () => (
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

          <a
            href="https://link.fastpaydirect.com/payment-link/69e6335e7dd3512d9207788d"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mb-4"
          >
            Get the Book $19.97
          </a>

          <p className="micro-trust max-w-[32rem]">
            Ships today as instant digital download. Print edition available at checkout.
            17 years of real deals. Over 10,000 readers.
          </p>
        </div>

        {/* Right column vertical video + book overlay */}
        <div className="lg:col-span-6 order-2 relative">
          <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[320px]">
            <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[14px] bg-foreground/90 border border-rule shadow-[0_24px_48px_rgba(28,26,23,0.18)]">
              <iframe
                title="Barry Brooksby the 2008 story"
                src="https://www.tella.tv/video/vid_cmo7bdg7p02hd04lbdu1jgg4r/embed?b=0&title=0&a=1&loop=0&t=0&muted=0&wt=0&o=1"
                className="absolute inset-0 h-full w-full"
                allow="autoplay; fullscreen"
                allowTransparency
                loading="lazy"
              />
            </div>

            {/* Book cover overlay desktop only */}
            <img
              src={bookCover}
              alt="Live Rich, Die Rich book by Barry Brooksby"
              width={400}
              height={500}
              className="hidden md:block absolute -bottom-10 -right-14 lg:-right-16 w-32 lg:w-40 drop-shadow-[0_18px_30px_rgba(28,26,23,0.25)] rotate-[6deg]"
            />
          </div>

          <p className="text-center mt-6 text-sm italic text-ink-muted">
            Barry Brooksby the 2008 story, in 90 seconds.
          </p>

          {/* Mobile book cover */}
          <div className="md:hidden flex justify-center mt-8">
            <img
              src={bookCover}
              alt="Live Rich, Die Rich book cover"
              width={400}
              height={500}
              className="w-40 drop-shadow-[0_18px_30px_rgba(28,26,23,0.25)] rotate-[-3deg]"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
