"use client";

import { useMockupStore } from "@/stores/mockup-stores";

export const RightSidebar = () => {
  // states
  const zoom = useMockupStore.use.zoom();
  const rotationX = useMockupStore.use.rotationX();
  const rotationY = useMockupStore.use.rotationY();
  const flipH = useMockupStore.use.flipH();
  const flipV = useMockupStore.use.flipV();

  // actions
  const setZoom = useMockupStore.use.setZoom();
  const setRotationX = useMockupStore.use.setRotationX();
  const setRotationY = useMockupStore.use.setRotationY();
  const setFlipH = useMockupStore.use.setFlipH();
  const setFlipV = useMockupStore.use.setFlipV();

  const presets = [
    { name: "0×30", x: 0, y: 30 },
    { name: "30×0", x: 30, y: 0 },
    { name: "-30×0", x: -30, y: 0 },
    { name: "0×-30", x: 0, y: -30 },
  ];

  const resetRotation = () => {
    setRotationX(0);
    setRotationY(0);
    setFlipH(false);
    setFlipV(false);
  };

  return (
    <div className="min-w-[230px] bg-sidebar p-4 rounded-xl overflow-y-auto">
      <h1 className="text-lg font-bold text-sidebar-foreground mb-6">
        3D Controls
      </h1>

      <div className="space-y-6">
        {/* Rotation Values */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-sidebar-border rounded p-2">
            <p className="text-xs text-sidebar-foreground/70">X Rotation</p>
            <p className="text-lg font-bold text-sidebar-foreground">
              {rotationX}°
            </p>
          </div>
          <div className="bg-sidebar-border rounded p-2">
            <p className="text-xs text-sidebar-foreground/70">Y Rotation</p>
            <p className="text-lg font-bold text-sidebar-foreground">
              {rotationY}°
            </p>
          </div>
        </div>

        {/* Zoom Control */}
        <div>
          <label className="text-sm font-semibold text-sidebar-foreground block mb-2">
            Zoom ({Math.round(zoom * 100)}%)
          </label>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.05"
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* X Axis Slider */}
        <div>
          <label className="text-sm font-semibold text-sidebar-foreground block mb-2">
            Horizontal (X Axis)
          </label>
          <input
            type="range"
            min="-90"
            max="90"
            value={rotationX}
            onChange={(e) => setRotationX(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-sidebar-foreground/60 mt-1">
            <span>-90°</span>
            <span>0°</span>
            <span>90°</span>
          </div>
        </div>

        {/* Y Axis Slider */}
        <div>
          <label className="text-sm font-semibold text-sidebar-foreground block mb-2">
            Vertical (Y Axis)
          </label>
          <input
            type="range"
            min="-90"
            max="90"
            value={rotationY}
            onChange={(e) => setRotationY(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-sidebar-foreground/60 mt-1">
            <span>-90°</span>
            <span>0°</span>
            <span>90°</span>
          </div>
        </div>

        {/* Presets */}
        <div>
          <p className="text-sm font-semibold text-sidebar-foreground mb-2">
            Presets
          </p>
          <div className="grid grid-cols-2 gap-2">
            {presets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setRotationX(preset.x);
                  setRotationY(preset.y);
                }}
                className={`py-2 px-2 rounded text-sm font-semibold transition-all ${
                  rotationX === preset.x && rotationY === preset.y
                    ? "bg-blue-500 text-white"
                    : "bg-sidebar-border text-sidebar-foreground hover:bg-sidebar-border/80"
                }`}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* Flip Controls */}
        <div className="space-y-2">
          <button
            onClick={() => setFlipH(!flipH)}
            className={`w-full py-2 px-3 rounded text-sm font-semibold transition-all ${
              flipH
                ? "bg-green-500 text-white"
                : "bg-sidebar-border text-sidebar-foreground hover:bg-sidebar-border/80"
            }`}
          >
            {flipH ? "✓ " : ""}Flip Horizontal
          </button>
          <button
            onClick={() => setFlipV(!flipV)}
            className={`w-full py-2 px-3 rounded text-sm font-semibold transition-all ${
              flipV
                ? "bg-green-500 text-white"
                : "bg-sidebar-border text-sidebar-foreground hover:bg-sidebar-border/80"
            }`}
          >
            {flipV ? "✓ " : ""}Flip Vertical
          </button>
        </div>

        {/* Reset Button */}
        <button
          onClick={resetRotation}
          className="w-full py-2 px-3 rounded text-sm font-semibold bg-sidebar-border text-sidebar-foreground hover:bg-sidebar-border/80 transition-all"
        >
          Reset 3D
        </button>
      </div>
    </div>
  );
};
