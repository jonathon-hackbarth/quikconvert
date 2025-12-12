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
      <section className="w-full bg-muted/30 mt-12 py-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 lowercase">
            about quikconvert
          </h2>
          
          <div className="space-y-4 text-muted-foreground lowercase">
            <p>
              <strong>quikconvert</strong> is a fast, easy-to-use kitchen measurement converter designed for home cooks, professional chefs, and bakers. whether you&apos;re following a recipe from another country or scaling your favorite dish, quikconvert instantly converts cooking measurements so you can focus on what matters&mdash;creating delicious food.
            </p>
            
            <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">
              what can you convert?
            </h3>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong>volume measurements:</strong> cups, tablespoons, teaspoons, milliliters, liters, and more</li>
              <li><strong>weight measurements:</strong> ounces, pounds, grams, kilograms, and other units</li>
              <li><strong>temperature:</strong> quickly convert between fahrenheit and celsius for precise cooking</li>
              <li><strong>ingredient density:</strong> accurately convert between volume and weight for common ingredients like flour, sugar, butter, and water</li>
            </ul>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">
              perfect for
            </h3>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>recipe conversion for international recipes</li>
              <li>scaling recipes up or down for different serving sizes</li>
              <li>baking by weight for more accurate results</li>
              <li>quick meal prep calculations</li>
              <li>kitchen measurement reference</li>
            </ul>

            <p className="mt-6">
              convert cooking measurements instantly with quikconvert&mdash;the fastest kitchen converter for recipes, baking, and meal prep. no ads, no distractions, just accurate conversions when you need them.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
