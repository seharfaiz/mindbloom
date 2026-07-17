import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-navy-700 text-white hover:bg-navy-800 shadow-soft hover:shadow-lift",
        sage: "bg-sage-500 text-white hover:bg-sage-600 shadow-soft hover:shadow-glow",
        outline: "border border-navy-200 bg-transparent hover:bg-navy-50 dark:border-white/15 dark:hover:bg-white/5",
        ghost: "hover:bg-navy-50 dark:hover:bg-white/5",
        link: "underline-offset-4 hover:underline text-navy-700 dark:text-sage-300",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-sm",
        lg: "h-13 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
