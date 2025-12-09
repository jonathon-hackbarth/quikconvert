// Ingredient density database (grams per cup)
// Based on reference data from https://getfillet.com/be/resources/reference-ingredients-density

export const ingredientDensities: Record<string, number> = {
  // Default/common
  water: 227,

  // Flours
  "all-purpose flour": 120,
  "all purpose flour": 120,
  "bread flour": 120,
  "cake flour": 120,
  "gluten-free all-purpose flour": 156,
  "gluten free all purpose flour": 156,
  "whole wheat flour": 113,
  "almond flour": 96,
  "coconut flour": 128,
  "oat flour": 92,

  // Sugars and sweeteners
  "white sugar": 198,
  "granulated sugar": 198,
  "brown sugar": 213,
  "powdered sugar": 113.5,
  "confectioners sugar": 113.5,
  sugar: 198, // Default to granulated sugar
  honey: 21, // per tablespoon
  maple: 156, // per 1/2 cup

  // Liquids
  milk: 227,
  buttermilk: 227,
  yogurt: 227,
  "sour cream": 227,
  oil: 198,
  "vegetable oil": 198,
  "olive oil": 50, // per 1/4 cup

  // Butter and fats
  butter: 226, // per cup (113g per 1/2 cup)
  ghee: 176, // per cup (44g per 1/4 cup)
  lard: 226, // per cup (113g per 1/2 cup)

  // Nuts and seeds
  almonds: 142,
  "almond butter": 68, // per 1/4 cup
  cashews: 113,
  walnuts: 113,
  pecans: 113,
  hazelnuts: 142,
  peanuts: 142,
  "peanut butter": 135, // per 1/2 cup
  sesame: 71, // per 1/2 cup
  "chia seeds": 37, // per 1/4 cup
  "sunflower seeds": 35, // per 1/4 cup

  // Grains and cereals
  oats: 89,
  "rolled oats": 89,
  quinoa: 177,
  barley: 215, // cooked
  "brown rice": 170, // cooked
  bulgur: 152,
  millet: 103, // per 1/2 cup
  polenta: 163,

  // Fruits and vegetables
  apple: 113, // per 1 cup, peeled and sliced
  banana: 227, // per 1 cup, mashed
  blueberries: 180, // fresh
  strawberries: 167,
  raspberries: 120,
  pineapple: 170,
  peach: 170,
  carrot: 142,
  "bell pepper": 142,
  onion: 142,
  celery: 142,
  spinach: 142,
  broccoli: 142,
  cauliflower: 142,

  // Dairy and cheese
  "cream cheese": 227,
  ricotta: 227,
  mascarpone: 227,
  cheddar: 113, // grated
  parmesan: 50, // grated, per 1/2 cup
  feta: 57, // per 1/2 cup
  mozzarella: 113,

  // Baking ingredients
  "baking powder": 4, // per teaspoon
  "baking soda": 3, // per 1/2 teaspoon
  salt: 18, // per tablespoon
  cocoa: 42, // per 1/2 cup
  "chocolate chips": 170,

  // Common cooking ingredients
  tomato: 180,
  garlic: 149, // peeled and sliced, per 1 cup
  ginger: 57, // per 1/4 cup
  lemon: 227, // per 1 cup juice
  lime: 227, // per 1 cup juice

  // Prepared/packaged
  applesauce: 255,
  "pumpkin puree": 227,
  "peanut butter": 135, // per 1/2 cup
};

// Get ingredient density (grams per cup)
// Defaults to water density if not found
export function getIngredientDensity(ingredient: string): number {
  if (!ingredient) return ingredientDensities.water;
  const normalized = ingredient.toLowerCase().trim();
  return ingredientDensities[normalized] ?? ingredientDensities.water;
}

