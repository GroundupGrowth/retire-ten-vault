import { useEffect, type ReactNode } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { getSiteConfig } from "@/config/site";
import { trackBookCallIntent } from "@/lib/track";

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
    <Dialog
      onOpenChange={(open) => {
        if (open) trackBookCallIntent();
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] p-0 overflow-y-auto sm:rounded-lg bg-background">
        <DialogTitle className="sr-only">Book a Call with Barry Brooksby</DialogTitle>
        <iframe
          src={bookingUrl}
          title="Book a call with Barry Brooksby"
          className="w-full min-h-[700px] border-0"
          loading="lazy"
        />
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
