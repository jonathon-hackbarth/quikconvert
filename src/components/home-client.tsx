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
                about quikconvert
              </h2>
              
              <p>
                <strong>quikconvert</strong> is a fast, easy-to-use kitchen measurement converter designed for home cooks, professional chefs, and bakers. whether you&apos;re following a recipe from another country or scaling your favorite dish, quikconvert instantly converts cooking measurements so you can focus on what matters&mdash;creating delicious food.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6">
                what can you convert?
              </h3>
              <ul className="space-y-3 ml-4">
                <li className="flex gap-3">
                  <span className="text-primary font-bold flex-shrink-0">•</span>
                  <span><strong>volume measurements:</strong> cups, tablespoons, teaspoons, milliliters, liters, and more</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold flex-shrink-0">•</span>
                  <span><strong>weight measurements:</strong> ounces, pounds, grams, kilograms, and other units</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold flex-shrink-0">•</span>
                  <span><strong>temperature:</strong> quickly convert between fahrenheit and celsius for precise cooking</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold flex-shrink-0">•</span>
                  <span><strong>ingredient density:</strong> accurately convert between volume and weight for common ingredients like flour, sugar, butter, and water</span>
                </li>
              </ul>
            </div>

            {/* Right Column */}
            <div className="space-y-6 text-muted-foreground lowercase">
              <h3 className="text-lg font-semibold text-foreground mt-6 lg:mt-0">
                perfect for
              </h3>
              <ul className="space-y-3 ml-4">
                <li className="flex gap-3">
                  <span className="text-primary font-bold flex-shrink-0">•</span>
                  <span>recipe conversion for international recipes</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold flex-shrink-0">•</span>
                  <span>scaling recipes up or down for different serving sizes</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold flex-shrink-0">•</span>
                  <span>baking by weight for more accurate results</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold flex-shrink-0">•</span>
                  <span>quick meal prep calculations</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold flex-shrink-0">•</span>
                  <span>kitchen measurement reference</span>
                </li>
              </ul>

              <p className="mt-8 pt-4 border-t border-muted-foreground/20">
                convert cooking measurements instantly with quikconvert&mdash;the fastest kitchen converter for recipes, baking, and meal prep. no ads, no distractions, just accurate conversions when you need them.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
