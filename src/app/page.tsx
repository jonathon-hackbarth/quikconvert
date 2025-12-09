"use client";

import { SimpleConverter } from "@/components/simple-converter";
import { ThemeToggle } from "@/components/theme";
import { BuyMeCoffee } from "@/components/common/buy-me-coffee";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with theme toggle and buy me coffee */}
      <div className="flex justify-between items-center p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          quikconvert
        </h1>
        <div className="flex items-center gap-3">
          <BuyMeCoffee />
          <ThemeToggle />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-start justify-center py-8 sm:py-12">
        <SimpleConverter />
      </div>
    </div>
  );
}
