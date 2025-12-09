"use client";

import React, { useState, useRef, useEffect } from "react";
import { getAutocompleteSuggestions, type AutocompleteOption } from "@/lib/fuzzy-match";
import { AutocompleteModal } from "./autocomplete-modal";
import { X } from "lucide-react";

const getSuggestionLabel = (suggestion: string | AutocompleteOption): string => {
  return typeof suggestion === "string" ? suggestion : suggestion.label;
};

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
        // Close the modal when tabbing away (only if we have a handler)
        if (onTabPressed) {
          setIsModalOpen(false);
          e.preventDefault();
          setTimeout(() => {
            onTabPressed();
          }, 0);
        }
        return;
      }

      // For desktop, handle arrow navigation in the dropdown
      if (!isMobile && isModalOpen && suggestions.length > 0) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setHighlightedIndex((prev) =>
            Math.min(prev + 1, suggestions.length - 1)
          );
          return;
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          setHighlightedIndex((prev) => Math.max(prev - 1, 0));
          return;
        }
        if (e.key === "Enter") {
          e.preventDefault();
          handleSuggestionClick(suggestions[highlightedIndex]);
          return;
        }
        if (e.key === "Escape") {
          e.preventDefault();
          setIsModalOpen(false);
          return;
        }
      }

      // Open modal on ArrowDown (only if not already open and mobile)
      if (e.key === "ArrowDown" && !isModalOpen) {
        e.preventDefault();
        setIsModalOpen(true);
      }
    };

    // Handle input focus
    const handleFocus = () => {
      // Open dropdown/modal on focus (both mobile and desktop)
      if (value.length > 0 || options.length > 0) {
        setIsModalOpen(true);
      }
    };

    // Handle blur - close dropdown (desktop only, not mobile)
    const handleBlur = () => {
      // Only close dropdown on desktop; mobile modal handles its own closing
      if (!isMobile) {
        setTimeout(() => {
          setIsModalOpen(false);
        }, 50);
      }
      onBlur?.();
    };

    const handleSuggestionClick = (suggestion: string | AutocompleteOption) => {
      // Use label if it's an AutocompleteOption, otherwise use the string
      const selectedValue = typeof suggestion === "string" ? suggestion : suggestion.label;
      onChange(selectedValue);
      
      // Close dropdown immediately
      setIsModalOpen(false);
      
      // Then move focus to next field after a brief delay to ensure state updates
      if (onTabPressed) {
        setTimeout(() => {
          onTabPressed();
        }, 50);
      } else {
        setTimeout(() => {
          inputRef.current?.blur();
        }, 50);
      }
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
              onBlur={(e) => {
                // Stop event propagation when modal is open on mobile to prevent premature closing
                if (isMobile && isModalOpen) {
                  e.preventDefault();
                }
                handleBlur();
              }}
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

            {/* Desktop inline dropdown */}
            {!isMobile && isModalOpen && suggestions.length > 0 && (
              <div className="absolute top-full left-0 w-full mt-1 bg-background border border-border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                {suggestions.map((suggestion, index) => {
                  const label = getSuggestionLabel(suggestion);
                  return (
                    <button
                      key={label}
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleSuggestionClick(suggestion);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm border-b border-border last:border-b-0 transition-colors ${
                        index === highlightedIndex
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent"
                      }`}
                      tabIndex={-1}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            )}
            </div>
        </div>

        {/* Modal for autocomplete - only on mobile */}
        {isMobile && (
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
        )}
      </>
    );
  }
);

Autocomplete.displayName = "Autocomplete";

