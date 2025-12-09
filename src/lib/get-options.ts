import { unitDefinitions } from "@/constants/converters";
import { ingredientDensities } from "@/constants/ingredients";
import { type AutocompleteOption } from "@/lib/fuzzy-match";

let cachedUnitOptions: AutocompleteOption[] | null = null;
let cachedIngredientOptions: AutocompleteOption[] | null = null;

/**
 * Get all available unit options for autocomplete
 * Returns deduplicated options with display names and aliases for matching
 */
export function getUnitOptions(): AutocompleteOption[] {
  if (cachedUnitOptions) return cachedUnitOptions;

  const unitMap = new Map<string, AutocompleteOption>();

  // Process each unit type
  for (const [, unitConfigs] of Object.entries(unitDefinitions)) {
    for (const [unit, config] of Object.entries(unitConfigs)) {
      // Use displayName if available, otherwise use the unit key
      const displayName =
        "displayName" in config && config.displayName
          ? config.displayName
          : unit;

      // Get aliases
      const aliases =
        "aliases" in config && Array.isArray(config.aliases)
          ? config.aliases.filter(
              (alias) => alias.toLowerCase() !== displayName.toLowerCase()
            )
          : [];

      // Create option (use displayName as the key to avoid duplicates)
      const key = displayName.toLowerCase();
      if (!unitMap.has(key)) {
        unitMap.set(key, {
          label: displayName.toLowerCase(), // Display in lowercase for consistency
          value: unit, // Store the canonical unit for conversion
          aliases: aliases.length > 0 ? aliases : undefined,
        });
      }
    }
  }

  // Convert to sorted array
  cachedUnitOptions = Array.from(unitMap.values()).sort((a, b) =>
    a.label.localeCompare(b.label)
  );
  return cachedUnitOptions;
}

/**
 * Get all available ingredient options for autocomplete
 * Returns options with ingredient names (all lowercase for consistency)
 */
export function getIngredientOptions(): AutocompleteOption[] {
  if (cachedIngredientOptions) return cachedIngredientOptions;

  const ingredients = Object.keys(ingredientDensities)
    .map((name) => ({
      label: name, // Keep lowercase for consistency
      value: name, // Store lowercase name for density lookup
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  cachedIngredientOptions = ingredients;
  return cachedIngredientOptions;
}

/**
 * Clear caches (useful for testing)
 */
export function clearOptionsCaches(): void {
  cachedUnitOptions = null;
  cachedIngredientOptions = null;
}

