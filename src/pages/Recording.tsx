import TopBar from "@/components/landing/TopBar";

const Recording = () => (
  <main className="bg-background min-h-screen">
    <TopBar />
    <section className="px-6 py-10 md:py-14">
      <div className="container-page">
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
          <p className="eyebrow mb-3">Recording</p>
          <h1 className="font-serif text-2xl md:text-3xl font-medium text-foreground">
            Barry Brooksby — the 2008 story
          </h1>
        </div>

        <div className="mx-auto w-full max-w-4xl">
          <div className="relative aspect-video w-full overflow-hidden rounded-[14px] bg-foreground/90 border border-rule shadow-[0_24px_48px_rgba(28,26,23,0.22)]">
            <iframe
              title="Barry Brooksby recording"
              src="https://www.tella.tv/video/vid_cmorbvz5t00ye04i286li9168/embed?b=0&title=0&a=1&loop=0&t=0&muted=0&wt=0&o=1"
              className="absolute inset-0 h-full w-full"
              allow="autoplay; fullscreen"
              allowTransparency
            />
          </div>
        </div>
      </div>
    </section>
  </main>
);

export default Recording;
