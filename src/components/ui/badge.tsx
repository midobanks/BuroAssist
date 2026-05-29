import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "error" | "info" | "neutral";
}

export function Badge({ className = "", variant = "default", children, ...props }: BadgeProps) {
  const baseStyle =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide border transition-colors";

  const variants = {
    default: "bg-surface-soft border-border text-text-primary",
    neutral: "bg-surface-soft border-border text-text-secondary",
    success: "bg-success-soft border-success/10 text-success",
    warning: "bg-warning-soft border-warning/10 text-warning",
    error: "bg-error-soft border-error/10 text-error",
    info: "bg-info-soft border-info/10 text-info",
  };

  const variantStyle = variants[variant] || variants.default;

  return (
    <span className={`${baseStyle} ${variantStyle} ${className}`} {...props}>
      {children}
    </span>
  );
}
