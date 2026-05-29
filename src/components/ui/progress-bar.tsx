import * as React from "react";

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 to 100
  showLabel?: boolean;
  labelText?: string;
}

export function ProgressBar({
  className = "",
  value,
  showLabel = true,
  labelText,
  ...props
}: ProgressBarProps) {
  // Clamp value between 0 and 100
  const percentage = Math.min(Math.max(0, value), 100);

  return (
    <div className={`w-full flex flex-col space-y-1 ${className}`} {...props}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-semibold text-text-secondary">
          <span>{labelText || "Progress"}</span>
          <span>{percentage}%</span>
        </div>
      )}
      <div className="w-full h-2 bg-surface-soft rounded-full overflow-hidden border border-border/40">
        <div
          className="h-full bg-success transition-all duration-500 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
