import { useEffect, type ReactNode } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { getSiteConfig } from "@/config/site";

const FORM_EMBED_SRC = "https://link.msgsndr.com/js/form_embed.js";

const ensureFormEmbedScript = () => {
  if (typeof document === "undefined") return;
  if (document.querySelector(`script[src="${FORM_EMBED_SRC}"]`)) return;
  const script = document.createElement("script");
  script.src = FORM_EMBED_SRC;
  script.async = true;
  document.body.appendChild(script);
};

type Props = {
  children: ReactNode;
};

const BookingDialog = ({ children }: Props) => {
  const { bookingUrl } = getSiteConfig();

  useEffect(() => {
    ensureFormEmbedScript();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl w-[95vw] p-0 overflow-hidden sm:rounded-lg bg-background">
        <DialogTitle className="sr-only">Book a Strategy Session with Barry Brooksby</DialogTitle>
        <iframe
          src={bookingUrl}
          title="Book a strategy session with Barry Brooksby"
          className="w-full h-[85vh] max-h-[820px] border-0"
          loading="lazy"
          scrolling="no"
        />
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
