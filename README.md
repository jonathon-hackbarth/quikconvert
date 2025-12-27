# quikconvert

A fast, accessible, and SEO-friendly web application for converting recipe volume measurements to grams for food scales.

## Killer Feature 🎯

**Convert cups, tablespoons, and teaspoons to grams instantly.** Perfect for bakers and home cooks using food scales. Convert fractions like 1/3 cup to grams, 2 tbsp to grams, or any volume measurement to weight in grams for precise baking results.

Why this matters:
- **Baking by weight is more accurate** than volume measurements
- **Food scales measure in grams** - easily convert any recipe to use your scale
- **Ingredient-specific conversions** - different ingredients have different densities
- **International recipe compatibility** - seamlessly use recipes from around the world

## Features

- **Volume to Weight Conversion**: Cups, tablespoons, teaspoons → grams (primary feature)
- **Focused Converters**: Volume (cups, ml, tbsp), Weight (oz, grams, kg), Temperature (F, C)
- **Additional Conversions**: Length, Area, Speed converters for extended utility
- **Intuitive UI**: Easy-to-use interface with preset buttons and increment controls
- **Dark Mode**: Automatic light/dark theme support with user preference persistence
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Accessible**: Full ARIA support and keyboard navigation
- **SEO Optimized**: Server-side rendering, structured data, Open Graph metadata
- **Fast**: Lightweight, optimized build with 102KB shared JS

## Use Cases

- Converting recipe measurements from cups to grams for food scales
- Baking by weight for consistent, professional results
- Converting American recipes to metric (grams)
- Recipe scaling with precise weight measurements
- International recipe adaptation
- Temperature conversions for ovens

## Tech Stack

- Next.js 15 with App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Radix UI components

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Production Build

```bash
npm run build
npm start
```

## Performance & SEO

- ✅ Server-side rendering for complete indexable content
- ✅ JSON-LD structured data markup for volume-to-weight conversions
- ✅ Open Graph social sharing support
- ✅ Security headers (CSP, X-Frame-Options, Permissions-Policy)
- ✅ robots.txt and sitemap.xml for search engines
- ✅ Mobile-optimized viewport configuration
- ✅ Targeted keywords: cups to grams, tablespoons to grams, volume to weight, food scale converter, baking by weight
- ✅ Primary focus: volume to weight conversion for food scales (killer feature)
- ✅ Secondary: general cooking/kitchen conversions for extended utility

## Deployment

Ready for production deployment. Security headers and CSP are configured in `next.config.ts`.
