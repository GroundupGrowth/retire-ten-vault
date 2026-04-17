const FinalCTA = () => (
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

      <a href="#checkout" className="btn-primary-inverted">
        Get the Book $19.97
      </a>

      <p
        className="mt-5 text-sm"
        style={{ color: "hsl(var(--background) / 0.7)" }}
      >
        Instant digital delivery. Print edition available at checkout.
      </p>
    </div>
  </section>
);

export default FinalCTA;
