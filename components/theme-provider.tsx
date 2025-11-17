"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";

/**
 * Theme Provider component for dark mode support
 * Wraps the app to enable theme switching
 *
 * This is a client component because next-themes uses React context
 * which requires client-side rendering
 *
 * @example
 * <ThemeProvider attribute="class" defaultTheme="system">
 *   {children}
 * </ThemeProvider>
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
