import * as React from "react";
import { ExternalLink, ShieldCheck } from "lucide-react";
import { SourceType } from "@/types/domain";

export interface SourceBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  url: string;
  sourceType: SourceType;
  publisher?: string | null;
  lastCheckedAt?: Date | string | null;
}

export function SourceBlock({
  className = "",
  title,
  url,
  sourceType,
  publisher,
  lastCheckedAt,
  ...props
}: SourceBlockProps) {
  // Label and style depending on source type
  const typeConfigs = {
    official_government: { label: "Official Government", color: "text-success border-success/20 bg-success-soft/30" },
    official_provider: { label: "Official Provider", color: "text-info border-info/20 bg-info-soft/30" },
    trusted_institution: { label: "Trusted Institution", color: "text-accent border-accent/20 bg-accent-soft/30" },
    internal_reviewed_content: { label: "Reviewed Guide", color: "text-text-secondary border-border bg-surface-soft/60" },
    other: { label: "Reference", color: "text-text-muted border-border bg-surface-soft/40" },
  };

  const config = typeConfigs[sourceType] || typeConfigs.other;

  // Format date
  const formattedDate = lastCheckedAt
    ? new Date(lastCheckedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <div
      className={`border border-border/80 rounded-lg p-4 bg-surface text-sm flex flex-col justify-between space-y-3 shadow-card ${className}`}
      {...props}
    >
      <div className="flex justify-between items-start gap-2">
        <div className="flex flex-col space-y-1">
            <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border self-start ${config.color}`}>
            {config.label}
          </span>
          <h4 className="font-semibold text-text-primary text-sm pt-1">{title}</h4>
          {publisher && <p className="text-xs text-text-secondary">Published by: {publisher}</p>}
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-secondary hover:text-accent p-1.5 hover:bg-surface-soft rounded-md transition-colors"
          aria-label={`Open source link for ${title}`}
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
      
      {formattedDate && (
        <div className="flex items-center gap-1.5 text-xs text-text-muted border-t border-border/40 pt-2.5">
          <ShieldCheck className="h-3.5 w-3.5 text-success" />
          <span>Last reviewed: {formattedDate}</span>
        </div>
      )}
    </div>
  );
}
