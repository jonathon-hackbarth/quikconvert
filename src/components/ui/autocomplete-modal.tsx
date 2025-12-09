"use client";

import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { type AutocompleteOption } from "@/lib/fuzzy-match";

interface AutocompleteModalProps {
  isOpen: boolean;
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
  suggestions: (string | AutocompleteOption)[];
  highlightedIndex: number;
  onHighlightedIndexChange: (index: number) => void;
  onSuggestionSelect: (suggestion: string | AutocompleteOption) => void;
  placeholder?: string;
  label?: string;
  isMobile?: boolean;
}

export const AutocompleteModal = React.forwardRef<
  HTMLInputElement,
  AutocompleteModalProps
>(
  (
    {
      isOpen,
      value,
      onChange,
      onClose,
      suggestions,
      highlightedIndex,
      onHighlightedIndexChange,
      onSuggestionSelect,
      placeholder = "",
      label = "",
      isMobile = false,
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const dialogRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    // Combine refs
    useEffect(() => {
      if (typeof ref === "function") {
        ref(inputRef.current);
      } else if (ref) {
        ref.current = inputRef.current;
      }
    }, [ref]);

    // Auto-focus input when modal opens
    useEffect(() => {
      if (isOpen && inputRef.current) {
        inputRef.current.focus();
      }
    }, [isOpen]);

    // Scroll highlighted suggestion into view
    useEffect(() => {
      if (!listRef.current) return;

      const highlighted = listRef.current.querySelector(
        `[data-index="${highlightedIndex}"]`
      ) as HTMLElement | null;

      if (highlighted) {
        highlighted.scrollIntoView({ block: "nearest" });
      }
    }, [highlightedIndex]);

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!suggestions.length) {
        if (e.key === "Escape") {
          onClose();
        }
        return;
      }

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          onHighlightedIndexChange(
            Math.min(highlightedIndex + 1, suggestions.length - 1)
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          onHighlightedIndexChange(Math.max(highlightedIndex - 1, 0));
          break;
        case "Enter":
          e.preventDefault();
          onSuggestionSelect(suggestions[highlightedIndex]);
          break;
        case "Escape":
          e.preventDefault();
          onClose();
          break;
      }
    };

    // Handle backdrop click (close modal)
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === dialogRef.current) {
        onClose();
      }
    };

    const getSuggestionLabel = (suggestion: string | AutocompleteOption): string => {
      return typeof suggestion === "string" ? suggestion : suggestion.label;
    };

    if (!isOpen) return null;

    // On desktop, show a centered modal; on mobile, show full-screen modal
    if (!isMobile) {
      return (
        <>
          {/* Desktop: Backdrop with higher opacity */}
          <div
            ref={dialogRef}
            onClick={handleBackdropClick}
            className="fixed inset-0 z-40 bg-black/60"
          >
            {/* Desktop: Centered horizontally, fixed at top */}
            <div className="fixed z-50 left-1/2 top-[10%] transform -translate-x-1/2 bg-background border-2 border-muted-foreground/25 rounded-lg shadow-lg w-[550px] h-[75vh] flex flex-col">
              {/* Search Input with Clear Button */}
              <div className="border-b border-input px-6 py-4">
                <div className="relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="w-full border-2 border-muted-foreground/25 rounded-lg px-3 py-2 pr-10 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    autoComplete="off"
                  />
                  {value && (
                    <button
                      onClick={() => onChange("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                      aria-label="Clear input"
                      tabIndex={-1}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Suggestions List */}
              <div
                ref={listRef}
                className="overflow-y-auto flex-1"
              >
                {suggestions.length > 0 ? (
                  suggestions.map((suggestion, index) => {
                    const label = getSuggestionLabel(suggestion);
                    return (
                      <button
                        key={label}
                        data-index={index}
                        onClick={() => onSuggestionSelect(suggestion)}
                        className={`w-full text-left px-6 py-3 text-sm border-b border-border last:border-b-0 transition-colors ${
                          index === highlightedIndex
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-accent"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })
                ) : (
                  <div className="px-6 py-8 text-center text-muted-foreground text-sm">
                    No suggestions found
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      );
    }

    // Mobile: Full-screen modal
    return (
      <>
        {/* Mobile Backdrop */}
        <div
          ref={dialogRef}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 bg-black/70 lg:hidden"
        >
          {/* Mobile Modal Container */}
          <div className="absolute inset-0 bg-background flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-input p-4">
              <h2 className="text-lg font-semibold text-foreground">
                {label ? `Select ${label.replace(/[?]/, "")}` : "Select option"}
              </h2>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Input */}
            <div className="border-b border-input px-4 py-3">
              <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="w-full border-2 border-muted-foreground/25 rounded-lg px-3 py-2 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                autoComplete="off"
              />
            </div>

            {/* Suggestions List */}
            <div
              ref={listRef}
              className="overflow-y-auto flex-1"
            >
              {suggestions.length > 0 ? (
                suggestions.map((suggestion, index) => {
                  const label = getSuggestionLabel(suggestion);
                  return (
                    <button
                      key={label}
                      data-index={index}
                      onClick={() => onSuggestionSelect(suggestion)}
                      className={`w-full text-left px-4 py-3 text-base border-b border-border last:border-b-0 transition-colors ${
                        index === highlightedIndex
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })
              ) : (
                <div className="px-4 py-8 text-center text-muted-foreground text-sm">
                  No suggestions found
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
);

AutocompleteModal.displayName = "AutocompleteModal";
