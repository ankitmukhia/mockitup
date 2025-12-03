"use client";

import { Input } from "@/components/ui/input";
import { useMockupStore } from "@/stores/mockup-stores";
import { useEffect, useRef, useState } from "react";
import { Resolutions } from "../resolutions";
import {
  CurvedBorder,
  RoundedBorder,
  SharpBorder,
  UnplashIcon,
} from "@/assets/svg";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { HexColorPicker } from "react-colorful";
import Image from "next/image";
import { useDebounce } from "@/hooks/use-debounce";
import { searchAction, UnsplashPhoto } from "@/app/actions";
import { EXAMPLE_SEARCHES } from "@/lib/constants";

export const LeftSidebar = () => {
  const backgroundInputRef = useRef<HTMLInputElement>(null);
  const [hexColor, setHexColor] = useState("");
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [photos, setPhotos] = useState<Array<UnsplashPhoto>>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const searchDebounceQuery = useDebounce(searchQuery);

  // states
  const settings = useMockupStore.use.settings();
  const colorPalette = useMockupStore.use.colorPalette();
  const solidBackgroundColors = useMockupStore.use.solidBackgroundColors();

  // ations
  const setSettings = useMockupStore.use.setSettings();
  const setBackgroundImage = useMockupStore.use.setBackgroundImage();
  const setSolidBackgroundColor = useMockupStore.use.setSolidBackgroundColor();
  const setSolidBackgroundColors =
    useMockupStore.use.setSolidBackgroundColors();
  const setGradientBackgroundColor =
    useMockupStore.use.setGradientBackgroundColor();

  useEffect(() => {
    (async () => {
      if (!searchDebounceQuery.trim().length) return;

      const photos = await searchAction(searchDebounceQuery.trim(), 1);
      setPhotos(photos);
    })();
  }, [searchDebounceQuery]);

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

  const loadMore = async () => {
    const photos = await searchAction(searchDebounceQuery.trim(), page + 1);
    setPhotos((prev) => [...prev, ...photos]);
  };

  return (
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
                    setBackgroundImage(null);
                    setGradientBackgroundColor(null);
                    setSolidBackgroundColor(color.color);
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
                    setBackgroundImage(null);
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
                    setBackgroundImage(null);
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
              value={settings.canvasRadius}
              onChange={(e) =>
                setSettings("canvasRadius", Number(e.target.value))
              }
            />
          </div>

          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold">Noise</p>
            <Input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={settings.noiseOpacity}
              onChange={(e) =>
                setSettings("noiseOpacity", Number(e.target.value))
              }
            />
          </div>

          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold">Blur</p>
            <Input
              type="range"
              min={0}
              max={100}
              step={1}
              value={settings.blur}
              onChange={(e) => setSettings("blur", Number(e.target.value))}
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
                  color={solidBackgroundColors[0]}
                  onChange={setHexColor}
                />
                <Input
                  type="text"
                  value={solidBackgroundColors[0]}
                  onChange={(e) => setSolidBackgroundColors(e.target.value)}
                />
                <Button
                  onClick={() => {
                    setSolidBackgroundColors(hexColor.slice(1));
                    setPopoverOpen(false);
                  }}
                >
                  Add
                </Button>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex gap-1 flex-wrap">
            {solidBackgroundColors.map((color, index) => (
              <div
                key={index}
                onClick={() => {
                  setBackgroundImage(null);
                  setGradientBackgroundColor(null);
                  setSolidBackgroundColor(`#${color}`);
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
                          onClick={() => {
                            setBackgroundImage(photo.urls.regular);
                          }}
                          className="relative h-[60px] w-[60px] cursor-pointer"
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
  );
};
