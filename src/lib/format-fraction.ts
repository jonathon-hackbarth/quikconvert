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

    // Possible fractions (sorted by value): 0, 1/4, 1/3, 1/2, 2/3, 3/4, 1
    // Thresholds (midpoints between fractions):
    // 0 to 1/4: threshold at 0.125 (midpoint between 0 and 0.25)
    // 1/4 to 1/3: threshold at 0.292 (midpoint between 0.25 and 0.333)
    // 1/3 to 1/2: threshold at 0.417 (midpoint between 0.333 and 0.5)
    // 1/2 to 2/3: threshold at 0.583 (midpoint between 0.5 and 0.667)
    // 2/3 to 3/4: threshold at 0.708 (midpoint between 0.667 and 0.75)
    // 3/4 to 1: threshold at 0.875 (midpoint between 0.75 and 1)
    const fractionRanges: Array<{
      value: number;
      numerator: number;
      denominator: number;
      threshold: number;
    }> = [
      { value: 0, numerator: 0, denominator: 1, threshold: 0.125 },
      { value: 0.25, numerator: 1, denominator: 4, threshold: 0.292 },
      { value: 0.333, numerator: 1, denominator: 3, threshold: 0.417 },
      { value: 0.5, numerator: 1, denominator: 2, threshold: 0.583 },
      { value: 0.667, numerator: 2, denominator: 3, threshold: 0.708 },
      { value: 0.75, numerator: 3, denominator: 4, threshold: 0.875 },
      { value: 1, numerator: 1, denominator: 1, threshold: 1 },
    ];

    // Find which range the decimal part falls into
    let closestFraction = fractionRanges[0]; // default to 0
    for (const range of fractionRanges) {
      if (decimalPart < range.threshold) {
        closestFraction = range;
        break;
      }
    }

    // Check if it's an exact match (within 1%)
    const fracValue = closestFraction.value;
    const isExact = Math.abs(fracValue - decimalPart) < 0.01;
    const isRounded = !isExact;

    // Build the main value
    let main: string;
    
    if (closestFraction.denominator === 1) {
      // It's an integer
      const prefix = isRounded ? "~" : "";
      main = `${prefix}${intPart + closestFraction.numerator}`;
    } else if (closestFraction.numerator === 0) {
      // It's 0
      if (intPart === 0) {
        main = "0";
      } else {
        main = intPart.toString();
      }
    } else {
      // It's a proper fraction
      const prefix = isRounded ? "~" : "";
      if (intPart === 0) {
        main = `${prefix}${closestFraction.numerator}/${closestFraction.denominator}`;
      } else {
        main = `${prefix}${intPart} ${closestFraction.numerator}/${closestFraction.denominator}`;
      }
    }

    // Show subtitle when rounded
    if (isRounded) {
      return { main, subtitle: exactDecimal.toString() };
    } else {
      return { main };
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
