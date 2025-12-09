"use client";

import React, { useState, useRef, useEffect } from "react";
import { getAutocompleteSuggestions, type AutocompleteOption } from "@/lib/fuzzy-match";
import { ChevronDown, X } from "lucide-react";

interface AutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  onTabPressed?: () => void;
  options: (string | AutocompleteOption)[];
  placeholder?: string;
  label?: string;
  id?: string;
  tabIndex?: number;
}

export const Autocomplete = React.forwardRef<
  HTMLInputElement,
  AutocompleteProps
>(
  (
    {
      value,
      onChange,
      onBlur,
      onTabPressed,
      options,
      placeholder = "",
      label = "",
      id = "",
      tabIndex,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [suggestions, setSuggestions] = useState<(string | AutocompleteOption)[]>([]);
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const shouldAutoOpenRef = useRef(true);

    // Update suggestions when value changes
    useEffect(() => {
      if (value.length > 0) {
        const newSuggestions = getAutocompleteSuggestions(value, options, 8);
        setSuggestions(newSuggestions);
        setHighlightedIndex(0);
        if (shouldAutoOpenRef.current) {
          setIsOpen(true);
        }
      } else {
        setSuggestions([]);
        setIsOpen(false);
      }
    }, [value, options]);

    // Handle click outside
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Handle Tab key separately - should work regardless of dropdown state
      // Only handle Tab (not Shift+Tab which should go backward)
      if (e.key === "Tab" && !e.shiftKey) {
        if (isOpen && suggestions.length > 0) {
          e.preventDefault();
          handleSuggestionClick(suggestions[highlightedIndex]);
          setIsOpen(false);
        }
        // Call the tab pressed callback to move to next input
        if (onTabPressed) {
          setTimeout(() => {
            onTabPressed();
          }, 0);
        }
        return;
      }

      if (!isOpen || suggestions.length === 0) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setIsOpen(true);
        }
        return;
      }

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev < suggestions.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case "Enter":
          e.preventDefault();
          if (suggestions.length > 0) {
            handleSuggestionClick(suggestions[highlightedIndex]);
            setIsOpen(false);
          }
          break;
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          break;
      }
    };

    // Handle input focus
    const handleFocus = () => {
      if (value.length > 0) {
        setIsOpen(true);
      }
    };

    // Handle blur
    const handleBlur = () => {
      setIsOpen(false);
      onBlur?.();
    };

    const handleSuggestionClick = (suggestion: string | AutocompleteOption) => {
      // Use label if it's an AutocompleteOption, otherwise use the string
      const value = typeof suggestion === "string" ? suggestion : suggestion.label;
      shouldAutoOpenRef.current = false;
      onChange(value);
      setIsOpen(false);
      inputRef.current?.blur();
      // Re-enable auto-open after a tick to allow blur to complete
      setTimeout(() => {
        shouldAutoOpenRef.current = true;
      }, 0);
    };

    // Helper to get display label for a suggestion
    const getSuggestionLabel = (suggestion: string | AutocompleteOption): string => {
      return typeof suggestion === "string" ? suggestion : suggestion.label;
    };

    return (
      <div ref={containerRef} className="relative w-full">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-foreground mb-2"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={(el) => {
              if (typeof ref === "function") {
                ref(el);
              } else if (ref) {
                ref.current = el;
              }
              inputRef.current = el;
            }}
            id={id}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            className="w-full px-4 py-3 pr-12 rounded-lg border-2 border-muted-foreground/25 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
            autoComplete="off"
            tabIndex={tabIndex}
          />
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
              aria-label="Clear input"
              tabIndex={-1}
            >
              <X className="h-5 w-5" />
            </button>
          )}
          {!value && isOpen && suggestions.length > 0 && (
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
          )}
        </div>

        {isOpen && suggestions.length > 0 && (
          <div className="absolute z-50 w-full mt-2 bg-background border border-input rounded-lg shadow-lg overflow-hidden">
            {suggestions.map((suggestion, index) => {
              const label = getSuggestionLabel(suggestion);
              return (
                <button
                  key={label}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`w-full text-left px-4 py-3 hover:bg-accent transition-colors ${
                    index === highlightedIndex
                      ? "bg-primary text-primary-foreground"
                      : ""
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);

Autocomplete.displayName = "Autocomplete";

