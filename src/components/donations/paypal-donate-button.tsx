import { cn } from "@/lib/utils";

/**
 * PayPal's donate button. The brand rules let us pick from their palette
 * (gold/blue/black/white/silver) but not restyle the button, so the plate
 * colour, pill radius and two-tone wordmark are fixed here rather than themed
 * with our saffron. Gold is their default and the most recognisable; white is
 * for when PayPal sits beside a primary action it shouldn't outshout.
 */
export function PayPalDonateButton({
  href,
  label = "Donate",
  variant = "gold",
  className,
}: {
  href: string;
  label?: string;
  variant?: "gold" | "white";
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex w-full items-center justify-center gap-2 rounded-full px-4 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        variant === "gold"
          ? "h-11 bg-[#FFC439]"
          : "h-10 border border-[#C9C4BE] bg-white",
        className,
      )}
    >
      <span className="text-[17px] font-bold italic leading-none">
        <span className="text-[#003087]">Pay</span>
        <span className="text-[#009CDE]">Pal</span>
      </span>
      <span className="text-sm font-semibold leading-none text-[#003087]">
        {label}
      </span>
    </a>
  );
}
