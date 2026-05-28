const SIGNED_COPY_URL = "https://focuswealthgroup.com/order1744162850420";

type Props = {
  variant?: "secondary" | "inverted-outline";
  className?: string;
};

const SignedCopyCTA = ({ variant = "secondary", className = "" }: Props) => {
  const isInverted = variant === "inverted-outline";
  const base = isInverted ? "btn-primary-inverted" : "btn-secondary";
  const cls = className ? `${base} ${className}` : base;
  const style = isInverted
    ? {
        background: "transparent",
        color: "hsl(var(--background))",
        borderColor: "hsl(var(--background))",
      }
    : undefined;

  return (
    <a
      href={SIGNED_COPY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cls}
      style={style}
    >
      Get a Signed Copy — $33.95
    </a>
  );
};

export default SignedCopyCTA;
