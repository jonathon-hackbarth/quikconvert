// Ingredient density database (grams per cup)
// Based on reference data from https://getfillet.com/be/resources/reference-ingredients-density
// and King Arthur Baking ingredient weight chart

export const ingredientDensities: Record<string, number> = {
  // Default/common
  water: 227,

  // Flours
  "all-purpose flour": 120,
  "bread flour": 120,
  "cake flour": 120,
  "gluten-free all-purpose flour": 156,
  "whole wheat flour": 113,
  "almond flour": 96,
  "coconut flour": 128,
  "oat flour": 92,
  "rye flour": 102,
  "cornmeal": 138,
  "cornstarch": 128,
  "potato starch": 160,
  "tapioca starch": 150,
  "arrowroot powder": 90,

  // Sugars and sweeteners
  "granulated sugar": 198,
  "brown sugar": 213,
  "powdered sugar": 113.5,
  sugar: 198, // Default to granulated sugar
  honey: 340, // per cup (heavier than listed in old data)
  "maple syrup": 280,
  "agave nectar": 300,
  "molasses": 330,
  "light corn syrup": 240,
  "dark corn syrup": 240,

  // Liquids
  milk: 227,
  buttermilk: 227,
  yogurt: 227,
  "sour cream": 227,
  "greek yogurt": 227,
  "cream": 227,
  "heavy cream": 227,
  "half and half": 227,
  oil: 198,
  "vegetable oil": 198,
  "olive oil": 198,
  "coconut oil": 198,
  "canola oil": 198,
  "sesame oil": 198,
  "peanut oil": 198,
  vinegar: 227,
  "apple cider vinegar": 227,
  "balsamic vinegar": 227,
  "rice vinegar": 227,
  "white vinegar": 227,

  // Butter and fats
  butter: 226,
  ghee: 176,
  lard: 226,
  "shortening": 191,

  // Nuts and seeds
  almonds: 142,
  "almond butter": 135,
  "peanut butter": 135,
  "tahini": 150,
  "sunflower butter": 140,
  cashews: 113,
  walnuts: 113,
  pecans: 113,
  hazelnuts: 142,
  "macadamia nuts": 150,
  peanuts: 142,
  "pistachio": 142,
  "chia seeds": 150,
  "flax seeds": 140,
  "pumpkin seeds": 125,
  "sunflower seeds": 140,
  "sesame seeds": 150,
  "hemp seeds": 140,

  // Grains and cereals
  oats: 89,
  quinoa: 177,
  barley: 215,
  "brown rice": 170,
  "white rice": 185,
  "wild rice": 155,
  bulgur: 152,
  millet: 103,
  polenta: 163,
  "couscous": 150,
  "pearl couscous": 160,

  // Fruits (fresh, chopped/sliced)
  apple: 113,
  apricot: 150,
  banana: 100, // mashed varies, using standard
  blueberries: 180,
  strawberries: 167,
  raspberries: 120,
  blackberries: 150,
  pineapple: 170,
  peach: 170,
  plum: 150,
  orange: 150,
  lemon: 150,
  lime: 150,
  cranberry: 100,
  "dried cranberries": 160,
  "raisins": 150,
  "dried apricots": 150,
  "dried dates": 180,
  "dried figs": 150,
  "dried cherries": 150,

  // Vegetables
  carrot: 142,
  "bell pepper": 142,
  onion: 142,
  "red onion": 142,
  celery: 142,
  spinach: 142,
  "fresh spinach": 142,
  broccoli: 142,
  cauliflower: 142,
  "green beans": 142,
  "zucchini": 142,
  cucumber: 142,
  tomato: 180,
  "tomato paste": 230,
  garlic: 149,
  ginger: 57,
  "jalapeño": 142,
  "sweet potato": 142,
  potato: 150,
  "mushroom": 150,
  "cabbage": 142,
  "kale": 100,
  "arugula": 30,

  // Dairy and cheese
  "cream cheese": 227,
  "ricotta": 227,
  "mascarpone": 227,
  "cheddar": 113,
  "parmesan": 100,
  "feta": 150,
  "mozzarella": 113,
  "gouda": 113,
  "swiss cheese": 113,
  "brie": 113,
  "cottage cheese": 227,

  // Baking ingredients
  "baking powder": 4,
  "baking soda": 3,
  "instant yeast": 7,
  "active dry yeast": 7,
  salt: 18,
  "sea salt": 18,
  cocoa: 42,
  "cocoa powder": 85,
  "chocolate chips": 170,
  "dark chocolate chips": 170,
  "white chocolate chips": 170,
  "egg": 50, // 1 large egg
  "egg white": 30,
  "egg yolk": 20,

  // Common cooking ingredients
  "soy sauce": 240,
  "worcestershire sauce": 240,
  "hot sauce": 240,
  "ketchup": 240,
  "mustard": 240,
  "mayonnaise": 227,
  "pesto": 227,

  // Prepared/packaged
  applesauce: 255,
  "pumpkin puree": 227,
  "canned beans": 227,
  "canned tomatoes": 240,
  "coconut milk": 227,
  "almond milk": 227,
  "oat milk": 227,

  // Meats (ground/minced, raw)
  "ground beef": 240,
  "ground chicken": 220,
  "ground turkey": 225,
  "ground lamb": 240,
  "ground pork": 235,
  "ground veal": 220,
  "ground sausage": 240,
  "italian sausage": 240,

  // Meats (cooked)
  "cooked ground beef": 260,
  "cooked ground chicken": 250,
  "cooked ground turkey": 255,
  "cooked ground lamb": 270,
  "cooked ground pork": 260,

  // Meats (whole cuts, raw - approximate per cup when chunked)
  "beef chunks": 250,
  "chicken breast": 240,
  "turkey breast": 240,
  "lamb chunks": 250,
  "pork chunks": 245,

  // Meats (cooked whole cuts)
  "cooked beef chunks": 280,
  "cooked chicken": 280,
  "cooked turkey": 280,
  "cooked lamb": 300,
  "cooked pork": 280,

  // Seafood
  "ground fish": 220,
  "salmon": 230,
  "tuna": 240,
  "cod": 220,
  "shrimp": 220,
  "crab": 220,
};

// Get ingredient density (grams per cup)
// Defaults to water density if not found
export function getIngredientDensity(ingredient?: string): number {
  if (!ingredient) return ingredientDensities.water;
  const normalized = ingredient.toLowerCase().trim();
  return ingredientDensities[normalized] ?? ingredientDensities.water;
}

