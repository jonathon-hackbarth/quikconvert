import {
  unitDefinitions,
  aliasMap,
  getUnitFactor,
} from "@/constants/converters";
import { getIngredientDensity } from "@/constants/ingredients";

interface ResolvedUnit {
  unit: string;
  type: string;
}

interface ConversionResult {
  result: number;
  error: string | null;
}

/**
 * Resolve a single unit input to a canonical unit
 */
export function resolveUnit(input: string): ResolvedUnit | null {
  const normalized = input.toLowerCase().trim();

  const aliasEntry = aliasMap[normalized];
  if (!aliasEntry) {
    return null;
  }

  // Handle ambiguous units
  if (aliasEntry.unit.startsWith("ambiguous:")) {
    const ambigUnit = aliasEntry.unit.replace("ambiguous:", "") as keyof typeof ambiguousUnits;
    const ambig = ambiguousUnits[ambigUnit];
    if (ambig) {
      return {
        unit: ambig.default,
        type: Object.keys(unitDefinitions).find(
          (t) => unitDefinitions[t as keyof typeof unitDefinitions][ambig.default]
        ) || "unknown",
      };
    }
  }

  return aliasEntry;
}

/**
 * Resolve a pair of units together, handling ambiguous cases
 * Uses context from one unit to disambiguate the other
 */
export function resolveUnitPair(
  fromInput: string,
  toInput: string
): { fromUnit: ResolvedUnit; toUnit: ResolvedUnit } | { error: string } {
  const fromNorm = fromInput.toLowerCase().trim();
  const toNorm = toInput.toLowerCase().trim();

  // First pass: try direct resolution
  let fromEntry = aliasMap[fromNorm];
  let toEntry = aliasMap[toNorm];

  if (!fromEntry) {
    return { error: `Unknown unit: ${fromInput}` };
  }
  if (!toEntry) {
    return { error: `Unknown unit: ${toInput}` };
  }

  const fromType = fromEntry.type;
  const toType = toEntry.type;

  // Allow weight-to-volume and volume-to-weight conversions (handled via density)
  // All other mismatches are errors
  const weightVolumeConversions = 
    (fromType === "weight" && toType === "volume") ||
    (fromType === "volume" && toType === "weight");

  if (fromType !== toType && !weightVolumeConversions) {
    return {
      error: `Cannot convert ${fromType} to ${toType}`,
    };
  }

  return {
    fromUnit: { unit: fromEntry.unit, type: fromType },
    toUnit: { unit: toEntry.unit, type: toType },
  };
}

/**
 * Perform linear conversion between two compatible units
 */
function linearConvert(
  value: number,
  fromUnit: string,
  toUnit: string,
  fromType: string
): ConversionResult {
  const fromFactor = getUnitFactor(fromUnit, fromType);
  const toFactor = getUnitFactor(toUnit, fromType);

  if (fromFactor === undefined || toFactor === undefined) {
    return {
      result: 0,
      error: "Unit conversion factors not available",
    };
  }

  const inBaseUnit = value * fromFactor;
  const result = inBaseUnit / toFactor;

  return { result, error: null };
}

/**
 * Convert weight to volume using ingredient density
 */
function weightToVolumeConvert(
  value: number,
  fromUnit: string,
  toUnit: string,
  ingredient?: string
): ConversionResult {
  // Get the density in grams per cup
  const densityGramsPerCup = getIngredientDensity(ingredient);

  // Convert the weight to grams (from unit is weight)
  const gramsResult = linearConvert(value, fromUnit, "g", "weight");
  if (gramsResult.error) return gramsResult;

  // Convert grams to cups using density
  const cups = gramsResult.result / densityGramsPerCup;

  // Convert cups to target volume unit
  return linearConvert(cups, "cup", toUnit, "volume");
}

/**
 * Convert volume to weight using ingredient density
 */
function volumeToWeightConvert(
  value: number,
  fromUnit: string,
  toUnit: string,
  ingredient?: string
): ConversionResult {
  // Get the density in grams per cup
  const densityGramsPerCup = getIngredientDensity(ingredient);

  // Convert the volume to cups (from unit is volume)
  const cupsResult = linearConvert(value, fromUnit, "cup", "volume");
  if (cupsResult.error) return cupsResult;

  // Convert cups to grams using density
  const grams = cupsResult.result * densityGramsPerCup;

  // Convert grams to target weight unit
  return linearConvert(grams, "g", toUnit, "weight");
}

/**
 * Convert temperature between units
 */
function temperatureConvert(
  value: number,
  fromUnit: string,
  toUnit: string
): ConversionResult {
  if (fromUnit === toUnit) {
    return { result: value, error: null };
  }

  const from = fromUnit.toLowerCase();
  const to = toUnit.toLowerCase();

  // Celsius to other units
  if (from === "c") {
    if (to === "f") {
      return { result: (value * 9) / 5 + 32, error: null };
    }
    if (to === "k") {
      return { result: value + 273.15, error: null };
    }
  }

  // Fahrenheit to other units
  if (from === "f") {
    if (to === "c") {
      return { result: ((value - 32) * 5) / 9, error: null };
    }
    if (to === "k") {
      return { result: ((value - 32) * 5) / 9 + 273.15, error: null };
    }
  }

  // Kelvin to other units
  if (from === "k") {
    if (to === "c") {
      return { result: value - 273.15, error: null };
    }
    if (to === "f") {
      return { result: ((value - 273.15) * 9) / 5 + 32, error: null };
    }
  }

  return { result: 0, error: "Invalid temperature conversion" };
}

/**
 * Main conversion function
 * @param value The numerical value to convert
 * @param fromInput The source unit (can be weight or volume)
 * @param toInput The target unit (can be weight or volume)
 * @param ingredient Optional ingredient name for density-based conversions
 */
export function convert(
  value: number,
  fromInput: string,
  toInput: string,
  ingredient?: string
): ConversionResult {
  // Validate inputs
  if (!fromInput || !toInput) {
    return { result: 0, error: "Both units must be specified" };
  }

  // Resolve units with context awareness
  const resolution = resolveUnitPair(fromInput, toInput);
  if ("error" in resolution) {
    return { result: 0, error: resolution.error };
  }

  const { fromUnit, toUnit } = resolution;

  // Handle temperature specially
  if (fromUnit.type === "temperature") {
    return temperatureConvert(value, fromUnit.unit, toUnit.unit);
  }

  // Handle weight-to-volume conversions (requires density)
  if (fromUnit.type === "weight" && toUnit.type === "volume") {
    return weightToVolumeConvert(value, fromUnit.unit, toUnit.unit, ingredient);
  }

  // Handle volume-to-weight conversions (requires density)
  if (fromUnit.type === "volume" && toUnit.type === "weight") {
    return volumeToWeightConvert(value, fromUnit.unit, toUnit.unit, ingredient);
  }

  // Handle linear conversions (same type)
  return linearConvert(value, fromUnit.unit, toUnit.unit, fromUnit.type);
}
