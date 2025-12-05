"use client";

import { useMockupStore } from "@/stores/mockup-stores";
import { RangeInput } from "@/components/ui/range-input";
import Image from "next/image";

export const RightSidebar = () => {
  // states
  const mockupImage = useMockupStore.use.mockupImage();
  const backgroundImage = useMockupStore.use.backgroundImage();
  const gradientBackgroundColor = useMockupStore.use.gradientBackgroundColor();
  const solidBackgroundColor = useMockupStore.use.solidBackgroundColor();

  const zoom = useMockupStore.use.zoom();
  const rotationX = useMockupStore.use.rotationX();
  const rotationY = useMockupStore.use.rotationY();
  const rotationZ = useMockupStore.use.rotationZ();
  const flipH = useMockupStore.use.flipH();
  const flipV = useMockupStore.use.flipV();

  // actions
  const setZoom = useMockupStore.use.setZoom();
  const setRotationX = useMockupStore.use.setRotationX();
  const setRotationY = useMockupStore.use.setRotationY();
  const setFlipH = useMockupStore.use.setFlipH();
  const setFlipV = useMockupStore.use.setFlipV();
  const setRotationZ = useMockupStore.use.setRotationZ();

  const presets = [
    { name: "0×0", x: 0, y: 0, zX: 0 },
    { name: "0×-8", x: 0, y: 0, zX: -8 },
    { name: "0×30", x: 0, y: 30, zX: 0 },
    { name: "30×0", x: 30, y: 0, zX: 0 },
    { name: "-30×0", x: -30, y: 0, zX: 0 },
    { name: "0×-30", x: 0, y: -30, zX: 0 },
    { name: "-30×-30", x: -30, y: -30, zX: 0 },
    { name: "-30×30", x: -30, y: 30, zX: 0 },
    { name: "30×-30", x: 30, y: -30, zX: 0 },
    { name: "30×30", x: 30, y: 30, zX: 0 },
  ];

  const resetRotation = () => {
    setRotationX(0);
    setRotationY(0);
    setFlipH(false);
    setFlipV(false);
  };

  // will have button,  that streatches the bar to the right smoothely
  return (
    <div className="min-w-[210px] max-w-[210px] bg-sidebar p-4 rounded-xl overflow-y-auto no-scrollbar">
      <h1 className="text-lg font-bold text-sidebar-foreground mb-6">
        3D Controls
      </h1>

      <div className="space-y-4">
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
          <RangeInput
            min={10}
            max={200}
            step={5}
            value={zoom * 100}
            onChange={(e) => setZoom(Number(e.target.value) / 100)}
            className="w-full"
          />
        </div>

        {/* X Axis Slider */}
        <div>
          <label className="text-sm font-semibold text-sidebar-foreground block mb-2">
            Horizontal (X Axis)
          </label>
          <RangeInput
            min={-90}
            max={90}
            step={1}
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
        <div className="mb-6">
          <label className="text-sm font-semibold text-sidebar-foreground block mb-2">
            Vertical (Y Axis)
          </label>
          <RangeInput
            min={-90}
            max={90}
            step={1}
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
          <div className="flex flex-col gap-2">
            {presets.map((preset, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setRotationX(preset.x);
                  setRotationY(preset.y);
                  setRotationZ(preset.zX);
                }}
                className={`relative px-8 py-2 rounded-xl text-sm font-semibold transition-all ${
                  rotationX === preset.x &&
                  rotationY === preset.y &&
                  rotationZ === preset.zX
                    ? "outline outline-ring outline-offset-2 bg-sidebar-border"
                    : "bg-sidebar-border text-sidebar-foreground hover:bg-sidebar-border/80"
                }`}
              >
                <div
                  className="w-full h-24 flex items-center justify-center"
                  style={{
                    transform: `perspective(200px) rotateX(${preset.x}deg) rotateY(${preset.y}deg) rotateZ(${preset.zX}deg) scale(0.8)`,
                    transformOrigin: "center center",
                  }}
                >
                  <Image
                    src={mockupImage}
                    alt="mockup"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
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
