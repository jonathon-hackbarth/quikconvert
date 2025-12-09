/**
 * Convert a decimal number to a fraction representation
 * Returns a formatted string like "3/4" for sensible fractions
 * Returns the decimal as-is if no good fraction match exists
 */
export function formatWithFraction(
  value: number,
  maxDenominator: number = 16
): string {
  // Handle integers
  if (Number.isInteger(value)) {
    return value.toString();
  }

  const tolerance = 1 / (maxDenominator * maxDenominator);
  const intPart = Math.floor(value);
  const decimalPart = value - intPart;

  // Try to find a good fraction approximation
  for (let denominator = 1; denominator <= maxDenominator; denominator++) {
    for (let numerator = 1; numerator < denominator; numerator++) {
      const fraction = numerator / denominator;
      if (Math.abs(fraction - decimalPart) < tolerance) {
        // Found a good match
        if (intPart === 0) {
          // Just the fraction
          return `${numerator}/${denominator}`;
        } else {
          // Mixed number
          return `${intPart} ${numerator}/${denominator}`;
        }
      }
    }
  }

  // No good fraction found, return as decimal
  // Round to a reasonable number of decimal places (10 to match the converter output)
  return parseFloat(value.toFixed(10)).toString();
}
