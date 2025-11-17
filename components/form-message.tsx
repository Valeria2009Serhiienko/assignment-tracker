import { AlertCircle, CheckCircle2 } from "lucide-react";

/**
 * Form Message Component
 *
 * Displays error or success messages in forms
 * Provides visual feedback to users
 *
 * @param type - "error" or "success"
 * @param message - The message to display
 *
 * @example
 * {error && <FormMessage type="error" message={error} />}
 * {success && <FormMessage type="success" message="Account created!" />}
 */
interface FormMessageProps {
  type: "error" | "success";
  message: string;
}

export function FormMessage({ type, message }: FormMessageProps) {
  const isError = type === "error";

  return (
    <div
      className={`flex items-start gap-3 rounded-md border p-4 ${
        isError
          ? "border-error/20 bg-error/10 text-error dark:border-error/30 dark:bg-error/20"
          : "border-success/20 bg-success/10 text-success dark:border-success/30 dark:bg-success/20"
      }`}
      role="alert"
      aria-live="polite"
    >
      {isError ? (
        <AlertCircle className="h-5 w-5 flex-shrink-0" />
      ) : (
        <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
      )}
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}
