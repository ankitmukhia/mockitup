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
  UploadImage,
} from "@/assets/svg";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverAnchor,
} from "@/components/ui/popover";
import { PlusIcon, ChevronDownIcon, PaintBucketIcon } from "lucide-react";
import { Button } from "../ui/button";
import { HexColorPicker } from "react-colorful";
import Image from "next/image";
import { useDebounce } from "@/hooks/use-debounce";
import { searchAction, UnsplashPhoto } from "@/app/actions";
import {
  ABSTRACT_IMAGES,
  COSMIC_GRADIENTS_IMAGES,
  EXAMPLE_SEARCHES,
  GLASS_IMAGES,
  GRADIENTS_COLORS,
  KAWAII_IMAGES,
  MYSTIC_GRADIENTS_IMAGES,
  WALLPAPERS_IMAGES,
} from "@/lib/constants";
import { RangeInput } from "../ui/range-input";
import { cn } from "@/lib/utils";

export const LeftSidebar = () => {
  const backgroundInputRef = useRef<HTMLInputElement>(null);
  const [hexColor, setHexColor] = useState("");
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [photos, setPhotos] = useState<Array<UnsplashPhoto>>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const searchDebounceQuery = useDebounce(searchQuery);
  const [showAllSingles, setShowAllSingles] = useState(false);
  const [showAllTwoColorGradients, setShowAllTwoColorGradients] =
    useState(false);
  const [showAllThreeColorGradients, setShowAllThreeColorGradients] =
    useState(false);
  const [showAllSolidColors, setShowAllSolidColors] = useState(false);
  const [showAllGradients, setShowAllGradients] = useState(false);
  const [showAllCosmicGradients, setShowAllCosmicGradients] = useState(false);
  const [showAllMysticGradients, setShowAllMysticGradients] = useState(false);
  const [showAllWallpapers, setShowAllWallpapers] = useState(false);
  const [showAllAbstracts, setShowAllAbstracts] = useState(false);
  const [showAllGlass, setShowAllGlass] = useState(false);
  const [showAllKawaii, setShowAllKawaii] = useState(false);

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
    <div className="relative min-w-[200px] max-w-[200px] bg-sidebar p-2 rounded-xl overflow-y-auto no-scrollbar">
      <div className="space-y-4">
        <Resolutions />

        <div className="space-y-2">
          <div className="grid grid-cols-4 gap-1.5">
            {colorPalette?.singles?.length > 0 &&
              colorPalette.singles.slice(0, 3).map((color, index) => (
                <div
                  onClick={() => {
                    setBackgroundImage(null);
                    setGradientBackgroundColor(null);
                    setSolidBackgroundColor(color.color);
                  }}
                  key={index}
                  className="w-full h-10 rounded-xl cursor-pointer"
                  style={{
                    backgroundColor: color.color,
                  }}
                />
              ))}

            {colorPalette?.singles?.length > 3 && (
              <div className="relative">
                {Array.from({ length: 2 }).map((_, index) => (
                  <div
                    key={index}
                    onClick={() => setShowAllSingles(!showAllSingles)}
                    className={cn(
                      "absolute w-full h-10 rotate-5 opacity-50 rounded-xl cursor-pointer bg-sidebar-border/70 flex items-center justify-center",
                      {
                        "rotate-30": index === 0,
                      }
                    )}
                  >
                    {index === 1 && (
                      <ChevronDownIcon
                        className={`size-5 text-muted-foreground/70 transition-transform duration-300 ease-in-out ${
                          showAllSingles && "rotate-180"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {showAllSingles &&
              colorPalette?.singles?.length > 3 &&
              colorPalette.singles.slice(3).map((color, index) => (
                <div
                  onClick={() => {
                    setBackgroundImage(null);
                    setGradientBackgroundColor(null);
                    setSolidBackgroundColor(color.color);
                  }}
                  key={index + 3}
                  className="w-full h-10 rounded-xl cursor-pointer"
                  style={{
                    backgroundColor: color.color,
                  }}
                />
              ))}
          </div>

          <div className="grid grid-cols-4 gap-1.5">
            {colorPalette?.twoColorGradients?.length > 0 &&
              colorPalette.twoColorGradients
                .slice(0, 3)
                .map((gradient, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setBackgroundImage(null);
                      setGradientBackgroundColor(gradient);
                    }}
                    className="w-full h-10 rounded-xl cursor-pointer hover:scale-110 transition-transform"
                    style={{
                      backgroundImage: `linear-gradient(${gradient.angle}deg, ${gradient.first}, ${gradient.second})`,
                    }}
                  />
                ))}

            {colorPalette?.twoColorGradients?.length > 3 && (
              <div className="relative">
                {Array.from({ length: 2 }).map((_, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      setShowAllTwoColorGradients(!showAllTwoColorGradients)
                    }
                    className={cn(
                      "absolute w-full h-10 rotate-5 opacity-50 rounded-xl cursor-pointer bg-sidebar-border/70 flex items-center justify-center",
                      {
                        "rotate-30": index === 0,
                      }
                    )}
                  >
                    {index === 1 && (
                      <ChevronDownIcon
                        className={`size-5 text-muted-foreground/70 transition-transform duration-300 ease-in-out ${
                          showAllTwoColorGradients && "rotate-180"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {showAllTwoColorGradients &&
              colorPalette?.twoColorGradients?.length > 3 &&
              colorPalette.twoColorGradients.slice(3).map((gradient, index) => (
                <div
                  key={index + 3}
                  onClick={() => {
                    setBackgroundImage(null);
                    setGradientBackgroundColor(gradient);
                  }}
                  className="w-full h-10 rounded-xl cursor-pointer hover:scale-110 transition-transform"
                  style={{
                    backgroundImage: `linear-gradient(${gradient.angle}deg, ${gradient.first}, ${gradient.second})`,
                  }}
                />
              ))}
          </div>

          <div className="grid grid-cols-4 gap-1.5">
            {colorPalette?.threeColorGradients?.length > 0 &&
              colorPalette.threeColorGradients
                .slice(0, 3)
                .map((gradient, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setBackgroundImage(null);
                      setGradientBackgroundColor(gradient);
                    }}
                    className="w-full h-10 rounded-xl cursor-pointer hover:scale-110 transition-transform"
                    style={{
                      backgroundImage: `linear-gradient(${gradient.angle}deg, ${gradient.first}, ${gradient.second}, ${gradient.third})`,
                    }}
                  />
                ))}

            {colorPalette?.threeColorGradients?.length > 3 && (
              <div className="relative">
                {Array.from({ length: 2 }).map((_, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      setShowAllThreeColorGradients(!showAllThreeColorGradients)
                    }
                    className={cn(
                      "absolute w-full h-10 rotate-5 opacity-50 rounded-xl cursor-pointer bg-sidebar-border/70 flex items-center justify-center",
                      {
                        "rotate-30": index === 0,
                      }
                    )}
                  >
                    {index === 1 && (
                      <ChevronDownIcon
                        className={`size-5 text-muted-foreground/70 transition-transform duration-300 ease-in-out ${
                          showAllThreeColorGradients && "rotate-180"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {showAllThreeColorGradients &&
              colorPalette?.threeColorGradients?.length > 3 &&
              colorPalette.threeColorGradients
                .slice(3)
                .map((gradient, index) => (
                  <div
                    key={index + 3}
                    onClick={() => {
                      setBackgroundImage(null);
                      setGradientBackgroundColor(gradient);
                    }}
                    className="w-full h-10 rounded-xl cursor-pointer hover:scale-110 transition-transform"
                    style={{
                      backgroundImage: `linear-gradient(${gradient.angle}deg, ${gradient.first}, ${gradient.second}, ${gradient.third})`,
                    }}
                  />
                ))}
          </div>

          <h1>Shadow Shenes</h1>

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
            <RangeInput
              fill
              min={0}
              max={100}
              step={1}
              value={settings.canvasRadius}
              onChange={(e) =>
                setSettings("canvasRadius", Number(e.target.value))
              }
            />
          </div>

          <div className="flex items-center justify-between gap-2 mt-2">
            <p className="text-sm font-semibold">Noise</p>
            <RangeInput
              fill
              min={0}
              max={100}
              step={1}
              value={settings.noiseOpacity}
              onChange={(e) =>
                setSettings("noiseOpacity", Number(e.target.value))
              }
            />
          </div>

          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold">Blur</p>
            <RangeInput
              fill
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
              <PopoverAnchor className="absolute right-0" />
              <PopoverContent
                side="right"
                align="center"
                className="p-1 w-fit flex flex-col gap-2"
              >
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
          <div className="grid grid-cols-4 gap-1">
            {solidBackgroundColors.slice(0, 3).map((color, index) => (
              <div
                key={index}
                onClick={() => {
                  setBackgroundImage(null);
                  setGradientBackgroundColor(null);
                  setSolidBackgroundColor(`#${color}`);
                }}
                className="w-full h-[36px] rounded-xl cursor-pointer hover:scale-110 transition-transform"
                style={{
                  backgroundColor: `#${color}`,
                }}
              />
            ))}

            {solidBackgroundColors.slice(3).length > 3 && (
              <div className="relative">
                {Array.from({ length: 2 }).map((_, index) => (
                  <div
                    key={index}
                    onClick={() => setShowAllSolidColors(!showAllSolidColors)}
                    className={cn(
                      "absolute w-full h-10 rotate-5 opacity-50 rounded-xl cursor-pointer bg-sidebar-border/70 flex items-center justify-center",
                      {
                        "rotate-30": index === 0,
                      }
                    )}
                  >
                    {index === 1 && (
                      <ChevronDownIcon
                        className={`size-5 text-muted-foreground/70 transition-transform duration-300 ease-in-out ${
                          showAllSolidColors && "rotate-180"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {showAllSolidColors &&
              solidBackgroundColors.slice(3).map((color, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setBackgroundImage(null);
                    setGradientBackgroundColor(null);
                    setSolidBackgroundColor(`#${color}`);
                  }}
                  className="w-full h-[36px] rounded-xl cursor-pointer hover:scale-110 transition-transform"
                  style={{
                    backgroundColor: `#${color}`,
                  }}
                />
              ))}
          </div>

          <h2 className="text-sm font-semibold">Gradients</h2>
          <div className="grid grid-cols-4 gap-1">
            {GRADIENTS_COLORS.slice(0, 3).map((gradient, index) => (
              <div
                key={index}
                className="w-full h-10 rounded-xl cursor-pointer hover:scale-110 transition-transform"
                style={{
                  background: gradient,
                }}
              />
            ))}

            {GRADIENTS_COLORS.slice(3).length > 3 && (
              <div className="relative">
                {Array.from({ length: 2 }).map((_, index) => (
                  <div
                    key={index}
                    onClick={() => setShowAllGradients(!showAllGradients)}
                    className={cn(
                      "absolute w-full h-10 rotate-5 opacity-50 rounded-xl cursor-pointer bg-sidebar-border/70 flex items-center justify-center",
                      {
                        "rotate-30": index === 0,
                      }
                    )}
                  >
                    {index === 1 && (
                      <ChevronDownIcon
                        className={`size-5 text-muted-foreground/70 transition-transform duration-300 ease-in-out ${
                          showAllGradients && "rotate-180"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {showAllGradients &&
              GRADIENTS_COLORS.slice(3).map((gradient, index) => (
                <div
                  key={index}
                  className="w-full h-10 rounded-xl cursor-pointer hover:scale-110 transition-transform"
                  style={{
                    background: gradient,
                  }}
                />
              ))}
          </div>

          <h2 className="text-sm font-semibold">Cosmic Gradients</h2>
          <div className="grid grid-cols-4 gap-1">
            {COSMIC_GRADIENTS_IMAGES.slice(0, 3).map((image, index) => (
              <Image
                key={index}
                src={image.src}
                alt={image.name}
                width={100}
                height={100}
                className="w-full h-10 rounded-xl cursor-pointer hover:scale-110 transition-transform"
              />
            ))}

            {COSMIC_GRADIENTS_IMAGES.slice(3).length > 3 && (
              <div className="relative">
                {Array.from({ length: 2 }).map((_, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      setShowAllCosmicGradients(!showAllCosmicGradients)
                    }
                    className={cn(
                      "absolute w-full h-10 rotate-5 opacity-50 rounded-xl cursor-pointer bg-sidebar-border/70 flex items-center justify-center",
                      {
                        "rotate-30": index === 0,
                      }
                    )}
                  >
                    {index === 1 && (
                      <ChevronDownIcon
                        className={`size-5 text-muted-foreground/70 transition-transform duration-300 ease-in-out ${
                          showAllCosmicGradients && "rotate-180"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {showAllCosmicGradients &&
              COSMIC_GRADIENTS_IMAGES.slice(3).map((image, index) => (
                <Image
                  key={index}
                  src={image.src}
                  alt={image.name}
                  width={100}
                  height={100}
                  className="w-full h-10 rounded-xl cursor-pointer hover:scale-110 transition-transform"
                />
              ))}
          </div>

          <h2 className="text-sm font-semibold">Mystic Gradients</h2>
          <div className="grid grid-cols-4 gap-1">
            {MYSTIC_GRADIENTS_IMAGES.slice(0, 3).map((image, index) => (
              <Image
                key={index}
                src={image.src}
                alt={image.name}
                width={100}
                height={100}
                className="w-full h-10 rounded-xl cursor-pointer hover:scale-110 transition-transform"
              />
            ))}

            {MYSTIC_GRADIENTS_IMAGES.slice(3).length >= 3 && (
              <div className="relative">
                {Array.from({ length: 2 }).map((_, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      setShowAllMysticGradients(!showAllMysticGradients)
                    }
                    className={cn(
                      "absolute w-full h-10 rotate-5 opacity-50 rounded-xl cursor-pointer bg-sidebar-border/70 flex items-center justify-center",
                      {
                        "rotate-30": index === 0,
                      }
                    )}
                  >
                    {index === 1 && (
                      <ChevronDownIcon
                        className={`size-5 text-muted-foreground/70 transition-transform duration-300 ease-in-out ${
                          showAllMysticGradients && "rotate-180"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {showAllMysticGradients &&
              MYSTIC_GRADIENTS_IMAGES.slice(3).map((image, index) => (
                <Image
                  key={index}
                  src={image.src}
                  alt={image.name}
                  width={100}
                  height={100}
                  className="w-full h-10 rounded-xl cursor-pointer hover:scale-110 transition-transform"
                />
              ))}
          </div>

          <h1 className="text-sm font-semibold">Glass</h1>
          <div className="grid grid-cols-4 gap-1">
            {GLASS_IMAGES.slice(0, 3).map((image, index) => (
              <Image
                key={index}
                src={image.src}
                alt={image.name}
                width={100}
                height={100}
                className="w-full h-10 rounded-xl cursor-pointer hover:scale-110 transition-transform"
              />
            ))}

            {GLASS_IMAGES.slice(3).length >= 3 && (
              <div className="relative">
                {Array.from({ length: 2 }).map((_, index) => (
                  <div
                    key={index}
                    onClick={() => setShowAllGlass(!showAllGlass)}
                    className={cn(
                      "absolute w-full h-10 rotate-5 opacity-50 rounded-xl cursor-pointer bg-sidebar-border/70 flex items-center justify-center",
                      {
                        "rotate-30": index === 0,
                      }
                    )}
                  >
                    {index === 1 && (
                      <ChevronDownIcon
                        className={`size-5 text-muted-foreground/70 transition-transform duration-300 ease-in-out ${
                          showAllGlass && "rotate-180"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {showAllGlass &&
              GLASS_IMAGES.slice(3).map((image, index) => (
                <Image
                  key={index}
                  src={image.src}
                  alt={image.name}
                  width={100}
                  height={100}
                  className="w-full h-10 rounded-xl cursor-pointer hover:scale-110 transition-transform"
                />
              ))}
          </div>

          <h1 className="text-sm font-semibold">Wallpapers</h1>
          <div className="grid grid-cols-4 gap-1">
            {WALLPAPERS_IMAGES.slice(0, 3).map((image, index) => (
              <Image
                key={index}
                src={image.src}
                alt={image.name}
                width={100}
                height={100}
                className="w-full h-10 rounded-xl cursor-pointer hover:scale-110 transition-transform"
              />
            ))}

            {WALLPAPERS_IMAGES.slice(3).length >= 3 && (
              <div className="relative">
                {Array.from({ length: 2 }).map((_, index) => (
                  <div
                    key={index}
                    onClick={() => setShowAllWallpapers(!showAllWallpapers)}
                    className={cn(
                      "absolute w-full h-10 rotate-5 opacity-50 rounded-xl cursor-pointer bg-sidebar-border/70 flex items-center justify-center",
                      {
                        "rotate-30": index === 0,
                      }
                    )}
                  >
                    {index === 1 && (
                      <ChevronDownIcon
                        className={`size-5 text-muted-foreground/70 transition-transform duration-300 ease-in-out ${
                          showAllWallpapers && "rotate-180"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {showAllWallpapers &&
              WALLPAPERS_IMAGES.slice(3).map((image, index) => (
                <Image
                  key={index}
                  src={image.src}
                  alt={image.name}
                  width={100}
                  height={100}
                  className="w-full h-10 rounded-xl cursor-pointer hover:scale-110 transition-transform"
                />
              ))}
          </div>

          <h1 className="text-sm font-semibold">Abstracts</h1>
          <div className="grid grid-cols-4 gap-1">
            {ABSTRACT_IMAGES.slice(0, 3).map((image, index) => (
              <Image
                key={index}
                src={image.src}
                alt={image.name}
                width={100}
                height={100}
                className="w-full h-10 rounded-xl cursor-pointer hover:scale-110 transition-transform"
              />
            ))}

            {ABSTRACT_IMAGES.slice(3).length >= 3 && (
              <div className="relative">
                {Array.from({ length: 2 }).map((_, index) => (
                  <div
                    key={index}
                    onClick={() => setShowAllAbstracts(!showAllAbstracts)}
                    className={cn(
                      "absolute w-full h-10 rotate-5 opacity-50 rounded-xl cursor-pointer bg-sidebar-border/70 flex items-center justify-center",
                      {
                        "rotate-30": index === 0,
                      }
                    )}
                  >
                    {index === 1 && (
                      <ChevronDownIcon
                        className={`size-5 text-muted-foreground/70 transition-transform duration-300 ease-in-out ${
                          showAllAbstracts && "rotate-180"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {showAllAbstracts &&
              ABSTRACT_IMAGES.slice(3).map((image, index) => (
                <Image
                  key={index}
                  src={image.src}
                  alt={image.name}
                  width={100}
                  height={100}
                  className="w-full h-10 rounded-xl cursor-pointer hover:scale-110 transition-transform"
                />
              ))}
          </div>

          <h1 className="text-sm font-semibold">Kawaii</h1>
          <div className="grid grid-cols-4 gap-1">
            {KAWAII_IMAGES.slice(0, 3).map((image, index) => (
              <Image
                key={index}
                src={image.src}
                alt={image.name}
                width={100}
                height={100}
                className="w-full h-10 rounded-xl cursor-pointer hover:scale-110 transition-transform"
              />
            ))}

            {KAWAII_IMAGES.slice(3).length >= 3 && (
              <div className="relative">
                {Array.from({ length: 2 }).map((_, index) => (
                  <div
                    key={index}
                    onClick={() => setShowAllKawaii(!showAllKawaii)}
                    className={cn(
                      "absolute w-full h-10 rotate-5 opacity-50 rounded-xl cursor-pointer bg-sidebar-border/70 flex items-center justify-center",
                      {
                        "rotate-30": index === 0,
                      }
                    )}
                  >
                    {index === 1 && (
                      <ChevronDownIcon
                        className={`size-5 text-muted-foreground/70 transition-transform duration-300 ease-in-out ${
                          showAllKawaii && "rotate-180"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {showAllKawaii &&
              KAWAII_IMAGES.slice(3).map((image, index) => (
                <Image
                  key={index}
                  src={image.src}
                  alt={image.name}
                  width={100}
                  height={100}
                  className="w-full h-10 rounded-xl cursor-pointer hover:scale-110 transition-transform"
                />
              ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-muted p-2 rounded-md cursor-pointer">
            <PaintBucketIcon className="size-6" />
          </div>
          <div
            onClick={() => {
              if (backgroundInputRef.current) {
                backgroundInputRef.current.click();
              }
            }}
            className="flex items-center gap-2 bg-muted p-2 rounded-md cursor-pointer"
          >
            <Input
              ref={backgroundInputRef}
              onChange={handleBackgroundSelect}
              accept="image/*"
              type="file"
              className="hidden"
            />
            <UploadImage />
          </div>
          <Popover>
            <PopoverTrigger>
              <div className="w-10 h-10 bg-muted p-2 rounded-lg">
                <UnplashIcon />
              </div>
            </PopoverTrigger>
            <PopoverAnchor className="absolute right-0" />
            <PopoverContent
              side="right"
              align="center"
              className="w-70 h-90 p-2"
            >
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
