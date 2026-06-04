import BookingDialog from "@/components/booking/BookingDialog";
import { EBOOK_PRODUCT, trackInitiateCheckout } from "@/lib/track";

const FASTPAY_URL =
  "https://link.fastpaydirect.com/payment-link/69e6335e7dd3512d9207788d";

export type CtaMode = "buy" | "call";
type Variant = "primary" | "inverted";

type Props = {
  mode: CtaMode;
  variant?: Variant;
  className?: string;
  buyLabel?: string;
  callLabel?: string;
};

const MainCTA = ({
  mode,
  variant = "primary",
  className = "",
  buyLabel = "Get the PDF eBook — $19.97",
  callLabel = "Book a Call with Barry",
}: Props) => {
  const base = variant === "inverted" ? "btn-primary-inverted" : "btn-primary";
  const cls = className ? `${base} ${className}` : base;

  if (mode === "call") {
    return (
      <BookingDialog>
        <button type="button" className={cls}>
          {callLabel}
        </button>
      </BookingDialog>
    );
  }

  return (
    <a
      href={FASTPAY_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackInitiateCheckout(EBOOK_PRODUCT)}
      className={cls}
    >
      {buyLabel}
    </a>
  );
};

export default MainCTA;
