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
      // Close modal on Tab to allow focus to move to next element
      if (e.key === "Tab") {
        onClose();
        return;
      }

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

    // Mobile: Full-screen modal
    return (
      <>
        {/* Modal Backdrop */}
        <div
          ref={dialogRef}
          onClick={handleBackdropClick}
          className={`fixed inset-0 z-50 ${isMobile ? 'bg-black/70' : 'bg-black/30'}`}
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
                onBlur={(e) => e.stopPropagation()}
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
