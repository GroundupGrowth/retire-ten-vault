import type { ReactNode } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { getSiteConfig } from "@/config/site";

type Props = {
  children: ReactNode;
};

const BookingDialog = ({ children }: Props) => {
  const { bookingUrl } = getSiteConfig();
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
        />
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
