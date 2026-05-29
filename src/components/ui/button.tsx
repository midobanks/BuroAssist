import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "danger";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", isLoading = false, children, disabled, ...props }, ref) => {
    // Base styles (min-height 44px for accessibility touch targets, smooth transition, active state)
    const baseStyle =
      "inline-flex items-center justify-center rounded-md text-sm font-semibold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50 min-h-[44px] px-6 py-2.5 active:scale-[0.98]";

    const variants = {
      primary:
        "bg-accent hover:bg-accent/90 text-surface shadow-card focus-visible:outline-accent",
      secondary:
        "bg-accent-soft hover:bg-accent-soft/85 text-accent border border-accent/10 focus-visible:outline-accent",
      tertiary:
        "bg-transparent hover:bg-surface-soft text-text-secondary hover:text-text-primary focus-visible:outline-text-primary",
      danger:
        "bg-error hover:bg-error/90 text-surface shadow-card focus-visible:outline-error",
    };

    const variantStyle = variants[variant] || variants.primary;

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyle} ${variantStyle} ${className}`}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4 text-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
