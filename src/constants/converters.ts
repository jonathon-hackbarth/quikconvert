// Comprehensive unit conversion system with context-aware resolution

// Unit definitions by type with conversion factors (base units shown)
export const unitDefinitions = {
  volume: {
    // Base unit: ml
    tsp: { factor: 4.929, displayName: "teaspoons", aliases: ["teaspoon", "teaspoons"] },
    tbsp: { factor: 14.787, displayName: "tablespoons", aliases: ["tablespoon", "tablespoons"] },
    floz: { factor: 29.574, displayName: "fluid ounces", aliases: ["fl oz", "fl. oz.", "fluid ounce", "fluid ounces"] },
    cup: { factor: 236.588, displayName: "cups", aliases: ["cup", "cups", "c"] },
    pint: { factor: 473.176, displayName: "pints", aliases: ["pint", "pints", "pt"] },
    quart: { factor: 946.353, displayName: "quarts", aliases: ["quart", "quarts", "qt"] },
    gallon: { factor: 3785.41, displayName: "gallons", aliases: ["gallon", "gallons", "gal"] },
    ml: { factor: 1, displayName: "milliliters", aliases: ["milliliter", "milliliters", "ml"] },
    liter: { factor: 1000, displayName: "liters", aliases: ["liter", "liters", "l"] },
    stick: { factor: 118.294, displayName: "sticks", aliases: ["stick", "sticks"] },
  },
  weight: {
    // Base unit: g
    mg: { factor: 0.001, displayName: "milligrams", aliases: ["milligram", "milligrams", "mg"] },
    g: { factor: 1, displayName: "grams", aliases: ["gram", "grams", "g"] },
    kg: { factor: 1000, displayName: "kilograms", aliases: ["kilogram", "kilograms", "kg", "kilo"] },
    "oz-weight": { factor: 28.3495, displayName: "ounces", aliases: ["ounce", "ounces", "oz"] },
    lb: { factor: 453.592, displayName: "pounds", aliases: ["pound", "pounds", "lb", "lbs"] },
    ton: { factor: 1000000, displayName: "metric tons", aliases: ["ton", "tons", "tonne", "tonnes"] },
  },
  temperature: {
    // Special handling - no base unit
    f: { displayName: "fahrenheit", aliases: ["fahrenheit", "°f"] },
    c: { displayName: "celsius", aliases: ["celsius", "°c", "centigrade"] },
    k: { displayName: "kelvin", aliases: ["kelvin", "°k", "kelvins"] },
  },
  length: {
    // Base unit: cm
    mm: { factor: 0.1, displayName: "millimeters", aliases: ["millimeter", "millimeters", "mm"] },
    cm: { factor: 1, displayName: "centimeters", aliases: ["centimeter", "centimeters", "cm"] },
    m: { factor: 100, displayName: "meters", aliases: ["meter", "meters", "m"] },
    km: { factor: 100000, displayName: "kilometers", aliases: ["kilometer", "kilometers", "km"] },
    in: { factor: 2.54, displayName: "inches", aliases: ["inch", "inches", "in"] },
    ft: { factor: 30.48, displayName: "feet", aliases: ["foot", "feet", "ft"] },
    yd: { factor: 91.44, displayName: "yards", aliases: ["yard", "yards", "yd"] },
    mi: { factor: 160934, displayName: "miles", aliases: ["mile", "miles", "mi"] },
  },
  area: {
    // Base unit: sq meters
    "sq m": { factor: 1, displayName: "square meters", aliases: ["m²", "square meter", "square meters", "sq m"] },
    "sq cm": { factor: 0.0001, displayName: "square centimeters", aliases: ["cm²", "square centimeter", "square centimeters", "sq cm"] },
    "sq km": { factor: 1000000, displayName: "square kilometers", aliases: ["km²", "square kilometer", "square kilometers", "sq km"] },
    "sq in": { factor: 0.00064516, displayName: "square inches", aliases: ["in²", "square inch", "square inches", "sq in"] },
    "sq ft": { factor: 0.092903, displayName: "square feet", aliases: ["ft²", "square foot", "square feet", "sq ft"] },
    "sq yd": { factor: 0.836127, displayName: "square yards", aliases: ["yd²", "square yard", "square yards", "sq yd"] },
    acre: { factor: 4046.86, displayName: "acres", aliases: ["acre", "acres"] },
    "sq mi": { factor: 2589988, displayName: "square miles", aliases: ["mi²", "square mile", "square miles", "sq mi"] },
    hectare: { factor: 10000, displayName: "hectares", aliases: ["hectare", "hectares", "ha"] },
  },
  speed: {
    // Base unit: km/h
    "km/h": { factor: 1, displayName: "kilometers per hour", aliases: ["kmh", "kph", "kilometers per hour", "kilometer per hour", "km/h"] },
    mph: { factor: 1.60934, displayName: "miles per hour", aliases: ["mi/h", "miles per hour", "mile per hour", "mph"] },
    "m/s": { factor: 3.6, displayName: "meters per second", aliases: ["meters per second", "meter per second", "m/s"] },
    "ft/s": { factor: 1.09728, displayName: "feet per second", aliases: ["fps", "feet per second", "foot per second", "ft/s"] },
    knot: { factor: 1.852, displayName: "knots", aliases: ["knot", "knots", "kn"] },
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
