"use client";

import { SimpleConverter } from "@/components/simple-converter";
import { ThemeToggle } from "@/components/theme";
import { BuyMeCoffee } from "@/components/common/buy-me-coffee";

export function HomeClient() {
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

      {/* SEO Content Section */}
      <section className="w-full mt-12">
        <div className="bg-muted/30">
          <div className="w-full flex flex-col lg:grid lg:grid-cols-2 lg:gap-8 lg:gap-12 px-4 lg:px-8 py-12 sm:py-16">
            {/* Left Column */}
            <div className="space-y-6 text-muted-foreground lowercase">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                convert cups to grams for your food scale
              </h2>
              
              <p>
                <strong>quikconvert</strong> is the fastest way to convert recipe volume measurements (cups, tablespoons, teaspoons) to grams for your food scale. perfect for bakers and home cooks who want the precision of weight-based measurements. convert fractions like <strong>1/3 cup to grams</strong>, <strong>2 tablespoons to grams</strong>, or <strong>1 1/2 teaspoons to grams</strong> instantly.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6">
                why convert volume to weight?
              </h3>
              <ul className="space-y-3 ml-4">
                <li className="flex gap-3">
                  <span className="text-primary font-bold flex-shrink-0">•</span>
                  <span><strong>more accurate baking:</strong> weight measurements (grams) are more precise than volume (cups), leading to better results</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold flex-shrink-0">•</span>
                  <span><strong>use your food scale:</strong> if you have a kitchen scale that measures in grams, easily convert any recipe</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold flex-shrink-0">•</span>
                  <span><strong>international recipes:</strong> many recipes worldwide use grams instead of cups</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold flex-shrink-0">•</span>
                  <span><strong>ingredient-specific conversions:</strong> different ingredients have different densities (1 cup of flour ≠ 1 cup of sugar in grams)</span>
                </li>
              </ul>
            </div>

            {/* Right Column */}
            <div className="space-y-6 text-muted-foreground lowercase">
              <h3 className="text-lg font-semibold text-foreground mt-6 lg:mt-0">
                what you can convert
              </h3>
              <ul className="space-y-3 ml-4">
                <li className="flex gap-3">
                  <span className="text-primary font-bold flex-shrink-0">•</span>
                  <span><strong>cups to grams:</strong> convert 1 cup, 1/2 cup, 1/3 cup, 1/4 cup, 2/3 cup, 3/4 cup to grams</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold flex-shrink-0">•</span>
                  <span><strong>tablespoons to grams:</strong> convert tbsp measurements to grams for precise weighing</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold flex-shrink-0">•</span>
                  <span><strong>teaspoons to grams:</strong> convert tsp to grams for small ingredient measurements</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold flex-shrink-0">•</span>
                  <span><strong>other volume & weight:</strong> milliliters, liters, ounces, pounds, and kilograms</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold flex-shrink-0">•</span>
                  <span><strong>temperature:</strong> fahrenheit to celsius for oven settings</span>
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mt-8">
                perfect for
              </h3>
              <ul className="space-y-3 ml-4">
                <li className="flex gap-3">
                  <span className="text-primary font-bold flex-shrink-0">•</span>
                  <span>baking by weight with a digital food scale</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold flex-shrink-0">•</span>
                  <span>converting american recipes to metric (grams)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold flex-shrink-0">•</span>
                  <span>precise recipe scaling for consistent results</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold flex-shrink-0">•</span>
                  <span>professional baking and meal prep</span>
                </li>
              </ul>

              <p className="mt-8 pt-4 border-t border-muted-foreground/20">
                convert cups, tablespoons, and teaspoons to grams instantly&mdash;the fastest volume to weight converter for baking by weight and using food scales. no ads, no distractions, just accurate conversions when you need them.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
