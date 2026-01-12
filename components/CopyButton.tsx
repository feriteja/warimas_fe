"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react"; // Using lucide-react for professional icons

interface CopyButtonProps {
  text: string;
}

export const CopyButton = ({ text }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      // Reset the icon after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`
        flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200
        ${
          copied
            ? "bg-green-100 text-green-700 ring-1 ring-green-600/20"
            : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50 hover:text-indigo-600"
        }
      `}
    >
      {copied ? (
        <>
          <Check size={14} strokeWidth={3} />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Copy size={14} strokeWidth={2.5} />
          <span>Copy Code</span>
        </>
      )}
    </button>
  );
};
