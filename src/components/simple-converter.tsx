"use client";

import { useState, useCallback, useMemo, useRef } from "react";
import { parseAmount } from "@/lib/parse-amount";
import { convert } from "@/lib/converter-utils";
import { Autocomplete } from "@/components/ui/autocomplete";
import { getUnitOptions, getIngredientOptions } from "@/lib/get-options";
import { X } from "lucide-react";

export function SimpleConverter() {
  const [amount, setAmount] = useState("");
  const [fromUnitInput, setFromUnitInput] = useState("");
  const [toUnitInput, setToUnitInput] = useState("");
  const [ingredientInput, setIngredientInput] = useState("");

  // Refs for managing Tab navigation
  const fromUnitInputRef = useRef<HTMLInputElement>(null);
  const ingredientInputRef = useRef<HTMLInputElement>(null);
  const toUnitInputRef = useRef<HTMLInputElement>(null);

  // Perform conversion with both units together
  const conversionResult = useMemo(() => {
    if (!amount || !fromUnitInput || !toUnitInput) {
      return null;
    }

    const parsedAmount = parseAmount(amount);
    if (parsedAmount === null) {
      return {
        result: null,
        error: "Invalid amount - use decimals or fractions (e.g., 1.5, 1/2, 1 1/2)",
      };
    }

    return convert(parsedAmount, fromUnitInput, toUnitInput, ingredientInput || undefined);
  }, [amount, fromUnitInput, toUnitInput, ingredientInput]);

  const handleAmountChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setAmount(e.target.value);
    },
    []
  );

  const handleFromUnitChange = useCallback((value: string) => {
    setFromUnitInput(value);
  }, []);

  const handleToUnitChange = useCallback((value: string) => {
    setToUnitInput(value);
  }, []);

  const handleIngredientChange = useCallback((value: string) => {
    setIngredientInput(value);
  }, []);

  // Format result for display
  const displayResult = useMemo(() => {
    if (!conversionResult) return null;

    if (conversionResult.error) {
      return {
        value: null,
        error: conversionResult.error,
      };
    }

    // Format number nicely: remove trailing zeros and unnecessary decimal points
    const num = conversionResult.result;
    let formatted: string;

    if (Number.isInteger(num)) {
      formatted = num.toString();
    } else {
      // Format with up to 10 decimal places, removing trailing zeros
      formatted = parseFloat(num.toFixed(10)).toString();
    }

    return {
      value: formatted,
      error: null,
    };
  }, [conversionResult]);

  const unitOptions = getUnitOptions();
  const ingredientOptions = getIngredientOptions();

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 px-4 lg:px-8">
        {/* Inputs Column */}
        <div className="space-y-6">
        {/* Amount Input */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-foreground">
            How much do you have?
          </label>
          <div className="relative">
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              placeholder="e.g., 1.5 or 1 1/2"
              className="w-full px-4 py-3 pr-12 text-lg border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
            />
            {amount && (
              <button
                type="button"
                onClick={() => setAmount("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                aria-label="Clear amount"
                tabIndex={-1}
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* From Unit Input with Autocomplete */}
        <Autocomplete
          ref={fromUnitInputRef}
          value={fromUnitInput}
          onChange={handleFromUnitChange}
          onTabPressed={() => ingredientInputRef.current?.focus()}
          options={unitOptions}
          placeholder="e.g., cups, lbs, teaspoon"
          label="What kind of measurement is it?"
          id="from-unit-input"
        />

        {/* Ingredient Input (Optional) with Autocomplete */}
        <Autocomplete
          ref={ingredientInputRef}
          value={ingredientInput}
          onChange={handleIngredientChange}
          onTabPressed={() => toUnitInputRef.current?.focus()}
          options={ingredientOptions}
          placeholder="e.g., flour, sugar, water (for density)"
          label="What ingredient? (optional)"
          id="ingredient-input"
        />

        {/* To Unit Input with Autocomplete */}
        <Autocomplete
          ref={toUnitInputRef}
          value={toUnitInput}
          onChange={handleToUnitChange}
          options={unitOptions}
          placeholder="e.g., oz, grams, celsius, lb"
          label="What do you want to convert it to?"
          id="to-unit-input"
        />

        {/* Result Display - Mobile Only */}
        {displayResult && (
          <div className="lg:hidden pt-4 border-t border-border">
            {displayResult.error ? (
              <div className="text-destructive text-sm font-medium">
                {displayResult.error}
              </div>
            ) : (
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  {displayResult.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {amount} {fromUnitInput} = {displayResult.value} {toUnitInput}
                </div>
              </div>
            )}
          </div>
        )}
        </div>

        {/* Result Column - Desktop Only */}
        {displayResult && (
          <div className="hidden lg:flex flex-col justify-center items-center">
            {displayResult.error ? (
              <div className="text-destructive text-sm font-medium text-center px-4">
                {displayResult.error}
              </div>
            ) : (
              <div className="text-center">
                <div className="text-5xl lg:text-6xl font-bold text-primary mb-4">
                  {displayResult.value}
                </div>
                <div className="text-base text-muted-foreground">
                  {amount} {fromUnitInput}
                </div>
                <div className="text-2xl text-primary my-2">=</div>
                <div className="text-base text-muted-foreground">
                  {displayResult.value} {toUnitInput}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
