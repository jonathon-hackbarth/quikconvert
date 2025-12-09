"use client";

import React, { useState, useRef, useEffect } from "react";
import { getAutocompleteSuggestions, type AutocompleteOption } from "@/lib/fuzzy-match";
import { AutocompleteModal } from "./autocomplete-modal";
import { X } from "lucide-react";

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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [suggestions, setSuggestions] = useState<(string | AutocompleteOption)[]>([]);
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Detect mobile screen size
    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 1024);
      };
      
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Update suggestions when value changes
    useEffect(() => {
      if (value.length > 0) {
        const newSuggestions = getAutocompleteSuggestions(value, options, 8);
        setSuggestions(newSuggestions);
        setHighlightedIndex(0);
      } else {
        setSuggestions([]);
      }
    }, [value, options]);


    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Handle Tab key - move to next input
      if (e.key === "Tab" && !e.shiftKey) {
        // Call the tab pressed callback to move to next input
        if (onTabPressed) {
          setTimeout(() => {
            onTabPressed();
          }, 0);
        }
        return;
      }

      // Open modal on ArrowDown (only if not already open)
      if (e.key === "ArrowDown" && !isModalOpen) {
        e.preventDefault();
        setIsModalOpen(true);
      }
    };

    // Handle input focus
    const handleFocus = () => {
      // Open modal on focus for better mobile UX
      if (value.length > 0 || options.length > 0) {
        setIsModalOpen(true);
      }
    };

    // Handle blur
    const handleBlur = () => {
      onBlur?.();
    };

    const handleSuggestionClick = (suggestion: string | AutocompleteOption) => {
      // Use label if it's an AutocompleteOption, otherwise use the string
      const selectedValue = typeof suggestion === "string" ? suggestion : suggestion.label;
      onChange(selectedValue);
      setIsModalOpen(false);
      inputRef.current?.blur();
    };

    return (
      <>
        <div ref={containerRef} className="relative w-full lg:w-full">
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
          </div>
        </div>

        {/* Modal/Dropdown for suggestions */}
        <AutocompleteModal
          isOpen={isModalOpen}
          value={value}
          onChange={onChange}
          onClose={() => setIsModalOpen(false)}
          suggestions={suggestions}
          highlightedIndex={highlightedIndex}
          onHighlightedIndexChange={setHighlightedIndex}
          onSuggestionSelect={handleSuggestionClick}
          placeholder={placeholder}
          label={label}
          isMobile={isMobile}
        />
      </>
    );
  }
);

Autocomplete.displayName = "Autocomplete";

