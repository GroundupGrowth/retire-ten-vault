import bookCover from "@/assets/book-cover.png";

const TestHero = () => (
  <section className="section bg-background">
    <div className="container-page">
      <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
        <p className="eyebrow mb-5">A New Playbook from a 17-Year Real Estate Investor</p>
        <h1 className="h1-display text-foreground mb-6">
          How to Retire in 10 Years{" "}
          <span className="text-accent-primary italic">Without</span> the Stock Market,{" "}
          <span className="text-accent-primary italic">Without</span> a 401(k), and{" "}
          <span className="text-accent-primary italic">Without</span> Waiting Until You're 65
        </h1>
        <p className="lede">
          Watch Barry explain the 2008 pivot that built his portfolio — in 90 seconds.
        </p>
      </div>

      <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[380px] mb-10 md:mb-12">
        <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[14px] bg-foreground/90 border border-rule shadow-[0_24px_48px_rgba(28,26,23,0.22)]">
          <iframe
            title="Barry Brooksby the 2008 story"
            src="https://www.tella.tv/video/vid_cmo7bsal3006z04l2f9w0fya1/embed?b=0&title=0&a=1&loop=0&t=0&muted=0&wt=0&o=1"
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
          className="hidden md:block absolute -bottom-10 -right-16 lg:-right-20 w-32 lg:w-40 drop-shadow-[0_18px_30px_rgba(28,26,23,0.25)] rotate-[6deg]"
        />
      </div>

      <div className="text-center">
        <a
          href="https://link.fastpaydirect.com/payment-link/69e6335e7dd3512d9207788d"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mb-4"
        >
          Get the Book $19.97
        </a>

        <p className="micro-trust max-w-[34rem] mx-auto">
          Ships today as instant digital download. Print edition available at checkout.
          17 years of real deals. Over 10,000 readers.
        </p>
      </div>

      {/* Mobile book cover */}
      <div className="md:hidden flex justify-center mt-10">
        <img
          src={bookCover}
          alt="Live Rich, Die Rich book cover"
          width={400}
          height={500}
          className="w-40 drop-shadow-[0_18px_30px_rgba(28,26,23,0.25)] rotate-[-3deg]"
        />
      </div>
    </div>
  </section>
);

export default TestHero;
