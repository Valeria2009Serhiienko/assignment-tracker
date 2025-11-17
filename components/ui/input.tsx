import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Input Component
 *
 * A styled text input field that matches the StudyFlow design system
 * Supports all standard HTML input attributes
 *
 * Features:
 * - Consistent styling across the app
 * - Focus states with ring effect
 * - Disabled state styling
 * - Full keyboard accessibility
 * - Works with forms and React Hook Form
 *
 * @example
 * <Input type="email" placeholder="Enter your email" />
 * <Input type="password" placeholder="Password" disabled />
 */
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Base styles
          "flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-primary-text",
          // Placeholder styling
          "placeholder:text-tertiary-text",
          // Focus states
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-action focus-visible:ring-offset-2",
          // Disabled state
          "disabled:cursor-not-allowed disabled:opacity-50",
          // Dark mode
          "dark:border-dark-border dark:bg-dark-surface dark:text-dark-primary-text",
          // Custom classes
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
