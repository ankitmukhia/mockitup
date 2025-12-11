import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useMockupStore } from "@/stores/mockup-stores";

interface Position {
  x: number;
  y: number;
}

interface PositionControlProps {
  value: Position;
  onChange: (position: Position) => void;
  width: number;
  height: number;
  className?: string;
}

export const PositionController = ({
  value,
  onChange,
  width,
  height,
  className,
}: PositionControlProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // states
  const backgroundImage = useMockupStore.use.backgroundImage();
  const gradientBackgroundColor = useMockupStore.use.gradientBackgroundColor();
  const solidBackgroundColor = useMockupStore.use.solidBackgroundColor();

  // Convert absolute coordinates to relative (-1 to 1)
  const absoluteToRelative = (x: number, y: number): Position => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };

    const relX = ((x - rect.left) / rect.width) * 2 - 1;
    const relY = ((y - rect.top) / rect.height) * 2 - 1;

    const newX = Math.max(-1, Math.min(1, relX)) * (width / 2);
    const newY = Math.max(-1, Math.min(1, relY)) * (height / 2);

    return { x: newX, y: newY };
  };

  // Handle mouse/touch events
  const handlePointerMove = (e: PointerEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const pos = absoluteToRelative(e.clientX, e.clientY);
    onChange(pos);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
    }
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isDragging]);

  // Convert relative position back to pixel coordinates for the handle
  const handlePosition = {
    left: `${((value.x / (width / 2) + 1) / 2) * 100}%`,
    top: `${((value.y / (height / 2) + 1) / 2) * 100}%`,
  };

  const handleContainerPointerMove = (
    e: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (!dotRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    dotRef.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  return (
    <div className="flex flex-col gap-2 h-full">
      <p className="ml-1 text-xs text-sidebar-foreground/40 uppercase">
        Position
      </p>

      <div
        ref={containerRef}
        className={cn(
          "relative rounded-xl flex-1 w-full bg-background flex mx-auto overflow-hidden",
          className,
        )}
        onPointerDown={(e) => {
          setIsDragging(true);
          const pos = absoluteToRelative(e.clientX, e.clientY);
          onChange(pos);
        }}
        onPointerMove={handleContainerPointerMove}
        onPointerEnter={() => {
          if (dotRef.current) dotRef.current.style.opacity = "1";
        }}
        onPointerLeave={() => {
          if (dotRef.current) dotRef.current.style.opacity = "0";
        }}
        style={{
          ...(backgroundImage
            ? {
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : gradientBackgroundColor
              ? {
                  backgroundImage: `linear-gradient(${
                    gradientBackgroundColor.angle
                  }deg, ${gradientBackgroundColor.first}, ${
                    gradientBackgroundColor.second
                  }${
                    "third" in gradientBackgroundColor
                      ? `, ${gradientBackgroundColor.third}`
                      : ""
                  })`,
                }
              : {
                  backgroundColor: solidBackgroundColor || "transparent",
                }),
        }}
      >
        <div
          ref={dotRef}
          className="absolute w-3 h-3 bg-white rounded-full pointer-events-none opacity-0 transition-opacity duration-200 -top-0.5 -left-0.5"
          style={{
            willChange: "transform",
          }}
        />
        <div
          className="absolute w-3/4 h-3/4 rounded-xl -translate-x-1/2 -translate-y-1/2 border border-primary"
          style={handlePosition}
        />
      </div>
    </div>
  );
};
