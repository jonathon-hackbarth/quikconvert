import { unitDefinitions } from "@/constants/converters";
import { ingredientDensities } from "@/constants/ingredients";

let cachedUnitOptions: string[] | null = null;
let cachedIngredientOptions: string[] | null = null;

/**
 * Get all available unit options for autocomplete
 */
export function getUnitOptions(): string[] {
  if (cachedUnitOptions) return cachedUnitOptions;

  const units = new Set<string>();

  // Add canonical units and their aliases
  for (const [type, unitConfigs] of Object.entries(unitDefinitions)) {
    for (const [unit, config] of Object.entries(unitConfigs)) {
      units.add(unit);
      if ("aliases" in config && Array.isArray(config.aliases)) {
        for (const alias of config.aliases) {
          units.add(alias);
        }
      }
    }
  }

  cachedUnitOptions = Array.from(units).sort();
  return cachedUnitOptions;
}

/**
 * Get all available ingredient options for autocomplete
 */
export function getIngredientOptions(): string[] {
  if (cachedIngredientOptions) return cachedIngredientOptions;

  cachedIngredientOptions = Object.keys(ingredientDensities).sort();
  return cachedIngredientOptions;
}

/**
 * Clear caches (useful for testing)
 */
export function clearOptionsCaches(): void {
  cachedUnitOptions = null;
  cachedIngredientOptions = null;
}

