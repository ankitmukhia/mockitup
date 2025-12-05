"use client";

import { cn } from "@/lib/utils";
import React, { useMemo } from "react";

interface RangeInputProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  fill?: boolean;
}

export const RangeInput = ({
  min,
  max,
  step,
  value,
  onChange,
  className,
  fill = false,
}: RangeInputProps) => {
  const percentage = useMemo(() => {
    const safeMin = min || 0;
    const safeMax = max || 100;
    const safeValue = value || 0;
    const percentage = ((safeValue - safeMin) / (safeMax - safeMin)) * 100;
    return percentage > 0 && percentage < 100 ? percentage + 2 : percentage;
  }, [min, max, value]);

  return (
    <div
      className={cn(
        "relative flex items-center w-full h-8 bg-accent rounded-lg",
        className
      )}
    >
      {fill && (
        <div
          className="absolute left-0 top-0 bottom-0 bg-input rounded-lg pointer-events-none"
          style={{ width: `${percentage}%` }}
        />
      )}

      <input
        type="range"
        className={`slider w-full h-full appearance-none bg-transparent cursor-pointer rounded-lg ${
          (percentage === 0 || percentage === 100) && "px-2"
        }`}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
