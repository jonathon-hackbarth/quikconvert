/**
 * Parse amount string to a number
 * Supports:
 * - Integers: "5"
 * - Decimals: "1.5"
 * - Fractions: "1/2"
 * - Mixed numbers: "1 1/2" or "2 3/4"
 */
export function parseAmount(input: string): number | null {
  if (!input || typeof input !== "string") return null;

  const trimmed = input.trim();
  if (!trimmed) return null;

  // Check for mixed number format: "1 1/2" or "2 3/4"
  const mixedMatch = trimmed.match(/^(\d+(?:\.\d+)?)\s+(\d+)\/(\d+)$/);
  if (mixedMatch) {
    const whole = parseFloat(mixedMatch[1]);
    const numerator = parseInt(mixedMatch[2], 10);
    const denominator = parseInt(mixedMatch[3], 10);

    if (denominator === 0) return null;
    return whole + numerator / denominator;
  }

  // Check for simple fraction: "1/2"
  const fractionMatch = trimmed.match(/^(\d+)\/(\d+)$/);
  if (fractionMatch) {
    const numerator = parseInt(fractionMatch[1], 10);
    const denominator = parseInt(fractionMatch[2], 10);

    if (denominator === 0) return null;
    return numerator / denominator;
  }

  // Try parsing as decimal or integer
  const num = parseFloat(trimmed);
  if (!isNaN(num)) return num;

  return null;
}


