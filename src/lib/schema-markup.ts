/**
 * JSON-LD Schema markup for quikconvert app
 * Provides structured data for search engines
 */

export function getSchemaMarkup() {
  return {
    "@type": "WebApplication",
    name: "quikconvert",
    description:
      "Fast kitchen and cooking converter for recipes, baking, and meal prep. Convert cups to ml, ounces to grams, Fahrenheit to Celsius instantly.",
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
      "kitchen converter",
      "cooking converter",
      "recipe converter",
      "baking converter",
      "cooking measurements",
    ],
  };
}

export function getConverterSchemaMarkup() {
  return [
    {
      "@type": "HowTo",
      name: "How to Convert Cooking Measurements",
      description:
        "Convert kitchen measurements for recipes and baking. Instantly convert between volume, weight, and temperature units.",
      step: [
        {
          "@type": "HowToStep",
          name: "Select measurement type",
          text: "Choose between volume (cups, ml), weight (oz, grams), or temperature (F, C) conversions",
        },
        {
          "@type": "HowToStep",
          name: "Enter the ingredient amount",
          text: "Input the measurement value you want to convert from your recipe",
        },
        {
          "@type": "HowToStep",
          name: "Select from and to units",
          text: "Choose the 'from' and 'to' units for your cooking measurement conversion",
        },
        {
          "@type": "HowToStep",
          name: "View the result",
          text: "The converted measurement appears instantly, ready to use in your recipe",
        },
      ],
    },
  ];
}
