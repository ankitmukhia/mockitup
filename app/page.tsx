"use client";

import { useRef, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import ColorThief from "colorthief";
import Image from "next/image";
import { blendPalette } from "@/lib/color-blender";
import { useMockupStore } from "@/stores/mockup-stores";
import {
  CurvedBorder,
  RoundedBorder,
  SharpBorder,
  UploadImage,
  UnplashIcon,
} from "@/assets/svg";
import { Resolutions } from "@/components/resolutions";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HexColorPicker } from "react-colorful";
import { useDebounce } from "@/hooks/use-debounce";
import { searchAction, type UnsplashPhoto } from "./actions";

const EXAMPLE_SEARCHES = ["Nature", "People", "Food", "Travel", "Business"];

export default function Home() {
  // mockup states
  const resolution = useMockupStore.use.resolution();
  const mockupImage = useMockupStore.use.mockupImage();
  const backgroundImage = useMockupStore.use.backgroundImage();
  const gradientBackgroundColor = useMockupStore.use.gradientBackgroundColor();
  const solidBackgroundColor = useMockupStore.use.solidBackgroundColor();
  const canvasSolidBackgroundColor =
    useMockupStore.use.canvasSolidBackgroundColor();
  const colorPalette = useMockupStore.use.colorPalette();

  // actions
  const setMockupImage = useMockupStore.use.setMockupImage();
  const setBackgroundImage = useMockupStore.use.setBackgroundImage();
  const setGradientBackgroundColor =
    useMockupStore.use.setGradientBackgroundColor();
  const setSolidBackgroundColor = useMockupStore.use.setSolidBackgroundColor();
  const setCanvasSolidBackgroundColor =
    useMockupStore.use.setCanvasSolidBackgroundColor();
  const setColorPalette = useMockupStore.use.setColorPalette();

  const [canvasRadius, setCanvasRadius] = useState(20);
  const [zoom, setZoom] = useState(0.75);
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const [hexColor, setHexColor] = useState("");
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const searchDebounceQuery = useDebounce(searchQuery);
  const [photos, setPhotos] = useState<Array<UnsplashPhoto>>([]);

  // 3D Rotation states
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mockupInputRef = useRef<HTMLInputElement>(null);
  const backgroundInputRef = useRef<HTMLInputElement>(null);
  const mockupImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      if (!searchDebounceQuery.trim().length) return;

      const photos = await searchAction(searchDebounceQuery.trim(), 1);
      setPhotos(photos);
    })();
  }, [searchDebounceQuery]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = resolution.width;
    canvas.height = resolution.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (gradientBackgroundColor) {
      const angleRad = ((gradientBackgroundColor.angle - 90) * Math.PI) / 180;

      const width = canvas.width;
      const height = canvas.height;
      const cx = width / 2;
      const cy = height / 2;

      const dx = Math.cos(angleRad);
      const dy = Math.sin(angleRad);

      const corners = [
        { x: -width / 2, y: -height / 2 },
        { x: width / 2, y: -height / 2 },
        { x: width / 2, y: height / 2 },
        { x: -width / 2, y: height / 2 },
      ];

      const projections = corners.map((c) => c.x * dx + c.y * dy);
      const minProj = Math.min(...projections);
      const maxProj = Math.max(...projections);

      const x0 = cx + minProj * dx;
      const y0 = cy + minProj * dy;
      const x1 = cx + maxProj * dx;
      const y1 = cy + maxProj * dy;

      const gradient = ctx.createLinearGradient(x0, y0, x1, y1);

      if (gradientBackgroundColor) {
        if ("third" in gradientBackgroundColor) {
          gradient.addColorStop(0, gradientBackgroundColor.first);
          gradient.addColorStop(0.5, gradientBackgroundColor.second);
          gradient.addColorStop(1, gradientBackgroundColor.third);
        } else {
          gradient.addColorStop(0, gradientBackgroundColor.first);
          gradient.addColorStop(1, gradientBackgroundColor.second);
        }
      }

      ctx.fillStyle = gradient;
    } else {
      ctx.fillStyle = canvasSolidBackgroundColor;
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (backgroundImage) {
      const img = new window.Image();
      img.src = backgroundImage;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
    }
  }, [
    resolution,
    solidBackgroundColor,
    backgroundImage,
    gradientBackgroundColor,
    canvasSolidBackgroundColor,
  ]);

  const handleMockUpImageSelect = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setMockupImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundSelect = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setBackgroundImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const extractColorFromImage = (image: HTMLImageElement) => {
    const colorThief = new ColorThief();
    const palette = colorThief.getPalette(image);

    const blended = blendPalette(palette);
    setColorPalette(blended);
  };

  // Get 3D transform string
  const getTransform = () => {
    const scaleX = flipH ? -1 : 1;
    const scaleY = flipV ? -1 : 1;
    const translateX = rotationY * 0.2;
    const translateY = rotationX * -0.2;

    return `perspective(200em) translate(${translateX}%, ${translateY}%) scale(${
      zoom * scaleX
    }, ${
      zoom * scaleY
    }) rotateX(${rotationX}deg) rotateY(${rotationY}deg) rotateZ(0deg) skewX(0deg) skewY(0deg)`;
  };

  const resetRotation = () => {
    setRotationX(0);
    setRotationY(0);
    setFlipH(false);
    setFlipV(false);
  };

  const presets = [
    { name: "0×30", x: 0, y: 30 },
    { name: "30×0", x: 30, y: 0 },
    { name: "-30×0", x: -30, y: 0 },
    { name: "0×-30", x: 0, y: -30 },
  ];

  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setContainerSize({ width, height });
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const padding = 64;
  const scale =
    containerSize.width && containerSize.height
      ? Math.min(
          (containerSize.width - padding) / resolution.width,
          (containerSize.height - padding) / resolution.height
        )
      : 0.5;

  const loadMore = async () => {
    const photos = await searchAction(searchDebounceQuery.trim(), page + 1);
    setPhotos((prev) => [...prev, ...photos]);
  };

  return (
    <div className="flex h-svh p-2 gap-2">
      {/* left bar */}
      <div className="min-w-[210px] max-w-[210px] bg-sidebar p-2 rounded-xl overflow-y-auto no-scrollbar">
        <div className="space-y-4">
          <div
            onClick={() => {
              if (backgroundInputRef.current) {
                backgroundInputRef.current.click();
              }
            }}
            className="flex items-center gap-2 border border-dashed border-sidebar-border p-2 rounded-md cursor-pointer"
          >
            <Input
              ref={backgroundInputRef}
              onChange={handleBackgroundSelect}
              accept="image/*"
              type="file"
              className="hidden"
            />
            <p className="text-sm">Upload Background</p>
          </div>

          <Resolutions />

          <div className="space-y-6">
            <h1 className="text-sm font-semibold">Singles</h1>
            <div className="flex gap-1 flex-wrap">
              {colorPalette?.singles?.length > 0 &&
                colorPalette.singles.map((color, index) => (
                  <div
                    onClick={() => {
                      setGradientBackgroundColor(null);
                      setCanvasSolidBackgroundColor(color.color);
                    }}
                    key={index}
                    className="w-[36px] h-[36px] rounded-lg cursor-pointer hover:scale-110 transition-transform"
                    style={{
                      backgroundColor: color.color,
                    }}
                  />
                ))}
            </div>

            <h1 className="text-sm font-semibold">Two Color Gradients</h1>
            <div className="flex gap-1 flex-wrap">
              {colorPalette?.twoColorGradients?.length > 0 &&
                colorPalette.twoColorGradients.map((gradient, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setGradientBackgroundColor(gradient);
                    }}
                    className="w-[36px] h-[36px] rounded-lg cursor-pointer hover:scale-110 transition-transform"
                    style={{
                      backgroundImage: `linear-gradient(${gradient.angle}deg, ${gradient.first}, ${gradient.second})`,
                    }}
                  />
                ))}
            </div>

            <h1 className="text-sm font-semibold">Three Color Gradients</h1>
            <div className="flex gap-1 flex-wrap">
              {colorPalette?.threeColorGradients?.length > 0 &&
                colorPalette.threeColorGradients.map((gradient, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setGradientBackgroundColor(gradient);
                    }}
                    className="w-[36px] h-[36px] rounded-lg cursor-pointer hover:scale-110 transition-transform"
                    style={{
                      backgroundImage: `linear-gradient(${gradient.angle}deg, ${gradient.first}, ${gradient.second}, ${gradient.third})`,
                    }}
                  />
                ))}
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold">Border</p>
              <div className="flex gap-1.5 justify-between">
                {[SharpBorder, CurvedBorder, RoundedBorder].map(
                  (BorderComponent, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center bg-accent flex-1 p-2 rounded-lg h-16"
                    >
                      <div className="size-6">
                        <BorderComponent />
                      </div>
                    </div>
                  )
                )}
              </div>
              <Input
                type="range"
                min={0}
                max={100}
                value={canvasRadius}
                onChange={(e) => setCanvasRadius(Number(e.target.value))}
              />
            </div>

            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold">Solid Colors</p>
              <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <PlusIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-fit flex flex-col gap-2 p-2">
                  <HexColorPicker
                    color={solidBackgroundColor[0]}
                    onChange={setHexColor}
                  />
                  <Input
                    type="text"
                    value={solidBackgroundColor[0]}
                    onChange={(e) => setSolidBackgroundColor(e.target.value)}
                  />
                  <Button
                    onClick={() => {
                      setSolidBackgroundColor(hexColor.slice(1));
                      setPopoverOpen(false);
                    }}
                  >
                    Add
                  </Button>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex gap-1 flex-wrap">
              {solidBackgroundColor.map((color, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setGradientBackgroundColor(null);
                    setCanvasSolidBackgroundColor(`#${color}`);
                  }}
                  className="w-[36px] h-[36px] rounded-lg cursor-pointer hover:scale-110 transition-transform"
                  style={{
                    backgroundColor: `#${color}`,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-2">
            <Popover>
              <PopoverTrigger>
                <div className="w-10 h-10 bg-muted p-2 rounded-lg">
                  <UnplashIcon />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-70 h-90">
                <Input
                  type="text"
                  name="searchQuery"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                />

                <div className="flex flex-col items-center h-full justify-center gap-2">
                  <div className="flex items-center flex-wrap gap-2 overflow-y-auto">
                    {photos.length > 0
                      ? photos.map((photo, index) => (
                          <div
                            key={index}
                            className="relative h-[60px] w-[60px]"
                          >
                            <Image
                              src={photo.urls.small}
                              alt={photo.alt_description || "Unsplash photo"}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))
                      : EXAMPLE_SEARCHES.map((search, index) => (
                          <Button key={index}>{search}</Button>
                        ))}

                    <Button onClick={loadMore}>Load More</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="flex-1 h-full">
        <div
          ref={containerRef}
          className="relative flex items-center justify-center h-full w-full overflow-hidden"
        >
          <div
            style={{
              width: `${resolution.width * scale}px`,
              height: `${resolution.height * scale}px`,
              transform: `translate(${position.x}px, ${position.y}px)`,
            }}
          >
            <div
              className="relative overflow-hidden"
              style={{
                width: `${resolution.width}px`,
                height: `${resolution.height}px`,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                borderRadius: `${canvasRadius}px`,
              }}
            >
              <canvas ref={canvasRef} id="preview-canvas" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  ref={mockupImageRef}
                  className="relative h-full w-full cursor-pointer"
                  style={{
                    transform: getTransform(),
                    transition: "transform 0.130s linear",
                    transformStyle: "preserve-3d",
                    transformOrigin: "center center",
                  }}
                  onClick={() => {
                    if (mockupInputRef.current) {
                      mockupInputRef.current.click();
                    }
                  }}
                >
                  <Image
                    src={
                      mockupImage ||
                      "https://res.cloudinary.com/dtxxjwdml/image/upload/v1764683481/aisabnqodcuu2ze8nbu7.png"
                    }
                    onLoad={(e) => {
                      extractColorFromImage(e.target as HTMLImageElement);
                    }}
                    alt="Uploaded mockup"
                    fill
                    className="object-contain"
                  />

                  <div className="absolute inset-0 z-10 opacity-0 hover:opacity-100 flex items-center justify-center transition-all duration-300 ease-in-out">
                    <UploadImage />
                  </div>

                  <Input
                    ref={mockupInputRef}
                    onChange={handleMockUpImageSelect}
                    accept="image/*"
                    type="file"
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* right bar */}
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
    </div>
  );
}
