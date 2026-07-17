import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-sage-100 text-sage-800 dark:bg-sage-500/15 dark:text-sage-300",
        outline: "border-navy-200 text-navy-600 dark:border-white/15 dark:text-white/70",
        navy: "border-transparent bg-navy-700 text-white",
        beige: "border-transparent bg-beige-200 text-navy-800",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
