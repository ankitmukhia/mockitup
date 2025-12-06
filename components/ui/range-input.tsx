"use client";

import { cn } from "@/lib/utils";
import React, { useMemo } from "react";
import { RANGE_THUMB_SIZE } from "@/lib/constants";

interface RangeInputProps {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  fill?: boolean;
  thumbSize?: RANGE_THUMB_SIZE;
}

export const RangeInput = ({
  label,
  min,
  max,
  step,
  value,
  onChange,
  className,
  fill = false,
  thumbSize = RANGE_THUMB_SIZE.SMALL,
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
        "group relative flex items-center w-full h-8 overflow-hidden bg-background rounded-lg",
        className
      )}
    >
      {fill && (
        <div
          className="absolute inset-0 bg-muted rounded-lg pointer-events-none z-0"
          style={{ width: `${percentage}%` }}
        />
      )}

      <input
        type="range"
        className={cn(
          "w-full h-full appearance-none bg-transparent rounded-lg group-hover:cursor-grab active:cursor-grabbing z-10",
          thumbSize,
          (percentage === 0 || percentage === 100) && "px-2"
        )}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
      />

      <div className="absolute inset-0 flex items-center text-xs text-sidebar-foreground/70 justify-between pointer-events-none px-3">
        <span>{label}</span>
        <span>{Number(value).toFixed(2)}</span>
      </div>
    </div>
  );
};
