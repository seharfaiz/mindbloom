import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-11 w-full rounded-xl border border-navy-200 bg-white/80 px-4 py-2 text-sm text-navy-900 placeholder:text-navy-400 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/15 dark:bg-white/5 dark:text-white",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
