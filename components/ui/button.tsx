import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Button component variants using class-variance-authority
 * Supports different visual styles, sizes, and states
 */
const buttonVariants = cva(
  // Base styles applied to all buttons
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Primary action button (charcoal background)
        default:
          "bg-primary-action text-surface hover:bg-primary-action/90 focus-visible:ring-primary-action dark:bg-dark-primary-action dark:text-dark-background",
        // Destructive action (delete, etc.)
        destructive:
          "bg-error text-white hover:bg-error/90 focus-visible:ring-error",
        // Outlined button
        outline:
          "border-2 border-border bg-transparent hover:bg-surface dark:border-dark-border dark:hover:bg-dark-surface",
        // Secondary/subtle button
        secondary:
          "bg-surface text-primary-text hover:bg-border/50 dark:bg-dark-surface dark:text-dark-primary-text dark:hover:bg-dark-border",
        // Ghost button (minimal styling)
        ghost:
          "hover:bg-surface hover:text-primary-text dark:hover:bg-dark-surface dark:hover:text-dark-primary-text",
        // Link style button
        link: "text-info underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-md px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

/**
 * Reusable Button component with variants
 * Based on shadcn/ui with custom StudyFlow styling
 *
 * @example
 * <Button variant="default">Save Assignment</Button>
 * <Button variant="outline" size="sm">Cancel</Button>
 * <Button variant="destructive">Delete</Button>
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
