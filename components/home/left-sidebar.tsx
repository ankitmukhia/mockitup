"use client";

import { Input } from "@/components/ui/input";
import { useMockupStore } from "@/stores/mockup-stores";
import { useEffect, useRef, useState } from "react";
import { Resolutions } from "../resolutions";
import {
  CurvedBorder,
  RoundedBorder,
  SharpBorder,
  TransparentIcon,
  UnplashIcon,
  ImageIcon,
} from "@/assets/svg";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverAnchor,
} from "@/components/ui/popover";
import { PlusIcon, ChevronDownIcon } from "lucide-react";
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
  SCREENS,
  SCREEN_PREVIEW,
  SHADOW_IMAGES,
  WALLPAPERS_IMAGES,
} from "@/lib/constants";
import { RangeInput } from "../ui/range-input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SparkleIcon, PalettePickerIcon } from "@/assets/svg";
import { RANGE_THUMB_SIZE } from "@/lib/constants";
import { cn } from "@/lib/utils";

type ScreenType =
  | "default"
  | "android"
  | "ipad"
  | "se"
  | "ultra"
  | "macbook-air"
  | "macbook-pro"
  | "iphone-17";

export const LeftSidebar = () => {
  const backgroundInputRef = useRef<HTMLInputElement>(null);
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("default");
  console.log("currentScreen: ", currentScreen);
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
  const [showAllShadows, setShowAllShadows] = useState(false);

  // states
  const settings = useMockupStore.use.settings();
  const colorPalette = useMockupStore.use.colorPalette();
  const solidBackgroundColors = useMockupStore.use.solidBackgroundColors();
  const mockupImage = useMockupStore.use.mockupImage();

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

  const [screensPopoverOpen, setScreensPopoverOpen] = useState(false);

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
      <Tabs defaultValue="effects">
        <TabsList className="flex flex-1 w-full">
          <TabsTrigger value="screens" className="border-none">
            <span>Screens</span>
          </TabsTrigger>
          <TabsTrigger value="effects" className="border-none">
            <span>Effects</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="screens" className="space-y-6">
          <Popover
            open={screensPopoverOpen}
            onOpenChange={setScreensPopoverOpen}
          >
            <PopoverTrigger className="flex items-center justify-between w-full bg-muted h-10 rounded-md px-2">
              {currentScreen === "default" ? (
                <div className="flex items-center gap-2">
                  <Image
                    src={mockupImage}
                    alt="mockup"
                    width={40}
                    height={40}
                    className="object-contain border"
                  />
                  <span className="text-sm">Default</span>
                </div>
              ) : (
                <div className="flex items-center">
                  {SCREEN_PREVIEW.filter((p) => p.type === currentScreen).map(
                    (preview) => (
                      <Image
                        key={preview.device}
                        src={preview.src}
                        alt={preview.device}
                        width={35}
                        height={35}
                        className="object-contain -ml-2"
                      />
                    )
                  )}
                  <span className="text-sm">
                    {
                      SCREEN_PREVIEW.find((p) => p.type === currentScreen)
                        ?.device
                    }
                  </span>
                </div>
              )}
              <ChevronDownIcon
                className={`size-4 text-muted-foreground/70 transition-transform duration-300 ease-in-out ${
                  screensPopoverOpen && "rotate-180"
                }`}
              />
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="w-[480px] h-140 space-y-6 overflow-y-auto no-scrollbar rounded-2xl"
            >
              <div className="space-y-3">
                {(() => {
                  const watches = SCREEN_PREVIEW.filter((p) =>
                    p.device.includes("Watch")
                  );
                  const macs = SCREEN_PREVIEW.filter((p) =>
                    p.device.includes("MacBook")
                  );
                  const iphones = SCREEN_PREVIEW.filter((p) =>
                    p.device.includes("iPhone")
                  );
                  const ipads = SCREEN_PREVIEW.filter((p) =>
                    p.device.includes("iPad")
                  );
                  const androids = SCREEN_PREVIEW.filter((p) =>
                    p.device.includes("Android")
                  );

                  return (
                    <>
                      {watches.length > 0 && (
                        <div className="space-y-2">
                          <h1 className="text-sm text-foreground/50">
                            Apple Watch
                          </h1>
                          <div
                            className={cn(`grid gap-2`, {
                              "grid-cols-2": watches.length > 1,
                              "grid-cols-1": watches.length === 1,
                            })}
                          >
                            {watches.map((preview) => (
                              <div
                                key={preview.device}
                                onClick={() => setCurrentScreen(preview.type)}
                                className={cn(
                                  "relative w-full h-40 rounded-2xl overflow-hidden cursor-pointer",
                                  {
                                    "w-1/2": watches.length === 1,
                                  }
                                )}
                              >
                                <div
                                  className="absolute inset-0"
                                  style={{
                                    backgroundImage: `url(${preview.src})`,
                                    backgroundPosition: "center",
                                    backgroundRepeat: "repeat",
                                  }}
                                />
                                <div className="absolute inset-0 backdrop-blur-2xl rounded-xl" />

                                <Image
                                  src={preview.src}
                                  alt={preview.device}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {iphones.length > 0 && (
                        <div className="space-y-2">
                          <h1 className="text-sm text-foreground/50">iPhone</h1>
                          <div
                            className={cn(`grid gap-2`, {
                              "grid-cols-2": iphones.length > 1,
                              "grid-cols-1": iphones.length === 1,
                            })}
                          >
                            {iphones.map((preview) => (
                              <div
                                key={preview.device}
                                onClick={() => setCurrentScreen(preview.type)}
                                className={cn(
                                  "relative flex-1 w-full h-40 rounded-2xl overflow-hidden cursor-pointer",
                                  {
                                    "w-1/2": iphones.length === 1,
                                  }
                                )}
                              >
                                <div
                                  className="absolute inset-0"
                                  style={{
                                    backgroundImage: `url(${preview.src})`,
                                    backgroundPosition: "center",
                                  }}
                                />
                                <div className="absolute inset-0 backdrop-blur-2xl rounded-xl" />

                                <Image
                                  src={preview.src}
                                  alt={preview.device}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {androids.length > 0 && (
                        <div className="space-y-2">
                          <h1 className="text-sm text-foreground/50">
                            Android
                          </h1>
                          <div
                            className={cn(`grid gap-2`, {
                              "grid-cols-2": androids.length > 1,
                              "grid-cols-1": androids.length === 1,
                            })}
                          >
                            {androids.map((preview) => (
                              <div
                                key={preview.device}
                                onClick={() => setCurrentScreen(preview.type)}
                                className={cn(
                                  `relative flex-1 w-full h-40 rounded-2xl overflow-hidden cursor-pointer`,
                                  {
                                    "w-1/2": androids.length === 1,
                                  }
                                )}
                              >
                                <div
                                  className="absolute inset-0"
                                  style={{
                                    backgroundImage: `url(${preview.src})`,
                                    backgroundPosition: "center",
                                  }}
                                />
                                <div className="absolute inset-0 backdrop-blur-2xl rounded-xl" />

                                <Image
                                  src={preview.src}
                                  alt={preview.device}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {ipads.length > 0 && (
                        <div className="space-y-2">
                          <h1 className="text-sm text-foreground/50">Tablet</h1>
                          <div
                            className={cn(`grid gap-2`, {
                              "grid-cols-2": ipads.length > 1,
                              "grid-cols-1": ipads.length === 1,
                            })}
                          >
                            {ipads.map((preview) => (
                              <div
                                key={preview.device}
                                onClick={() => setCurrentScreen(preview.type)}
                                className={cn(
                                  `relative flex-1 w-full h-40 rounded-2xl overflow-hidden cursor-pointer`,
                                  {
                                    "w-1/2": ipads.length === 1,
                                  }
                                )}
                              >
                                <div
                                  className="absolute inset-0"
                                  style={{
                                    backgroundImage: `url(${preview.src})`,
                                    backgroundPosition: "center",
                                  }}
                                />
                                <div className="absolute inset-0 backdrop-blur-2xl rounded-xl" />

                                <Image
                                  src={preview.src}
                                  alt={preview.device}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {macs.length > 0 && (
                        <div className="space-y-2">
                          <h1 className="text-sm text-foreground/50">
                            Macbook
                          </h1>
                          <div
                            className={cn(`grid gap-2`, {
                              "grid-cols-2": macs.length > 1,
                              "grid-cols-1": macs.length === 1,
                            })}
                          >
                            {macs.map((preview) => (
                              <div
                                key={preview.device}
                                onClick={() => setCurrentScreen(preview.type)}
                                className={cn(
                                  `relative flex-1 w-full h-40 rounded-2xl overflow-hidden cursor-pointer`,
                                  {
                                    "w-1/2": macs.length === 1,
                                  }
                                )}
                              >
                                <div
                                  className="absolute inset-0"
                                  style={{
                                    backgroundImage: `url(${preview.src})`,
                                    backgroundPosition: "center",
                                  }}
                                />
                                <div className="absolute inset-0 backdrop-blur-2xl rounded-xl" />

                                <Image
                                  src={preview.src}
                                  alt={preview.device}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            </PopoverContent>
          </Popover>

          <div className="space-y-2">
            <h1 className="text-sm text-foreground/50">STYLES</h1>
            <div className="grid grid-cols-3 gap-2">
              {SCREENS.filter((screen) => screen.type === currentScreen).map(
                (screen) => (
                  <div
                    key={screen.name}
                    className="relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform border border-border"
                  >
                    <Image
                      src={screen.src}
                      alt={screen.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                )
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="effects" className="space-y-6">
          <Resolutions />

          <div className="space-y-5">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium flex items-center gap-1">
                <SparkleIcon className="size-4" />
                Auto Palette
              </p>

              <div className="space-y-1">
                <div className="grid grid-cols-4 gap-1">
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

                <div className="grid grid-cols-4 gap-1">
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
                            setShowAllTwoColorGradients(
                              !showAllTwoColorGradients
                            )
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
                    colorPalette.twoColorGradients
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
                            backgroundImage: `linear-gradient(${gradient.angle}deg, ${gradient.first}, ${gradient.second})`,
                          }}
                        />
                      ))}
                </div>

                <div className="grid grid-cols-4 gap-1">
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
                            setShowAllThreeColorGradients(
                              !showAllThreeColorGradients
                            )
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
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="ml-1 text-xs text-sidebar-foreground/40 uppercase">
                Shadow
              </p>

              <div className="grid grid-cols-4 gap-1">
                {SHADOW_IMAGES.slice(0, 3).map((image) => (
                  <Image
                    key={image.name}
                    src={image.src}
                    alt={image.name}
                    width={50}
                    height={50}
                    className="w-full h-10 rounded-xl bg-foreground cursor-pointer hover:scale-110 transition-transform"
                  />
                ))}

                {SHADOW_IMAGES.length > 4 && (
                  <div className="relative">
                    {Array.from({ length: 2 }).map((_, index) => (
                      <div
                        key={index}
                        onClick={() => setShowAllShadows(!showAllShadows)}
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
                              showAllShadows && "rotate-180"
                            }`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {showAllShadows &&
                  SHADOW_IMAGES.slice(3).map((image) => (
                    <Image
                      key={image.name}
                      src={image.src}
                      alt={image.name}
                      width={50}
                      height={50}
                      className="w-full h-10 bg-foreground rounded-xl cursor-pointer hover:scale-110 transition-transform"
                    />
                  ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="ml-1 text-xs text-sidebar-foreground/40 uppercase">
                Border
              </p>

              <div className="flex gap-1.5 justify-between">
                {[SharpBorder, CurvedBorder, RoundedBorder].map(
                  (BorderComponent, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center bg-muted flex-1 p-2 rounded-lg h-12"
                    >
                      <div className="size-5">
                        <BorderComponent />
                      </div>
                    </div>
                  )
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <RangeInput
                  label="Border"
                  thumbSize={RANGE_THUMB_SIZE.SMALL}
                  fill
                  min={0}
                  max={100}
                  step={1}
                  value={settings.canvasRadius}
                  onChange={(e) =>
                    setSettings("canvasRadius", Number(e.target.value))
                  }
                />
                <RangeInput
                  label="Noise"
                  thumbSize={RANGE_THUMB_SIZE.SMALL}
                  fill
                  min={0}
                  max={100}
                  step={1}
                  value={settings.noiseOpacity}
                  onChange={(e) =>
                    setSettings("noiseOpacity", Number(e.target.value))
                  }
                />

                <RangeInput
                  label="Blur"
                  thumbSize={RANGE_THUMB_SIZE.SMALL}
                  fill
                  min={0}
                  max={100}
                  step={1}
                  value={settings.blur}
                  onChange={(e) => setSettings("blur", Number(e.target.value))}
                />
              </div>
            </div>

            <div className="flex items-center gap-1">
              <div className="flex flex-1 items-center justify-center gap-2 bg-muted p-2 rounded-lg cursor-pointer">
                <TransparentIcon className="size-6" />
              </div>

              <div className="flex flex-1 items-center justify-center gap-2 bg-muted p-2 rounded-lg cursor-pointer">
                <PalettePickerIcon className="size-6" />
              </div>
              <div
                onClick={() => {
                  if (backgroundInputRef.current) {
                    backgroundInputRef.current.click();
                  }
                }}
                className="flex flex-1 items-center justify-center gap-2 bg-muted p-2 rounded-lg cursor-pointer"
              >
                <Input
                  ref={backgroundInputRef}
                  onChange={handleBackgroundSelect}
                  accept="image/*"
                  type="file"
                  className="hidden"
                />
                <ImageIcon className="size-6" />
              </div>
              <Popover>
                <PopoverTrigger>
                  <div className="flex flex-1 items-center justify-center gap-2 bg-muted p-2 rounded-lg cursor-pointer">
                    <UnplashIcon className="size-6" />
                  </div>
                </PopoverTrigger>
                <PopoverAnchor className="absolute right-0" />
                <PopoverContent
                  side="right"
                  align="center"
                  className="w-72 h-[42vh] p-2 overflow-y-auto no-scrollbar rounded-xl"
                >
                  <div className="relative flex flex-col gap-2 h-full w-full">
                    <Input
                      type="text"
                      name="searchQuery"
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..."
                      className="rounded-lg"
                    />

                    {photos.length > 0 ? (
                      <div className="grid grid-cols-3 gap-1.5">
                        {photos.map((photo, index) => (
                          <div
                            key={index}
                            onClick={() => {
                              setBackgroundImage(photo.urls.regular);
                            }}
                            className="relative w-full h-16 cursor-pointer rounded-lg overflow-hidden"
                          >
                            <Image
                              src={photo.urls.small}
                              alt={photo.alt_description || "Unsplash photo"}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col justify-center w-full h-full">
                        <div className="flex flex-wrap gap-1 justify-center">
                          {EXAMPLE_SEARCHES.map((search, index) => (
                            <Button key={index}>{search}</Button>
                          ))}
                        </div>
                      </div>
                    )}

                    {photos.length > 0 && (
                      <Button variant="secondary" onClick={loadMore}>
                        Load More
                      </Button>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="ml-1 text-xs text-sidebar-foreground/40 uppercase">
                  Solid
                </p>

                <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                  <PopoverTrigger asChild>
                    <PlusIcon className="size-4 hover:text-sidebar-foreground text-sidebar-foreground/70 transition-colors mr-1" />
                  </PopoverTrigger>
                  <PopoverAnchor className="absolute right-0" />
                  <PopoverContent
                    side="right"
                    align="center"
                    className="w-fit flex flex-col gap-2 p-1"
                  >
                    <HexColorPicker
                      style={{ width: "100%" }}
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
                    className="w-full h-10 rounded-xl cursor-pointer hover:scale-110 transition-transform"
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
                        onClick={() =>
                          setShowAllSolidColors(!showAllSolidColors)
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
                      className="w-full h-10 rounded-xl cursor-pointer hover:scale-110 transition-transform"
                      style={{
                        backgroundColor: `#${color}`,
                      }}
                    />
                  ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="ml-1 text-xs text-sidebar-foreground/40 uppercase">
                Gradient
              </p>

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
            </div>

            <div className="flex flex-col gap-2">
              <p className="ml-1 text-xs text-sidebar-foreground/40 uppercase">
                Cosmic
              </p>
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
            </div>

            <div className="flex flex-col gap-2">
              <p className="ml-1 text-xs text-sidebar-foreground/40 uppercase">
                Mystic
              </p>
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
            </div>

            <div className="flex flex-col gap-2">
              <p className="ml-1 text-xs text-sidebar-foreground/40 uppercase">
                Glass
              </p>
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
            </div>

            <div className="flex flex-col gap-2">
              <p className="ml-1 text-xs text-sidebar-foreground/40 uppercase">
                Wallpaper
              </p>
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
            </div>

            <div className="flex flex-col gap-2">
              <p className="ml-1 text-xs text-sidebar-foreground/40 uppercase">
                Abstracts
              </p>
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
            </div>

            <div className="flex flex-col gap-2">
              <p className="ml-1 text-xs text-sidebar-foreground/40 uppercase">
                Kawaii
              </p>
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
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
