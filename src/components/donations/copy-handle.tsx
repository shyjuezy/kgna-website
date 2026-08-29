"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/**
 * The Zelle handle is the whole point of that column - a donor has to get it
 * into their banking app - so it gets a copy button rather than asking them to
 * select monospace text on a phone. Clipboard access can be refused (insecure
 * context, permissions), in which case the handle is still selectable.
 */
export function CopyHandle({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="flex items-center gap-2 rounded-md border border-primary/20 bg-primary/5 px-2.5 py-1.5">
      <span className="flex-1 select-all break-all font-mono text-xs">
        {value}
      </span>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : `Copy ${value}`}
        className="flex-none rounded border px-2 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {copied ? (
          <span className="flex items-center gap-1">
            <Check className="h-3 w-3" /> Copied
          </span>
        ) : (
          <span className="flex items-center gap-1">
            <Copy className="h-3 w-3" /> Copy
          </span>
        )}
      </button>
    </div>
  );
}
