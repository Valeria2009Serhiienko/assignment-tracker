"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Label Component Variants
 *
 * Based on Radix UI Label primitive for accessibility
 * Automatically associates labels with form inputs
 */
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

/**
 * Label Component
 *
 * Accessible form label that works with all input types
 *
 * Why use this instead of <label>?
 * - Better accessibility (uses Radix UI primitive)
 * - Consistent styling across the app
 * - Works seamlessly with disabled inputs
 * - Proper focus management
 *
 * @example
 * <Label htmlFor="email">Email Address</Label>
 * <Input id="email" type="email" />
 */
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      labelVariants(),
      "text-primary-text dark:text-dark-primary-text",
      className
    )}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
