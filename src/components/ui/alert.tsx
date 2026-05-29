import * as React from "react";
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from "lucide-react";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "info" | "warning" | "error" | "success";
  title?: string;
}

export function Alert({ className = "", variant = "info", title, children, ...props }: AlertProps) {
  const variants = {
    info: {
      outer: "bg-info-soft border-info/20 text-text-primary",
      icon: <Info className="h-5 w-5 text-info shrink-0" />,
      titleColor: "text-info font-semibold",
    },
    warning: {
      outer: "bg-warning-soft border-warning/20 text-text-primary",
      icon: <AlertTriangle className="h-5 w-5 text-warning shrink-0" />,
      titleColor: "text-warning font-semibold",
    },
    error: {
      outer: "bg-error-soft border-error/20 text-text-primary",
      icon: <AlertCircle className="h-5 w-5 text-error shrink-0" />,
      titleColor: "text-error font-semibold",
    },
    success: {
      outer: "bg-success-soft border-success/20 text-text-primary",
      icon: <CheckCircle2 className="h-5 w-5 text-success shrink-0" />,
      titleColor: "text-success font-semibold",
    },
  };

  const style = variants[variant] || variants.info;

  return (
    <div
      role="alert"
      className={`flex gap-3.5 border rounded-xl p-4 text-sm leading-relaxed ${style.outer} ${className}`}
      {...props}
    >
      <div className="pt-0.5">{style.icon}</div>
      <div className="flex flex-col space-y-1">
        {title && <span className={`text-sm ${style.titleColor}`}>{title}</span>}
        <div className="text-text-primary text-sm font-medium">{children}</div>
      </div>
    </div>
  );
}
