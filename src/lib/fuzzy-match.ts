/**
 * Autocomplete option with display name and aliases for matching
 */
export interface AutocompleteOption {
  label: string; // Display name shown to user
  value: string; // Value sent to converter (for backward compatibility)
  aliases?: string[]; // Alternative names for matching
}

/**
 * Fuzzy matching algorithm for autocomplete
 * Returns a score from 0 to 1, where 1 is a perfect match
 */
export function fuzzyScore(query: string, target: string): number {
  const q = query.toLowerCase().trim();
  const t = target.toLowerCase();

  if (q === t) return 1; // Perfect match
  if (q.length === 0) return 0.1; // Empty query gets lowest score
  if (t.length === 0) return 0; // Empty target can't match

  // Check if query is a prefix
  if (t.startsWith(q)) {
    return 0.9 + (1 - q.length / t.length) * 0.09; // 0.9 - 0.99
  }

  // Check if all characters of query are in target in order
  let queryIdx = 0;
  let targetIdx = 0;
  let matches = 0;
  let gaps = 0;
  let lastMatchIdx = -1;

  while (queryIdx < q.length && targetIdx < t.length) {
    if (q[queryIdx] === t[targetIdx]) {
      matches++;
      if (lastMatchIdx !== -1 && targetIdx - lastMatchIdx > 1) {
        gaps++;
      }
      lastMatchIdx = targetIdx;
      queryIdx++;
    }
    targetIdx++;
  }

  // If not all characters match, return 0
  if (queryIdx < q.length) return 0;

  // Score based on match quality
  // More matches and fewer gaps = higher score
  const matchScore = matches / q.length;
  const gapPenalty = gaps / t.length;
  const score = matchScore * (1 - gapPenalty * 0.3);

  return Math.max(0, Math.min(0.89, score)); // 0 - 0.89 for fuzzy matches
}

/**
 * Score an autocomplete option against a query
 * Checks both label and aliases, returns best score
 */
function scoreOption(query: string, option: AutocompleteOption | string): number {
  if (typeof option === "string") {
    return fuzzyScore(query, option);
  }

  // Score against label
  let bestScore = fuzzyScore(query, option.label);

  // Score against aliases if present
  if (option.aliases) {
    for (const alias of option.aliases) {
      const aliasScore = fuzzyScore(query, alias);
      if (aliasScore > bestScore) {
        bestScore = aliasScore;
      }
    }
  }

  return bestScore;
}

/**
 * Get sorted autocomplete suggestions
 * Supports both string and AutocompleteOption formats
 */
export function getAutocompleteSuggestions(
  query: string,
  options: (string | AutocompleteOption)[],
  limit: number = 8
): (string | AutocompleteOption)[] {
  if (query.length === 0) {
    // Return first N options alphanumerically sorted
    return options
      .sort((a, b) => {
        const labelA = typeof a === "string" ? a : a.label;
        const labelB = typeof b === "string" ? b : b.label;
        return labelA.localeCompare(labelB);
      })
      .slice(0, limit);
  }

  // Score all options
  const scored = options
    .map((option) => ({
      option,
      score: scoreOption(query, option),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => {
      // Sort by score descending, then alphanumeric ascending
      if (Math.abs(a.score - b.score) > 0.001) {
        return b.score - a.score;
      }
      const labelA = typeof a.option === "string" ? a.option : a.option.label;
      const labelB = typeof b.option === "string" ? b.option : b.option.label;
      return labelA.localeCompare(labelB);
    })
    .slice(0, limit);

  return scored.map((item) => item.option);
}

