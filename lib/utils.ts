import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx for conditional classes and tailwind-merge to handle conflicts
 *
 * @param inputs - Class names to merge
 * @returns Merged class string
 *
 * @example
 * cn("bg-red-500", "text-white", someCondition && "font-bold")
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
