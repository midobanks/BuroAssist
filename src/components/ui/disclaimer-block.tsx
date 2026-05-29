import * as React from "react";
import { AlertCircle } from "lucide-react";

export interface DisclaimerBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
  className?: string;
}

export function DisclaimerBlock({
  text = "BüroAssist provides general guidance, not legal, tax, immigration, insurance, or financial advice. Always confirm final requirements with the responsible authority, consulate, or provider.",
  className = "",
  ...props
}: DisclaimerBlockProps) {
  return (
    <div
      className={`bg-surface-soft/60 border border-border/80 rounded-xl p-4 flex gap-3 text-xs leading-relaxed text-text-secondary select-none ${className}`}
      {...props}
    >
      <AlertCircle className="h-[18px] w-[18px] text-text-muted shrink-0 mt-0.5" />
      <div className="flex flex-col space-y-0.5">
        <span className="font-semibold text-text-primary uppercase tracking-wider text-[9px]">
          Disclaimer
        </span>
        <p className="font-medium text-text-secondary">{text}</p>
      </div>
    </div>
  );
}
