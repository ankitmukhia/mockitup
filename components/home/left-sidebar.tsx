"use client";

import { Input } from "@/components/ui/input";
import {
  ImageSettingType,
  ImageStackType,
  useMockupStore,
} from "@/stores/mockup-stores";
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
import {
  PlusIcon,
  ChevronDownIcon,
  SearchIcon,
  EqualIcon,
  EqualNotIcon,
} from "lucide-react";
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
  const [showAllShadows, setShowAllShadows] = useState(false);

  // Local state for color picker to avoid lag
  const [localBgColor, setLocalBgColor] = useState<string | null>(null);
  const [localStyleColor, setLocalStyleColor] = useState<string>("");

  // states
  const currentScreen = useMockupStore.use.currentScreen();
  const settings = useMockupStore.use.settings();
  const colorPalette = useMockupStore.use.colorPalette();
  console.log("color  palete: ", colorPalette);
  const solidBackgroundColor = useMockupStore.use.solidBackgroundColor();
  const solidBackgroundColors = useMockupStore.use.solidBackgroundColors();
  const mockupImage = useMockupStore.use.mockupImage();
  const imageSettings = useMockupStore.use.imageSettings();
  const imageSettingsColor = useMockupStore.use.imageSettingsColor();
  const borderRadius = useMockupStore.use.borderRadius();
  const concentricBorderRadius = useMockupStore.use.concentricBorderRadius();
  const imageShadow = useMockupStore.use.imageShadow();
  const imageStack = useMockupStore.use.imageStack();

  // ations
  const setCurrentScreen = useMockupStore.use.setCurrentScreen();
  const setSettings = useMockupStore.use.setSettings();
  const setBackgroundImage = useMockupStore.use.setBackgroundImage();
  const setSolidBackgroundColor = useMockupStore.use.setSolidBackgroundColor();
  const setSolidBackgroundColors =
    useMockupStore.use.setSolidBackgroundColors();
  const setGradientBackgroundColor =
    useMockupStore.use.setGradientBackgroundColor();
  const setShadowOverlay = useMockupStore.use.setShadowOverlay();
  const setRotationX = useMockupStore.use.setRotationX();
  const setRotationY = useMockupStore.use.setRotationY();
  const setRotationZ = useMockupStore.use.setRotationZ();
  const setImageSettings = useMockupStore.use.setImageSettings();
  const updateImageSettingsColor =
    useMockupStore.use.updateImageSettingsColor();
  const setBorderRadius = useMockupStore.use.setBorderRadius();
  const setConcentricBorderRadius =
    useMockupStore.use.setConcentricBorderRadius();
  const setImageShadow = useMockupStore.use.setImageShadow();
  const setImageStack = useMockupStore.use.setImageStack();

  // Tracking previous values for derived state pattern
  const [prevSolidBackgroundColor, setPrevSolidBackgroundColor] =
    useState(solidBackgroundColor);
  const [prevImageSettingsColor, setPrevImageSettingsColor] =
    useState(imageSettingsColor);

  if (solidBackgroundColor !== prevSolidBackgroundColor) {
    setPrevSolidBackgroundColor(solidBackgroundColor);
    setLocalBgColor(solidBackgroundColor);
  }

  if (imageSettingsColor !== prevImageSettingsColor) {
    setPrevImageSettingsColor(imageSettingsColor);
    setLocalStyleColor(imageSettingsColor);
  }

  const debouncedLocalColor = useDebounce(localBgColor, 300);
  const debouncedLocalStyleColor = useDebounce(localStyleColor, 300);
  useEffect(() => {
    const validLengths = [4, 5, 7, 9];
    if (
      debouncedLocalColor &&
      validLengths.includes(debouncedLocalColor.length)
    ) {
      setBackgroundImage(null);
      setGradientBackgroundColor(null);
      setSolidBackgroundColor(debouncedLocalColor);
    }

    if (
      debouncedLocalStyleColor &&
      validLengths.includes(debouncedLocalStyleColor.length)
    ) {
      updateImageSettingsColor(debouncedLocalStyleColor);
    }
  }, [
    debouncedLocalColor,
    debouncedLocalStyleColor,
    setBackgroundImage,
    setGradientBackgroundColor,
    setSolidBackgroundColor,
    updateImageSettingsColor,
  ]);

  useEffect(() => {
    (async () => {
      if (!searchDebounceQuery.trim().length) return;

      const photos = await searchAction(searchDebounceQuery.trim(), 1);
      setPhotos(photos);
    })();
  }, [searchDebounceQuery]);

  const [screensPopoverOpen, setScreensPopoverOpen] = useState(false);

  const handleBackgroundSelect = (
    event: React.ChangeEvent<HTMLInputElement>,
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
    setPage((prev) => prev + 1);
  };

  return (
    <div className="relative min-w-[200px] max-w-[200px] h-full bg-sidebar p-2 rounded-xl overflow-y-auto no-scrollbar">
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
            <PopoverTrigger className="flex items-center justify-between w-full bg-muted h-10 rounded-lg px-2">
              {currentScreen.type === "default" ? (
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
                  {SCREEN_PREVIEW.filter(
                    (p) => p.type === currentScreen.type,
                  ).map((preview) => (
                    <Image
                      key={preview.device}
                      src={preview.src}
                      alt={preview.device}
                      width={35}
                      height={35}
                      className="object-contain -ml-2"
                    />
                  ))}
                  <span className="text-sm">
                    {
                      SCREEN_PREVIEW.find((p) => p.type === currentScreen.type)
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
                    p.device.includes("Watch"),
                  );
                  const macs = SCREEN_PREVIEW.filter((p) =>
                    p.device.includes("MacBook"),
                  );
                  const iphones = SCREEN_PREVIEW.filter((p) =>
                    p.device.includes("iPhone"),
                  );
                  const ipads = SCREEN_PREVIEW.filter((p) =>
                    p.device.includes("iPad"),
                  );
                  const androids = SCREEN_PREVIEW.filter((p) =>
                    p.device.includes("Android"),
                  );

                  return (
                    <>
                      <div className="space-y-2">
                        <h1 className="ml-0.5 text-sm text-sidebar-foreground/40">
                          Default
                        </h1>
                        <div className="grid grid-cols-2 gap-2">
                          <div
                            onClick={() => {
                              setRotationX(0);
                              setRotationY(0);
                              setRotationZ(0);
                              setCurrentScreen({
                                type: "default",
                                variant: "default",
                              });
                            }}
                            className="relative w-full h-40 rounded-2xl overflow-hidden cursor-pointer"
                          >
                            <Image
                              src={mockupImage}
                              alt="mockup"
                              fill
                              className="object-center"
                            />
                          </div>
                        </div>
                      </div>
                      {watches.length > 0 && (
                        <div className="space-y-2">
                          <h1 className="ml-0.5 text-sm text-sidebar-foreground/40">
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
                                onClick={() => {
                                  setRotationX(0);
                                  setRotationY(0);
                                  setRotationZ(0);
                                  setCurrentScreen({
                                    type: preview.type,
                                    variant: preview.defaultVariant,
                                  });
                                }}
                                className={cn(
                                  "relative w-full h-40 rounded-2xl overflow-hidden cursor-pointer",
                                  {
                                    "w-1/2": watches.length === 1,
                                  },
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
                          <h1 className="ml-0.5 text-sm text-sidebar-foreground/40">
                            iPhone
                          </h1>
                          <div
                            className={cn(`grid gap-2`, {
                              "grid-cols-2": iphones.length > 1,
                              "grid-cols-1": iphones.length === 1,
                            })}
                          >
                            {iphones.map((preview) => (
                              <div
                                key={preview.device}
                                onClick={() => {
                                  setRotationX(0);
                                  setRotationY(0);
                                  setRotationZ(0);
                                  setCurrentScreen({
                                    type: preview.type,
                                    variant: preview.defaultVariant,
                                  });
                                }}
                                className={cn(
                                  "relative flex-1 w-full h-40 rounded-2xl overflow-hidden cursor-pointer",
                                  {
                                    "w-1/2": iphones.length === 1,
                                  },
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
                          <h1 className="ml-0.5 text-sm text-sidebar-foreground/40">
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
                                onClick={() => {
                                  setRotationX(0);
                                  setRotationY(0);
                                  setRotationZ(0);
                                  setCurrentScreen({
                                    type: preview.type,
                                    variant: preview.defaultVariant,
                                  });
                                }}
                                className={cn(
                                  `relative flex-1 w-full h-40 rounded-2xl overflow-hidden cursor-pointer`,
                                  {
                                    "w-1/2": androids.length === 1,
                                  },
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
                          <h1 className="ml-0.5 text-sm text-sidebar-foreground/40">
                            Tablet
                          </h1>
                          <div
                            className={cn(`grid gap-2`, {
                              "grid-cols-2": ipads.length > 1,
                              "grid-cols-1": ipads.length === 1,
                            })}
                          >
                            {ipads.map((preview) => (
                              <div
                                key={preview.device}
                                onClick={() => {
                                  setRotationX(0);
                                  setRotationY(0);
                                  setRotationZ(0);
                                  setCurrentScreen({
                                    type: preview.type,
                                    variant: preview.defaultVariant,
                                  });
                                }}
                                className={cn(
                                  `relative flex-1 w-full h-40 rounded-2xl overflow-hidden cursor-pointer`,
                                  {
                                    "w-1/2": ipads.length === 1,
                                  },
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
                          <h1 className="ml-0.5 text-sm text-sidebar-foreground/40">
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
                                onClick={() => {
                                  setRotationX(0);
                                  setRotationY(0);
                                  setRotationZ(0);
                                  setCurrentScreen({
                                    type: preview.type,
                                    variant: preview.defaultVariant,
                                  });
                                }}
                                className={cn(
                                  `relative flex-1 w-full h-40 rounded-2xl overflow-hidden cursor-pointer`,
                                  {
                                    "w-1/2": macs.length === 1,
                                  },
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
            <p className="text-xs text-sidebar-foreground/40 uppercase">
              Style
            </p>

            <div className="grid grid-cols-3 gap-1.5">
              {(() => {
                const filteredScreens = SCREENS.filter(
                  (p) => p.type === currentScreen.type,
                );

                if (filteredScreens.length === 0) {
                  return (
                    <>
                      {Array.from(["None", "Border", "Glass", "Outline"]).map(
                        (variant, index) => {
                          const isActive =
                            (variant === "None" &&
                              !imageSettings.border &&
                              !imageSettings.glass &&
                              !imageSettings.outline) ||
                            (variant === "Border" && imageSettings.border) ||
                            (variant === "Glass" && imageSettings.glass) ||
                            (variant === "Outline" && imageSettings.outline);

                          return (
                            <div
                              key={variant}
                              onClick={() => {
                                setImageSettings(
                                  variant.toLowerCase() as ImageSettingType,
                                );
                              }}
                            >
                              <div
                                className={cn(
                                  "relative aspect-4/3 bg-primary rounded-lg border overflow-hidden",
                                  {
                                    "outline outline-offset-1 outline-ring":
                                      isActive,
                                  },
                                )}
                              >
                                <div
                                  className={cn(
                                    "absolute left-0 h-8 w-9 bg-muted rounded-br-2xl z-10 shadow-2xl",
                                    {
                                      "border-b-2 border-r-2 border-white shadow-2xl":
                                        index === 1,
                                      "outline-2 outline-offset-2 outline-white shadow-2xl":
                                        index === 3,
                                    },
                                  )}
                                />

                                {index === 2 && (
                                  <div className="absolute h-[35px] w-[39px] rounded-br-2xl bg-white shadow-2xl" />
                                )}
                              </div>

                              <div className="text-[10px] text-sidebar-foreground/40 text-center mt-1">
                                {variant}
                              </div>
                            </div>
                          );
                        },
                      )}
                    </>
                  );
                }

                return filteredScreens.map((screen) => (
                  <div
                    key={screen.name}
                    onClick={() =>
                      setCurrentScreen({
                        type: screen.type,
                        variant: screen.variant,
                      })
                    }
                    className={cn(
                      "relative aspect-4/3 bg-background hover:bg-accent transition-colors rounded-lg cursor-pointer",
                      {
                        "outline outline-offset-1 outline-ring":
                          screen.variant === currentScreen.variant,
                      },
                    )}
                  >
                    <Image
                      src={screen.src}
                      alt={screen.name}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                ));
              })()}
            </div>
          </div>

          {(imageSettings.border || imageSettings.outline) && (
            <div className="space-y-2">
              <p className="text-xs text-sidebar-foreground/40 uppercase">
                Choose Color
              </p>

              <Popover>
                <div className="flex items-center rounded-md bg-muted">
                  <div className="flex items-center justify-between w-full">
                    <PopoverTrigger asChild>
                      <Button
                        className="h-8 px-4 rounded-none rounded-bl-md rounded-tl-md"
                        style={{ backgroundColor: imageSettingsColor }}
                      />
                    </PopoverTrigger>
                    <div className="relative">
                      <span className="absolute top-[50%] -translate-y-1/2 pl-2">
                        #
                      </span>
                      <Input
                        type="text"
                        name="hexColor"
                        className="pl-4.5 outline-none focus:outline-none focus-visible:ring-0 rounded-none rounded-br-md rounded-tr-md h-8"
                        value={localStyleColor.slice(1)}
                        onChange={(e) => {
                          const value = e.target.value.includes("#")
                            ? e.target.value
                            : "#" + e.target.value;
                          setLocalStyleColor(value);
                          updateImageSettingsColor(value);
                        }}
                        spellCheck={false}
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                      />
                    </div>
                  </div>
                  <PopoverAnchor className="absolute right-0" />
                  <PopoverContent
                    side="right"
                    align="center"
                    className="w-auto p-1"
                  >
                    <HexColorPicker
                      color={localStyleColor.slice(1)}
                      onChange={(newHex) => {
                        setLocalStyleColor(newHex);
                        updateImageSettingsColor(newHex);
                      }}
                    />
                  </PopoverContent>
                </div>
              </Popover>
            </div>
          )}

          <div className="space-y-2">
            <p className="text-xs text-sidebar-foreground/40 uppercase">
              Shadow
            </p>

            <div className="grid grid-cols-3 gap-1">
              {Array.from(["None", "Soft", "Medium", "Hard"]).map((shadow) => {
                const isActive = imageShadow === shadow;

                return (
                  <div
                    key={shadow}
                    onClick={() => {
                      setImageShadow(
                        shadow as "None" | "Soft" | "Medium" | "Hard",
                      );
                    }}
                  >
                    <div
                      className={cn(
                        "relative aspect-4/3 bg-background rounded-lg border overflow-hidden",
                        {
                          "outline outline-offset-1 outline-ring": isActive,
                        },
                      )}
                    >
                      <div
                        className={cn(
                          `absolute h-7 w-8 rounded-br-xl bg-primary/80`,
                          {
                            "shadow-[2px_2px_6px_2px_hsl(0_0%_0%/0.3)] dark:shadow-[2px_2px_6px_2px_hsl(0_0%_100%/0.3)]":
                              shadow === "Soft",
                            "shadow-[2px_2px_6px_2px_hsl(0_0%_0%/0.6)] dark:shadow-[2px_2px_6px_2px_hsl(0_0%_100%/0.6)]":
                              shadow === "Medium",
                            "shadow-[2px_2px_6px_2px_hsl(0_0%_0%/0.9)] dark:shadow-[2px_2px_6px_2px_hsl(0_0%_100%/0.9)]":
                              shadow === "Hard",
                          },
                        )}
                      />
                    </div>

                    <div className="text-[10px] text-sidebar-foreground/40 text-center mt-1">
                      {shadow}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <p className="ml-1 text-xs text-sidebar-foreground/40 uppercase">
              Stack
            </p>

            <div className="flex flex-col gap-1.5">
              {Array.from(["none", "stack-top", "stack-bottom"]).map(
                (stack, stackIdx) => {
                  const isActive = imageStack === stack;

                  return (
                    <div
                      key={stack}
                      className="flex flex-col items-center gap-1.5"
                    >
                      <div
                        className={cn(
                          "relative w-full aspect-4/2 bg-sidebar-border rounded-xl cursor-pointer group",
                          {
                            "outline outline-offset-1 outline-ring": isActive,
                          },
                        )}
                        onClick={() => {
                          setImageStack(stack as ImageStackType);
                        }}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          {[
                            { color: "#6e6e6e" },
                            { color: "#404040" },
                            { color: "#737373" },
                          ].map((item, index) => (
                            <div
                              key={index}
                              className="absolute rounded-xl shadow-2xl"
                              style={{
                                backgroundColor: item.color,
                                width: `${50 - index * 8}%`,
                                height: `${50 - index * 8}%`,
                                transform:
                                  stackIdx === 1
                                    ? `translateY(${index * -9}px) scale(${
                                        1 - index * 0.05
                                      })`
                                    : stackIdx === 2
                                      ? `translateY(${index * 11}px) scale(${
                                          1 - index * 0.05
                                        })`
                                      : "",
                                zIndex: 3 - index,
                                opacity: 1 - index * 0.15,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="effects" className="space-y-6">
          <Resolutions />

          <div className="space-y-5">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium flex items-center gap-1">
                  <SparkleIcon className="size-4" />
                  Auto Palette
                </p>
              </div>

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
                            },
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
                              !showAllTwoColorGradients,
                            )
                          }
                          className={cn(
                            "absolute w-full h-10 rotate-5 opacity-50 rounded-xl cursor-pointer bg-sidebar-border/70 flex items-center justify-center",
                            {
                              "rotate-30": index === 0,
                            },
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
                              !showAllThreeColorGradients,
                            )
                          }
                          className={cn(
                            "absolute w-full h-10 rotate-5 opacity-50 rounded-xl cursor-pointer bg-sidebar-border/70 flex items-center justify-center",
                            {
                              "rotate-30": index === 0,
                            },
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
                    onClick={() => {
                      setShadowOverlay(image.src);
                    }}
                    quality={50}
                    alt={image.name}
                    width={50}
                    height={50}
                    className="w-full h-10 rounded-xl bg-white cursor-pointer hover:scale-110 transition-transform"
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
                          },
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
                      onClick={() => {
                        setShadowOverlay(image.src);
                      }}
                      quality={50}
                      width={50}
                      height={50}
                      className="w-full h-10 bg-white rounded-xl cursor-pointer hover:scale-110 transition-transform"
                    />
                  ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="ml-1 text-xs text-sidebar-foreground/40 uppercase">
                  Border
                </p>
                <Button
                  size="icon-sm"
                  variant="ghost"
                  onClick={() =>
                    setConcentricBorderRadius(!concentricBorderRadius)
                  }
                >
                  {concentricBorderRadius ? (
                    <EqualIcon className="size-4 text-sidebar-foreground/40" />
                  ) : (
                    <EqualNotIcon className="size-4 text-sidebar-foreground/40" />
                  )}
                </Button>
              </div>

              <div className="flex gap-1.5 justify-between">
                {[
                  { icon: SharpBorder, value: "0" },
                  { icon: CurvedBorder, value: "23" },
                  { icon: RoundedBorder, value: "50" },
                ].map((BorderComponent, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center bg-sidebar-border flex-1 p-2 rounded-lg h-12"
                    onClick={() => {
                      setBorderRadius(BorderComponent.value);
                    }}
                  >
                    <div className="size-5">
                      <BorderComponent.icon />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-1.5">
                <RangeInput
                  label="Border"
                  thumbSize={RANGE_THUMB_SIZE.SMALL}
                  fill
                  min={0}
                  max={100}
                  step={1}
                  value={parseInt(borderRadius) || 0}
                  onChange={(e) => setBorderRadius(e.target.value)}
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
              <div
                onClick={() => {
                  setBackgroundImage(null);
                  setGradientBackgroundColor(null);
                  setSolidBackgroundColor("transparent");
                  setShadowOverlay(null);
                }}
                className="flex flex-1 items-center justify-center gap-2 bg-muted border border-sidebar-border p-2 rounded-lg cursor-pointer"
              >
                <TransparentIcon className="size-6" />
              </div>

              <Popover>
                <PopoverTrigger>
                  <div className="flex flex-1 items-center justify-center gap-2 bg-muted border border-sidebar-border p-2 rounded-lg cursor-pointer">
                    <PalettePickerIcon className="size-6" />
                  </div>
                </PopoverTrigger>
                <PopoverAnchor className="absolute right-0" />
                <PopoverContent
                  side="right"
                  align="center"
                  className="w-fit flex flex-col gap-1 p-1"
                >
                  <HexColorPicker
                    style={{
                      width: "100%",
                    }}
                    color={localBgColor || ""}
                    onChange={(color) => {
                      setLocalBgColor(color);
                      setSolidBackgroundColor(color);
                    }}
                  />

                  <div className="relative">
                    <span className="absolute top-[50%] -translate-y-1/2 pl-2">
                      #
                    </span>
                    <Input
                      type="text"
                      name="hexColor"
                      className="pl-5"
                      value={localBgColor?.slice(1) || ""}
                      onChange={(e) => {
                        const value = e.target.value.includes("#")
                          ? e.target.value
                          : "#" + e.target.value;
                        setLocalBgColor(value);
                        setSolidBackgroundColor(value);
                      }}
                    />
                  </div>
                </PopoverContent>
              </Popover>

              <div
                onClick={() => {
                  if (backgroundInputRef.current) {
                    backgroundInputRef.current.click();
                  }
                }}
                className="flex flex-1 items-center justify-center gap-2 bg-muted border border-sidebar-border p-2 rounded-lg cursor-pointer"
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
                  <div className="flex flex-1 items-center justify-center gap-2 bg-muted border border-sidebar-border p-2 rounded-lg cursor-pointer">
                    <UnplashIcon className="size-6" />
                  </div>
                </PopoverTrigger>
                <PopoverAnchor className="absolute right-0" />
                <PopoverContent
                  side="right"
                  align="center"
                  className="relative w-72 h-[40dvh] p-2 overflow-y-auto no-scrollbar rounded-xl"
                >
                  <div className="flex flex-col gap-2 w-full min-h-full">
                    <div className="relative">
                      <div className="absolute top-[50%] -translate-y-1/2 pl-2">
                        <SearchIcon className="size-5 text-muted-foreground" />
                      </div>
                      <Input
                        type="text"
                        name="searchQuery"
                        className="pl-8 rounded-lg"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        spellCheck={false}
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                      />
                    </div>

                    {photos.length > 0 ? (
                      <div className="grid grid-cols-3 gap-1.5">
                        {photos.map((photo, index) => (
                          <div
                            key={index}
                            onClick={() => {
                              setBackgroundImage(photo.urls.regular);
                            }}
                            className="relative w-full h-20 cursor-pointer rounded-lg overflow-hidden"
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
                      <div className="flex flex-col items-center justify-center w-full flex-1 min-h-full">
                        <UnplashIcon className="size-10 mb-2 text-muted-foreground" />
                        <div className="flex flex-wrap gap-1 justify-center">
                          {EXAMPLE_SEARCHES.map((search, index) => (
                            <Button
                              key={index}
                              variant="secondary"
                              className="rounded-full"
                              onClick={() => {
                                setSearchQuery(search);
                              }}
                            >
                              {search}
                            </Button>
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
                          },
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
                    onClick={() => {
                      setSolidBackgroundColor(null);
                      setBackgroundImage(null);
                      setGradientBackgroundColor(gradient);
                    }}
                    className="w-full h-10 rounded-xl cursor-pointer hover:scale-110 transition-transform"
                    style={{
                      backgroundImage: `linear-gradient(${gradient.angle}deg, ${
                        gradient.first
                      }, ${gradient.second}${
                        "third" in gradient ? `, ${gradient.third}` : ""
                      })`,
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
                          },
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
                      onClick={() => {
                        setSolidBackgroundColor(null);
                        setBackgroundImage(null);
                        setGradientBackgroundColor(gradient);
                      }}
                      className="w-full h-10 rounded-xl cursor-pointer hover:scale-110 transition-transform"
                      style={{
                        backgroundImage: `linear-gradient(${
                          gradient.angle
                        }deg, ${gradient.first}, ${gradient.second}${
                          "third" in gradient ? `, ${gradient.third}` : ""
                        })`,
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
                    onClick={() => {
                      setSolidBackgroundColor(null);
                      setGradientBackgroundColor(null);
                      setBackgroundImage(image.src);
                    }}
                    quality={50}
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
                          },
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
                      onClick={() => {
                        setSolidBackgroundColor(null);
                        setGradientBackgroundColor(null);
                        setBackgroundImage(image.src);
                      }}
                      alt={image.name}
                      width={100}
                      height={100}
                      quality={50}
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
                    onClick={() => {
                      setSolidBackgroundColor(null);
                      setGradientBackgroundColor(null);
                      setBackgroundImage(image.src);
                    }}
                    width={100}
                    height={100}
                    quality={50}
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
                          },
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
                      onClick={() => {
                        setSolidBackgroundColor(null);
                        setGradientBackgroundColor(null);
                        setBackgroundImage(image.src);
                      }}
                      alt={image.name}
                      width={100}
                      height={100}
                      quality={50}
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
                    onClick={() => {
                      setSolidBackgroundColor(null);
                      setGradientBackgroundColor(null);
                      setBackgroundImage(image.src);
                    }}
                    alt={image.name}
                    width={100}
                    height={100}
                    quality={50}
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
                          },
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
                      onClick={() => {
                        setSolidBackgroundColor(null);
                        setGradientBackgroundColor(null);
                        setBackgroundImage(image.src);
                      }}
                      alt={image.name}
                      width={100}
                      height={100}
                      quality={50}
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
                    onClick={() => {
                      setSolidBackgroundColor(null);
                      setGradientBackgroundColor(null);
                      setBackgroundImage(image.src);
                    }}
                    width={100}
                    height={100}
                    quality={50}
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
                          },
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
                      onClick={() => {
                        setSolidBackgroundColor(null);
                        setGradientBackgroundColor(null);
                        setBackgroundImage(image.src);
                      }}
                      width={100}
                      height={100}
                      quality={50}
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
                    onClick={() => {
                      setBackgroundImage(image.src);
                    }}
                    width={100}
                    height={100}
                    quality={50}
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
                          },
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
                      onClick={() => {
                        setBackgroundImage(image.src);
                      }}
                      width={100}
                      height={100}
                      quality={50}
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
                    onClick={() => {
                      setSolidBackgroundColor(null);
                      setGradientBackgroundColor(null);
                      setBackgroundImage(image.src);
                    }}
                    width={100}
                    height={100}
                    quality={50}
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
                          },
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
                      onClick={() => {
                        setSolidBackgroundColor(null);
                        setGradientBackgroundColor(null);
                        setBackgroundImage(image.src);
                      }}
                      width={100}
                      height={100}
                      quality={50}
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
