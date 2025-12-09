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
 */
export function findClosestFraction(
  decimalPart: number,
  maxDenominator: number = 16
): [number, number] | null {
  const tolerance = 1 / (maxDenominator * maxDenominator);

  for (let denominator = 1; denominator <= maxDenominator; denominator++) {
    for (let numerator = 1; numerator < denominator; numerator++) {
      const fraction = numerator / denominator;
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
 * - Imperial: use fractions, with decimal fallback for non-exact fractions
 * - Temperature: decimal
 */
export function formatAmount(
  value: number,
  unit: string,
  maxDenominator: number = 16
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

  // Imperial: use fractions
  if (unitSystem === "imperial") {
    const intPart = Math.floor(value);
    const decimalPart = value - intPart;

    // Try to find exact fraction
    const fraction = findClosestFraction(decimalPart, maxDenominator);

    if (fraction) {
      const [numerator, denominator] = fraction;
      if (intPart === 0) {
        return `${numerator}/${denominator}`;
      } else {
        return `${intPart} ${numerator}/${denominator}`;
      }
    } else {
      // No exact fraction found - show approximate fraction + decimal
      // Find the closest fraction even if not that close
      let bestFraction: [number, number] | null = null;
      let bestError = Infinity;

      for (let denominator = 1; denominator <= maxDenominator; denominator++) {
        for (let numerator = 1; numerator < denominator; numerator++) {
          const fraction = numerator / denominator;
          const error = Math.abs(fraction - decimalPart);
          if (error < bestError) {
            bestError = error;
            bestFraction = [numerator, denominator];
          }
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
  }

  // Other units: decimal
  return parseFloat(value.toFixed(10)).toString();
}

/**
 * Legacy function for backward compatibility
 * Use formatAmount() instead
 */
export function formatWithFraction(
  value: number,
  maxDenominator: number = 16
): string {
  // Default to imperial for this legacy function
  return formatAmount(value, "cup", maxDenominator);
}
