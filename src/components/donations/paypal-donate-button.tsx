import { cn } from "@/lib/utils";

/**
 * PayPal's gold button, the colour they treat as the default and the one with
 * the most donor recognition. The brand rules let us pick from their palette
 * (gold/blue/black/white/silver) but not restyle the button, so the plate
 * colour, pill radius and two-tone wordmark are fixed here rather than themed
 * with our saffron.
 */
export function PayPalDonateButton({
  href,
  label = "Donate",
  className,
}: {
  href: string;
  label?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#FFC439] px-4 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
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
