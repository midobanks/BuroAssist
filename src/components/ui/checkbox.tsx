import * as React from "react";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  description?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = "", label, description, id, checked, onChange, disabled, ...props }, ref) => {
    const uniqueId = id || React.useId();

    return (
      <label
        htmlFor={uniqueId}
        className={`flex items-start gap-3.5 cursor-pointer select-none group min-h-[44px] py-1 text-sm ${
          disabled ? "pointer-events-none opacity-50" : ""
        } ${className}`}
      >
        <div className="relative flex items-center mt-0.5 min-h-[24px]">
          <input
            id={uniqueId}
            ref={ref}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            className="peer sr-only"
            {...props}
          />
          <div className="h-5 w-5 rounded border border-border bg-surface group-hover:border-accent peer-checked:bg-success peer-checked:border-success flex items-center justify-center transition-all focus-within:ring-2 focus-within:ring-accent">
            <svg
              className="h-3.5 w-3.5 text-surface scale-0 group-has-[:checked]:scale-100 transition-transform duration-150"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>

        {(label || description) && (
          <div className="flex flex-col space-y-0.5">
            {label && (
              <span className={`font-semibold text-text-primary group-hover:text-accent transition-colors ${
                checked ? "line-through text-text-muted decoration-text-muted" : ""
              }`}>
                {label}
              </span>
            )}
            {description && (
              <p className={`text-xs text-text-secondary ${checked ? "text-text-muted" : ""}`}>
                {description}
              </p>
            )}
          </div>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
