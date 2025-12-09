import { convert } from "../converter-utils";

describe("Converter Utils", () => {
  describe("Volume conversions", () => {
    it("cups to oz", () => {
      const result = convert(2, "cups", "oz");
      expect(result.error).toBeNull();
      expect(result.result).toBeCloseTo(16, 1);
    });

    it("cups to ml", () => {
      const result = convert(1, "cups", "ml");
      expect(result.error).toBeNull();
      expect(result.result).toBeCloseTo(236.588, 1);
    });

    it("teaspoon to tablespoon", () => {
      const result = convert(3, "teaspoon", "tablespoon");
      expect(result.error).toBeNull();
      expect(result.result).toBeCloseTo(1, 1);
    });

    it("liters to cups", () => {
      const result = convert(1, "liter", "cup");
      expect(result.error).toBeNull();
      expect(result.result).toBeCloseTo(4.227, 1);
    });

    it("pints to cups", () => {
      const result = convert(2, "pints", "cups");
      expect(result.error).toBeNull();
      expect(result.result).toBeCloseTo(4, 1);
    });
  });

  describe("Weight conversions", () => {
    it("kilograms to pounds", () => {
      const result = convert(1, "kg", "lb");
      expect(result.error).toBeNull();
      expect(result.result).toBeCloseTo(2.20462, 1);
    });

    it("grams to ounces", () => {
      const result = convert(28.35, "g", "oz-weight");
      expect(result.error).toBeNull();
      expect(result.result).toBeCloseTo(1, 1);
    });

    it("pounds to grams", () => {
      const result = convert(1, "lb", "g");
      expect(result.error).toBeNull();
      expect(result.result).toBeCloseTo(453.592, 1);
    });

    it("milligrams to grams", () => {
      const result = convert(1000, "mg", "g");
      expect(result.error).toBeNull();
      expect(result.result).toBeCloseTo(1, 1);
    });
  });

  describe("Temperature conversions", () => {
    it("fahrenheit to celsius", () => {
      const result = convert(32, "fahrenheit", "celsius");
      expect(result.error).toBeNull();
      expect(result.result).toBeCloseTo(0, 1);
    });

    it("celsius to fahrenheit", () => {
      const result = convert(0, "celsius", "fahrenheit");
      expect(result.error).toBeNull();
      expect(result.result).toBeCloseTo(32, 1);
    });

    it("celsius to kelvin", () => {
      const result = convert(0, "celsius", "kelvin");
      expect(result.error).toBeNull();
      expect(result.result).toBeCloseTo(273.15, 1);
    });

    it("fahrenheit to kelvin", () => {
      const result = convert(32, "fahrenheit", "kelvin");
      expect(result.error).toBeNull();
      expect(result.result).toBeCloseTo(273.15, 1);
    });

    it("kelvin to celsius", () => {
      const result = convert(273.15, "kelvin", "celsius");
      expect(result.error).toBeNull();
      expect(result.result).toBeCloseTo(0, 1);
    });
  });

  describe("Length conversions", () => {
    it("meters to feet", () => {
      const result = convert(1, "meter", "foot");
      expect(result.error).toBeNull();
      expect(result.result).toBeCloseTo(3.28084, 1);
    });

    it("kilometers to miles", () => {
      const result = convert(1, "kilometer", "mile");
      expect(result.error).toBeNull();
      expect(result.result).toBeCloseTo(0.621371, 2);
    });

    it("inches to centimeters", () => {
      const result = convert(1, "inch", "centimeter");
      expect(result.error).toBeNull();
      expect(result.result).toBeCloseTo(2.54, 1);
    });

    it("yards to meters", () => {
      const result = convert(1, "yard", "meter");
      expect(result.error).toBeNull();
      expect(result.result).toBeCloseTo(0.9144, 2);
    });
  });

  describe("Area conversions", () => {
    it("square meters to square feet", () => {
      const result = convert(1, "square meter", "square foot");
      expect(result.error).toBeNull();
      expect(result.result).toBeCloseTo(10.764, 1);
    });

    it("square kilometers to square miles", () => {
      const result = convert(1, "square kilometer", "square mile");
      expect(result.error).toBeNull();
      expect(result.result).toBeCloseTo(0.386102, 2);
    });

    it("hectares to acres", () => {
      const result = convert(1, "hectare", "acre");
      expect(result.error).toBeNull();
      expect(result.result).toBeCloseTo(2.47105, 1);
    });
  });

  describe("Speed conversions", () => {
    it("kilometers per hour to miles per hour", () => {
      const result = convert(1, "kilometer per hour", "mile per hour");
      expect(result.error).toBeNull();
      expect(result.result).toBeCloseTo(0.621371, 2);
    });

    it("meters per second to kilometers per hour", () => {
      const result = convert(1, "meter per second", "kilometer per hour");
      expect(result.error).toBeNull();
      expect(result.result).toBeCloseTo(3.6, 1);
    });
  });

  describe("Density-based conversions (weight to volume)", () => {
    it("grams to cups (all-purpose flour)", () => {
      const result = convert(120, "g", "cup", "all-purpose flour");
      expect(result.error).toBeNull();
      expect(result.result).toBeCloseTo(1, 1);
    });

    it("grams to cups (default density)", () => {
      const result = convert(236.588, "g", "cup");
      expect(result.error).toBeNull();
      expect(result.result).toBeCloseTo(1, 1);
    });

    it("grams to oz (all-purpose flour)", () => {
      const result = convert(120, "g", "oz", "all-purpose flour");
      expect(result.error).toBeNull();
      expect(result.result).toBeCloseTo(8, 0);
    });

    it("pounds to cups (all-purpose flour)", () => {
      const result = convert(1, "lb", "cup", "all-purpose flour");
      expect(result.error).toBeNull();
      expect(result.result).toBeCloseTo(3.78, 1);
    });
  });

  describe("Density-based conversions (volume to weight)", () => {
    it("cups to grams (all-purpose flour)", () => {
      const result = convert(1, "cup", "g", "all-purpose flour");
      expect(result.error).toBeNull();
      expect(result.result).toBeCloseTo(120, 1);
    });

    it("tablespoon to grams (butter)", () => {
      // 1 tbsp = 14.787 ml, butter density = 226g/cup = 226g/236.588ml = 0.955 g/ml
      // 14.787 ml * 0.955 g/ml ≈ 14.1g
      const result = convert(1, "tablespoon", "g", "butter");
      expect(result.error).toBeNull();
      expect(result.result).toBeCloseTo(14.1, 1);
    });

    it("cups to ounces (all-purpose flour)", () => {
      // 1 cup flour = 120g, 120g / 28.3495 g/oz = ~4.23 oz
      const result = convert(1, "cup", "oz-weight", "all-purpose flour");
      expect(result.error).toBeNull();
      expect(result.result).toBeCloseTo(4.23, 1);
    });
  });

  describe("Ambiguous unit resolution (handled via autocomplete)", () => {
    it("floz (explicitly selected) to cup", () => {
      const result = convert(8, "floz", "cup");
      expect(result.error).toBeNull();
      expect(result.result).toBeCloseTo(1, 0); // 8 fl oz = ~1 cup
    });

    it("oz-weight as weight unit with lb", () => {
      const result = convert(1, "lb", "oz-weight");
      expect(result.error).toBeNull();
      expect(result.result).toBeCloseTo(16, 1);
    });

    it("cup (explicitly selected) to floz", () => {
      const result = convert(2, "cup", "floz");
      expect(result.error).toBeNull();
      expect(result.result).toBeCloseTo(16, 1);
    });
  });

  describe("Incompatible conversions", () => {
    it("weight to volume without ingredient should use default density", () => {
      const result = convert(100, "g", "cup");
      expect(result.error).toBeNull();
      expect(result.result).toBeGreaterThan(0);
    });

    it("temperature to volume fails", () => {
      const result = convert(32, "fahrenheit", "cups");
      expect(result.error).not.toBeNull();
    });

    it("weight to temperature fails", () => {
      const result = convert(100, "g", "celsius");
      expect(result.error).not.toBeNull();
    });

    it("length to volume fails", () => {
      const result = convert(10, "meter", "liter");
      expect(result.error).not.toBeNull();
    });
  });

  describe("Unit aliases", () => {
    it("tbsp is recognized as tablespoon", () => {
      const result = convert(4, "tbsp", "tsp");
      expect(result.error).toBeNull();
      expect(result.result).toBeCloseTo(12, 1);
    });

    it("tsp is recognized as teaspoon", () => {
      const result = convert(3, "tsp", "tbsp");
      expect(result.error).toBeNull();
      expect(result.result).toBeCloseTo(1, 1);
    });

    it("lbs is recognized as pounds", () => {
      const result = convert(2, "lbs", "kg");
      expect(result.error).toBeNull();
      expect(result.result).toBeCloseTo(0.907185, 2);
    });

    it("floz is recognized as fluid ounces", () => {
      const result = convert(8, "floz", "cup");
      expect(result.error).toBeNull();
      expect(result.result).toBeCloseTo(1, 0); // 8 fl oz = ~1 cup
    });

    it("ml is recognized as milliliter", () => {
      const result = convert(1000, "ml", "liter");
      expect(result.error).toBeNull();
      expect(result.result).toBeCloseTo(1, 1);
    });

    it("km is recognized as kilometer", () => {
      const result = convert(1, "km", "meter");
      expect(result.error).toBeNull();
      expect(result.result).toBeCloseTo(1000, 1);
    });
  });

  describe("Edge cases", () => {
    it("zero value converts to zero", () => {
      const result = convert(0, "cup", "oz");
      expect(result.error).toBeNull();
      expect(result.result).toBeCloseTo(0, 1);
    });

    it("same unit conversion", () => {
      const result = convert(5, "cup", "cup");
      expect(result.error).toBeNull();
      expect(result.result).toBeCloseTo(5, 1);
    });

    it("very small values", () => {
      const result = convert(0.001, "liter", "ml");
      expect(result.error).toBeNull();
      expect(result.result).toBeCloseTo(1, 1);
    });

    it("very large values", () => {
      const result = convert(1000000, "mg", "kg");
      expect(result.error).toBeNull();
      expect(result.result).toBeCloseTo(1, 1);
    });
  });

  describe("Ingredient density variations", () => {
    it("sugar has different density than flour", () => {
      const flourResult = convert(100, "g", "cup", "all-purpose flour");
      const sugarResult = convert(100, "g", "cup", "sugar");
      
      expect(flourResult.error).toBeNull();
      expect(sugarResult.error).toBeNull();
      
      expect(sugarResult.result).toBeLessThan(flourResult.result);
    });

    it("water uses default density when no ingredient specified", () => {
      const result = convert(236.588, "g", "cup");
      expect(result.error).toBeNull();
      expect(result.result).toBeCloseTo(1, 1);
    });

    it("butter has known density", () => {
      const result = convert(1, "cup", "g", "butter");
      expect(result.error).toBeNull();
      expect(result.result).toBeCloseTo(226, 1); // Butter = 226g per cup
    });
  });
});

