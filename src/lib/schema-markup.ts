/**
 * JSON-LD Schema markup for quikconvert app
 * Provides structured data for search engines
 */

export function getSchemaMarkup() {
  return {
    "@type": "WebApplication",
    name: "quikconvert",
    description:
      "Convert recipe measurements from cups, tablespoons, and teaspoons to grams for food scales. The best volume to weight converter for baking by weight. Instantly convert fractions like 1/3 cup to grams, 2 tbsp to grams, and more.",
    url: "https://quikconvert.app",
    applicationCategory: "UtilityApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    creator: {
      "@type": "Person",
      name: "Jonathan Hackbarth",
    },
    author: {
      "@type": "Person",
      name: "Jonathan Hackbarth",
    },
    keywords: [
      "cups to grams",
      "tablespoons to grams",
      "teaspoons to grams",
      "volume to weight converter",
      "baking by weight",
      "food scale converter",
      "recipe converter",
      "kitchen scale measurements",
    ],
  };
}

export function getConverterSchemaMarkup() {
  return [
    {
      "@type": "HowTo",
      name: "How to Convert Cups and Tablespoons to Grams for Food Scales",
      description:
        "Convert recipe volume measurements (cups, tablespoons, teaspoons) to weight in grams for use with food scales. Perfect for baking by weight with accurate conversions including ingredient-specific densities.",
      step: [
        {
          "@type": "HowToStep",
          name: "Select volume to weight conversion",
          text: "Choose volume units like cups, tablespoons (tbsp), or teaspoons (tsp) to convert to weight in grams",
        },
        {
          "@type": "HowToStep",
          name: "Enter the recipe measurement",
          text: "Input the volume measurement from your recipe, including fractions like 1/3 cup or 2 1/2 tablespoons",
        },
        {
          "@type": "HowToStep",
          name: "Select ingredient type (optional)",
          text: "For accurate conversions, specify the ingredient (flour, sugar, butter, etc.) as different ingredients have different densities",
        },
        {
          "@type": "HowToStep",
          name: "Get weight in grams for your food scale",
          text: "The converted weight appears instantly in grams, ready to measure on your kitchen food scale for precise baking results",
        },
      ],
    },
  ];
}
