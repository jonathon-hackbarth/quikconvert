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
 * Smart formatting based on unit system
 * - Metric: always decimal
 * - Imperial: use fractions with max denominator 4 (1/4 is smallest), with decimal fallback for non-exact fractions
 * - Temperature: decimal
 */
export function formatAmount(
  value: number,
  unit: string
): string {
  const unitSystem = getUnitSystem(unit);

  // Handle integers first
  if (Number.isInteger(value)) {
    return value.toString();
  }

  // Metric and temperature: always decimal
  if (unitSystem === "metric" || unitSystem === "temperature") {
    // Round to reasonable decimal places
    return parseFloat(value.toFixed(10)).toString();
  }

  // Imperial: use fractions (only halves and quarters: 1/4, 1/2, 3/4)
  if (unitSystem === "imperial") {
    const intPart = Math.floor(value);
    const decimalPart = value - intPart;

    // Possible fractions: 1/4, 1/2, 3/4
    const possibleFractions: [number, number][] = [
      [1, 4], // 0.25
      [1, 2], // 0.5
      [3, 4], // 0.75
    ];

    // Try to find exact match (within tolerance)
    const tolerance = 0.01;
    for (const [num, denom] of possibleFractions) {
      if (Math.abs(num / denom - decimalPart) < tolerance) {
        if (intPart === 0) {
          return `${num}/${denom}`;
        } else {
          return `${intPart} ${num}/${denom}`;
        }
      }
    }

    // No exact fraction found - show approximate fraction + decimal
    // Find closest fraction
    let bestFraction: [number, number] | null = null;
    let bestError = Infinity;

    for (const [num, denom] of possibleFractions) {
      const error = Math.abs(num / denom - decimalPart);
      if (error < bestError) {
        bestError = error;
        bestFraction = [num, denom];
      }
    }

    const rounded = parseFloat(value.toFixed(10));
    if (bestFraction) {
      const [numerator, denominator] = bestFraction;
      if (intPart === 0) {
        return `~${numerator}/${denominator} (${rounded})`;
      } else {
        return `~${intPart} ${numerator}/${denominator} (${rounded})`;
      }
    } else {
      // Fallback to decimal only
      return rounded.toString();
    }
  }

  // Other units: decimal
  return parseFloat(value.toFixed(10)).toString();
}

/**
 * Legacy function for backward compatibility
 * Use formatAmount() instead
 */
export function formatWithFraction(value: number): string {
  // Default to imperial for this legacy function
  return formatAmount(value, "cup");
}
