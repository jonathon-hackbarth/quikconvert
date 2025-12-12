import Link from "next/link";
import { Coffee } from "lucide-react";

export function BuyMeCoffee() {
  return (
    <div className="flex flex-col items-center gap-2">
      <Link
        href="https://buymeacoffee.com/jonathonhackbarth"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-1 rounded-md bg-[#FFDD00] hover:bg-[#FFDD00]/90 text-black font-medium transition-colors"
      >
        <Coffee className="h-4 w-4" />
        <span>donate</span>
      </Link>
    </div>
  );
}
