import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-sans antialiased transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 font-semibold",
        destructive: "bg-destructive text-white hover:bg-destructive/90 font-semibold",
        outline:
          "border border-input hover:bg-accent hover:text-accent-foreground font-medium",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 font-medium",
        ghost: "hover:bg-accent hover:text-accent-foreground font-normal",
        link: "underline-offset-4 hover:underline text-primary font-medium",
      },
      size: {
        default: "h-10 py-2 px-4 text-sm",
        sm: "h-9 px-2 rounded-md text-xs",
        lg: "h-11 px-8 rounded-md text-base",
        xl: "h-12 px-10 rounded-md text-lg font-semibold", // Added extra large size
        icon: "h-6 w-6 text-sm",
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
  active?: boolean;
  icon?: React.ReactNode;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, active = false, loading = false, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(
          buttonVariants({ variant, size, className }),
          active && "bg-accent text-accent-foreground font-semibold", // Active styles
          loading && "opacity-70 pointer-events-none", // Loading state
          "transition-all duration-200 ease-in-out" // Smooth transitions
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };