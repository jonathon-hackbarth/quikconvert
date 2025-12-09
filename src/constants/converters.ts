// Comprehensive unit conversion system with context-aware resolution

// Unit definitions by type with conversion factors (base units shown)
export const unitDefinitions = {
  volume: {
    // Base unit: ml
    tsp: { factor: 4.929, aliases: ["teaspoon", "teaspoons"] },
    tbsp: { factor: 14.787, aliases: ["tablespoon", "tablespoons"] },
    floz: { factor: 29.574, aliases: ["fl oz", "fl. oz.", "fluid ounce", "fluid ounces", "oz"] },
    cup: { factor: 236.588, aliases: ["cups", "c"] },
    pint: { factor: 473.176, aliases: ["pints", "pt"] },
    quart: { factor: 946.353, aliases: ["quarts", "qt"] },
    gallon: { factor: 3785.41, aliases: ["gallons", "gal"] },
    ml: { factor: 1, aliases: ["milliliter", "milliliters"] },
    liter: { factor: 1000, aliases: ["liters", "l"] },
  },
  weight: {
    // Base unit: g
    mg: { factor: 0.001, aliases: ["milligram", "milligrams"] },
    g: { factor: 1, aliases: ["gram", "grams"] },
    kg: { factor: 1000, aliases: ["kilogram", "kilograms", "kilo"] },
    "oz-weight": { factor: 28.3495, aliases: ["ounce", "ounces"] }, // Weight oz
    lb: { factor: 453.592, aliases: ["lbs", "pound", "pounds"] },
    ton: { factor: 1000000, aliases: ["tons", "tonne", "tonnes"] },
  },
  temperature: {
    // Special handling - no base unit
    f: { aliases: ["fahrenheit", "°f"] },
    c: { aliases: ["celsius", "°c", "centigrade"] },
    k: { aliases: ["kelvin", "°k", "kelvins"] },
  },
  length: {
    // Base unit: cm
    mm: { factor: 0.1, aliases: ["millimeter", "millimeters"] },
    cm: { factor: 1, aliases: ["centimeter", "centimeters"] },
    m: { factor: 100, aliases: ["meter", "meters"] },
    km: { factor: 100000, aliases: ["kilometer", "kilometers"] },
    in: { factor: 2.54, aliases: ["inch", "inches"] },
    ft: { factor: 30.48, aliases: ["foot", "feet"] },
    yd: { factor: 91.44, aliases: ["yard", "yards"] },
    mi: { factor: 160934, aliases: ["mile", "miles"] },
  },
  area: {
    // Base unit: sq meters
    "sq m": { factor: 1, aliases: ["m²", "square meter", "square meters"] },
    "sq cm": { factor: 0.0001, aliases: ["cm²", "square centimeter", "square centimeters"] },
    "sq km": { factor: 1000000, aliases: ["km²", "square kilometer", "square kilometers"] },
    "sq in": { factor: 0.00064516, aliases: ["in²", "square inch", "square inches"] },
    "sq ft": { factor: 0.092903, aliases: ["ft²", "square foot", "square feet"] },
    "sq yd": { factor: 0.836127, aliases: ["yd²", "square yard", "square yards"] },
    acre: { factor: 4046.86, aliases: ["acres"] },
    "sq mi": { factor: 2589988, aliases: ["mi²", "square mile", "square miles"] },
    hectare: { factor: 10000, aliases: ["hectares", "ha"] },
  },
  speed: {
    // Base unit: km/h
    "km/h": { factor: 1, aliases: ["kmh", "kph", "kilometers per hour", "kilometer per hour"] },
    mph: { factor: 1.60934, aliases: ["mi/h", "miles per hour", "mile per hour"] },
    "m/s": { factor: 3.6, aliases: ["meters per second", "meter per second"] },
    "ft/s": { factor: 1.09728, aliases: ["fps", "feet per second", "foot per second"] },
    knot: { factor: 1.852, aliases: ["knots", "kn"] },
  },
};

// Build complete alias map from unit definitions
// Note: With autocomplete, ambiguous units like "c" and "oz" don't need special handling
// Users will explicitly select from a list (e.g., "cup" or "celsius")
export function buildAliasMap() {
  const aliases: Record<string, { unit: string; type: string }> = {};

  for (const [type, units] of Object.entries(unitDefinitions)) {
    for (const [unit, config] of Object.entries(units)) {
      // Add the unit itself
      aliases[unit.toLowerCase()] = { unit, type };

      // Add all aliases
      if ("aliases" in config) {
        for (const alias of config.aliases) {
          aliases[alias.toLowerCase()] = { unit, type };
        }
      }
    }
  }

  return aliases;
}

export const aliasMap = buildAliasMap();

// Get all unit types
export function getUnitTypes(): string[] {
  return Object.keys(unitDefinitions);
}

// Get all units of a specific type
export function getUnitsOfType(type: string): string[] {
  return Object.keys(unitDefinitions[type as keyof typeof unitDefinitions] || {});
}

// Get conversion factor for a unit
export function getUnitFactor(
  unit: string,
  type: string
): number | undefined {
  const typeUnits = unitDefinitions[type as keyof typeof unitDefinitions];
  if (!typeUnits) return undefined;
  const unitConfig = typeUnits[unit as keyof typeof typeUnits];
  if (!unitConfig || !("factor" in unitConfig)) return undefined;
  return (unitConfig as { factor: number }).factor;
}
