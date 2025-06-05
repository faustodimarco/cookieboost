import * as React from "react";
import { Label } from "./label";
import { X } from "lucide-react";

interface ColorSelectorProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
  onClear?: () => void;
  disabled?: boolean;
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({
  label,
  value,
  onChange,
  onClear,
  disabled = false,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleSwatchClick = () => {
    if (!disabled) inputRef.current?.click();
  };

  return (
    <div className="flex items-center w-full max-w-sm">
      <Label className="text-[#E5E5E5] text-xs font-normal mr-3 min-w-[32px]">{label}</Label>
      <div className="flex items-center bg-[#181818] rounded-full px-1 py-1 min-h-[36px]">
        <button
          type="button"
          className="w-7 h-7 rounded-full border border-[#444] bg-white flex-shrink-0 focus:outline-none focus:ring-1 focus:ring-[#007AFF]"
          style={{ backgroundColor: value }}
          onClick={handleSwatchClick}
          aria-label={`Pick ${label.toLowerCase()} color`}
          disabled={disabled}
        >
          <input
            ref={inputRef}
            type="color"
            value={value}
            onChange={e => onChange(e.target.value)}
            className="absolute opacity-0 w-0 h-0 pointer-events-none"
            tabIndex={-1}
            aria-hidden="true"
            disabled={disabled}
          />
        </button>
        <span className="text-[#F2F2F7] text-xs font-mono tracking-wide px-2 select-text opacity-80">
          {value.replace(/^#/, "").toUpperCase()}
        </span>
        {onClear && value && (
          <button
            type="button"
            className="ml-1 p-1 rounded hover:bg-[#232324] transition-colors text-[#888] hover:text-white"
            onClick={onClear}
            aria-label={`Clear ${label.toLowerCase()} color`}
            disabled={disabled}
            style={{ lineHeight: 0 }}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}; 