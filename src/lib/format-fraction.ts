/**
 * Unit system classification
 */
export type UnitSystem = "metric" | "imperial" | "temperature" | "other";

/**
 * Determine if a unit is metric or imperial
 * Metric: g, kg, mg, ml, l, cm, m, km, mm
 * Imperial: oz, lb, cup, tbsp, tsp, floz, inch, ft, yard, mile
 */
export function getUnitSystem(unit: string): UnitSystem {
  const normalized = unit.toLowerCase().trim();

  // Metric units
  const metricUnits = ["g", "kg", "mg", "ml", "l", "cm", "m", "km", "mm"];
  if (metricUnits.includes(normalized)) {
    return "metric";
  }

  // Imperial/cooking units
  const imperialUnits = [
    "oz",
    "oz-weight",
    "lb",
    "lbs",
    "cup",
    "cups",
    "tbsp",
    "tablespoon",
    "tsp",
    "teaspoon",
    "floz",
    "fl oz",
    "in",
    "ft",
    "yd",
    "mi",
    "stick",
  ];
  if (imperialUnits.includes(normalized)) {
    return "imperial";
  }

  // Temperature
  const temperatureUnits = ["f", "c", "k"];
  if (temperatureUnits.includes(normalized)) {
    return "temperature";
  }

  return "other";
}

/**
 * Find the closest fraction match for a decimal value
 * Returns [numerator, denominator] or null if no good match
 * minFraction: minimum fraction size (e.g., 0.25 for 1/4)
 */
export function findClosestFraction(
  decimalPart: number,
  maxDenominator: number = 16,
  minFraction: number = 0.01
): [number, number] | null {
  const tolerance = 1 / (maxDenominator * maxDenominator);

  // Prioritize by denominator (smaller denominators first for simpler fractions)
  // but still respect minFraction constraint
  for (let denominator = 1; denominator <= maxDenominator; denominator++) {
    for (let numerator = 1; numerator < denominator; numerator++) {
      const fraction = numerator / denominator;
      // Skip fractions smaller than minFraction
      if (fraction < minFraction) continue;
      if (Math.abs(fraction - decimalPart) < tolerance) {
        return [numerator, denominator];
      }
    }
  }

  return null;
}

/**
 * Result of formatting with optional subtitle for exact decimal
 */
export interface FormattedAmount {
  main: string; // The main display value (fraction for imperial, decimal for metric)
  subtitle?: string; // Optional exact decimal (for imperial when rounded/approximate)
}

/**
 * Smart formatting based on unit system
 * - Metric: always decimal
 * - Imperial: always show fraction, with optional exact decimal subtitle
 * - Temperature: decimal
 */
export function formatAmount(
  value: number,
  unit: string
): FormattedAmount {
  const unitSystem = getUnitSystem(unit);

  // Handle integers first
  if (Number.isInteger(value)) {
    return { main: value.toString() };
  }

  // Metric and temperature: always decimal
  if (unitSystem === "metric" || unitSystem === "temperature") {
    // Round to reasonable decimal places
    const decimal = parseFloat(value.toFixed(10)).toString();
    return { main: decimal };
  }

  // Imperial: always use fractions with optional exact decimal subtitle
  if (unitSystem === "imperial") {
    const intPart = Math.floor(value);
    const decimalPart = value - intPart;
    const exactDecimal = parseFloat(value.toFixed(10));

    // If decimal part is >= 0.875 (7/8), round up to next integer
    if (decimalPart >= 0.875) {
      return { main: Math.round(value).toString() };
    }

    // Try to find a good fraction match (max denominator 4)
    // Possible fractions: 1/2, 1/3, 2/3, 1/4, 3/4
    const possibleFractions: [number, number][] = [
      [1, 2], // 0.5
      [1, 3], // 0.333...
      [2, 3], // 0.666...
      [1, 4], // 0.25
      [3, 4], // 0.75
    ];

    const tolerance = 0.05; // 5% tolerance for matching
    
    let bestFraction: [number, number] | null = null;
    let bestError = Infinity;

    // Check all possible fractions
    for (const [num, denom] of possibleFractions) {
      const frac = num / denom;
      const error = Math.abs(frac - decimalPart);
      
      if (error < bestError) {
        bestError = error;
        bestFraction = [num, denom];
      }
    }

    // If we found a good match (within tolerance), use it
    if (bestFraction && bestError < tolerance) {
      const [numerator, denominator] = bestFraction;
      
      // Check if it's a very close match (within 1%)
      const fracValue = numerator / denominator;
      const isExact = Math.abs(fracValue - decimalPart) < 0.01;
      
      let main: string;
      if (intPart === 0) {
        main = `${numerator}/${denominator}`;
      } else {
        main = `${intPart} ${numerator}/${denominator}`;
      }
      
      // Show subtitle for non-exact matches
      if (!isExact) {
        return { main, subtitle: exactDecimal.toString() };
      } else {
        return { main };
      }
    } else {
      // No good fraction found, round to nearest fraction and show exact decimal
      let roundedFraction = bestFraction || [1, 2]; // default to 1/2
      
      const [numerator, denominator] = roundedFraction;
      let main: string;
      if (intPart === 0) {
        main = `${numerator}/${denominator}`;
      } else {
        main = `${intPart} ${numerator}/${denominator}`;
      }
      
      // Always show subtitle when we had to round significantly
      return { main, subtitle: exactDecimal.toString() };
    }
  }

  // Other units: decimal
  return { main: parseFloat(value.toFixed(10)).toString() };
}

/**
 * Legacy function for backward compatibility
 * Use formatAmount() instead
 */
export function formatWithFraction(value: number): string {
  // Default to imperial for this legacy function
  const result = formatAmount(value, "cup");
  return result.main;
}
