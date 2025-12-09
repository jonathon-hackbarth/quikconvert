"use client";

import { useState, useCallback, useMemo, useRef } from "react";
import { parseAmount } from "@/lib/parse-amount";
import { convert, type ConversionResult, resolveUnit } from "@/lib/converter-utils";
import { Autocomplete } from "@/components/ui/autocomplete";
import { getUnitOptions, getIngredientOptions } from "@/lib/get-options";
import { formatAmount } from "@/lib/format-fraction";
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

  // Determine if ingredient input should be shown (only for weight <-> volume conversions)
  const showIngredientInput = useMemo(() => {
    if (!fromUnitInput || !toUnitInput) {
      return false;
    }

    const fromResolved = resolveUnit(fromUnitInput);
    const toResolved = resolveUnit(toUnitInput);

    if (!fromResolved || !toResolved) {
      return false;
    }

    // Show ingredient input only for weight <-> volume conversions
    const isWeightVolumeConversion =
      (fromResolved.type === "weight" && toResolved.type === "volume") ||
      (fromResolved.type === "volume" && toResolved.type === "weight");

    return isWeightVolumeConversion;
  }, [fromUnitInput, toUnitInput]);

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

  const handleAmountKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      // On Enter key, move focus to the next input field (fromUnit)
      if (e.key === "Enter") {
        e.preventDefault();
        fromUnitInputRef.current?.focus();
      }
    },
    []
  );

  const handleFromUnitChange = useCallback((value: string) => {
    setFromUnitInput(value.toLowerCase());
  }, []);

  const handleToUnitChange = useCallback((value: string) => {
    setToUnitInput(value.toLowerCase());
  }, []);

  const handleIngredientChange = useCallback((value: string) => {
    setIngredientInput(value.toLowerCase());
  }, []);

  // Format result for display
  const displayResult = useMemo(() => {
    if (!conversionResult) return null;

    const result = conversionResult as ConversionResult;

    if (result.error) {
      return {
        main: null as string | null,
        subtitle: null as string | null,
        error: result.error,
        usesDefaultDensity: result.usesDefaultDensity,
      };
    }

    // Format number based on unit system (metric vs imperial)
    const num = result.result ?? 0;
    const formatted = formatAmount(num, toUnitInput);

    return {
      main: formatted.main,
      subtitle: formatted.subtitle || null,
      error: null as string | null,
      usesDefaultDensity: result.usesDefaultDensity,
    };
  }, [conversionResult, toUnitInput]);

  const unitOptions = getUnitOptions();
  const ingredientOptions = getIngredientOptions();

  return (
    <div className="w-full flex flex-col-reverse lg:grid lg:grid-cols-2 lg:gap-8 lg:gap-12">
      {/* Inputs Column */}
      <div className="space-y-6 px-4 lg:px-8 lg:px-0">
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
              onKeyDown={handleAmountKeyDown}
              placeholder="e.g., 1.5 or 1 1/2"
              className="w-full px-4 py-3 pr-12 text-lg border-2 border-muted-foreground/25 rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              tabIndex={1}
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
          onTabPressed={() => {
            // If all fields are filled, close and show result (editing mode)
            // Otherwise, move to next field
            if (amount && toUnitInput && (showIngredientInput ? ingredientInput : true)) {
              fromUnitInputRef.current?.blur();
            } else {
              toUnitInputRef.current?.focus();
            }
          }}
          options={unitOptions}
          placeholder="e.g., cups, lbs, teaspoon"
          label="What kind of measurement is it?"
          id="from-unit-input"
          tabIndex={2}
        />

        {/* To Unit Input with Autocomplete */}
        <Autocomplete
          ref={toUnitInputRef}
          value={toUnitInput}
          onChange={handleToUnitChange}
          onTabPressed={() => {
            // If ingredient input is needed, move to it; otherwise close if all filled
            if (showIngredientInput) {
              ingredientInputRef.current?.focus();
            } else if (amount && fromUnitInput) {
              // All required fields filled, close to show result
              toUnitInputRef.current?.blur();
            }
          }}
          options={unitOptions}
          placeholder="e.g., oz, grams, celsius, lb"
          label="What do you want to convert it to?"
          id="to-unit-input"
          tabIndex={3}
        />

        {/* Ingredient Input (Optional) with Autocomplete - Only shown for weight <-> volume conversions */}
        {showIngredientInput && (
          <Autocomplete
            ref={ingredientInputRef}
            value={ingredientInput}
            onChange={handleIngredientChange}
            options={ingredientOptions}
            placeholder="e.g., flour, sugar, water (for density)"
            label="What ingredient? (optional)"
            id="ingredient-input"
            tabIndex={4}
          />
        )}
      </div>

      {/* Result Display - Mobile Only */}
      {displayResult && (
        <div className="lg:hidden px-4 pb-4 lg:pb-0">
            {displayResult.error ? (
              <div className="text-destructive text-sm font-medium">
                {displayResult.error}
              </div>
            ) : (
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  {displayResult.main}
                </div>
                {displayResult.subtitle && (
                  <>
                    <div className="text-xs text-muted-foreground mb-3">
                      {displayResult.subtitle}
                    </div>
                    <div className="flex justify-center mb-3">
                      <div className="h-0.5 bg-muted-foreground/40 w-16"></div>
                    </div>
                  </>
                )}
                <div className="text-sm text-muted-foreground">
                  {amount} {fromUnitInput} = {displayResult.main} {toUnitInput}
                </div>
                {displayResult.usesDefaultDensity && (
                  <div className="mt-4 text-xs text-muted-foreground bg-muted/50 border-l-2 border-muted-foreground/50 pl-3 pr-3 py-2 rounded-sm">
                    <span className="font-medium">ℹ</span> Using standard water density (227g/cup)
                  </div>
                )}
              </div>
            )}
        </div>
      )}

      {/* Result Column - Desktop Only */}
      {displayResult && (
        <div className="hidden lg:flex flex-col justify-center items-center lg:px-0">
            {displayResult.error ? (
              <div className="text-destructive text-sm font-medium text-center px-4">
                {displayResult.error}
              </div>
            ) : (
              <div className="text-center">
                <div className="text-5xl lg:text-6xl font-bold text-primary mb-2">
                  {displayResult.main}
                </div>
                {displayResult.subtitle && (
                  <>
                    <div className="text-sm text-muted-foreground mb-4">
                      {displayResult.subtitle}
                    </div>
                    <div className="flex justify-center mb-4">
                      <div className="h-0.5 bg-muted-foreground/40 w-32"></div>
                    </div>
                  </>
                )}
                <div className="text-base text-muted-foreground mb-4">
                  {amount} {fromUnitInput}
                </div>
                <div className="text-2xl text-primary my-2">=</div>
                <div className="text-base text-muted-foreground">
                  {displayResult.main} {toUnitInput}
                </div>
                {displayResult.usesDefaultDensity && (
                  <div className="mt-6 text-sm text-muted-foreground bg-muted/50 border-l-2 border-muted-foreground/50 pl-4 pr-4 py-3 rounded-sm">
                    <span className="font-medium">ℹ</span> Using standard water density (227g/cup)
                  </div>
                )}
              </div>
            )}
        </div>
      )}
    </div>
  );
}
