import BookingDialog from "@/components/booking/BookingDialog";

type Variant = "primary" | "inverted";

type Props = {
  variant?: Variant;
  className?: string;
  label?: string;
};

const MainCTA = ({ variant = "primary", className = "", label = "Book a Call with Barry" }: Props) => {
  const base = variant === "inverted" ? "btn-primary-inverted" : "btn-primary";
  const cls = className ? `${base} ${className}` : base;

  return (
    <BookingDialog>
      <button type="button" className={cls}>
        {label}
      </button>
    </BookingDialog>
  );
};

export default MainCTA;
