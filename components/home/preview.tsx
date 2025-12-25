"use client";

import { useMockupStore } from "@/stores/mockup-stores";
import { UploadIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import ColorThief from "colorthief";
import { blendPalette } from "@/lib/color-blender";
import { SCREENS, DEVICE_MASKS, OpenType } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const Preview = () => {
  // states
  const position = useMockupStore.use.position();
  const currentScreen = useMockupStore.use.currentScreen();
  const zoom = useMockupStore.use.zoom();
  const resolution = useMockupStore.use.resolution();
  const mockupImage = useMockupStore.use.mockupImage();
  const backgroundImage = useMockupStore.use.backgroundImage();
  const gradientBackgroundColor = useMockupStore.use.gradientBackgroundColor();
  const solidBackgroundColor = useMockupStore.use.solidBackgroundColor();
  const shadowOverlay = useMockupStore.use.shadowOverlay();
  const rotationX = useMockupStore.use.rotationX();
  const rotationY = useMockupStore.use.rotationY();
  const rotationZ = useMockupStore.use.rotationZ();
  const flipH = useMockupStore.use.flipH();
  const flipV = useMockupStore.use.flipV();

  // store actions
  const setColorPalette = useMockupStore.use.setColorPalette();
  const setMockupImage = useMockupStore.use.setMockupImage();
  const { blur, noiseOpacity } = useMockupStore.use.settings();
  const imageSettings = useMockupStore.use.imageSettings();
  const imageSettingsColor = useMockupStore.use.imageSettingsColor();
  const borderRadius = useMockupStore.use.borderRadius();
  const concentricBorderRadius = useMockupStore.use.concentricBorderRadius();
  const imageShadow = useMockupStore.use.imageShadow();
  const imageStack = useMockupStore.use.imageStack();

  const mockupInputRef = useRef<HTMLInputElement>(null);

  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [prevMockupImage, setPrevMockupImage] = useState(mockupImage);
  const [imageAspectRatio, setImageAspectRatio] = useState(0);

  if (mockupImage !== prevMockupImage) {
    setPrevMockupImage(mockupImage);
    setIsImageLoaded(false);
  }

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

  const padding = 67;
  const scale =
    containerSize.width && containerSize.height
      ? Math.min(
          (containerSize.width - padding) / resolution.width,
          (containerSize.height - padding) / resolution.height,
        )
      : 0.5;

  const extractColorFromImage = (image: HTMLImageElement) => {
    const colorThief = new ColorThief();
    const palette = colorThief.getPalette(image);

    const blended = blendPalette(palette);
    setColorPalette(blended);
  };

  const handleMockUpImageSelect = (
    event: React.ChangeEvent<HTMLInputElement>,
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

  const getShadowStyle = () => {
    switch (imageShadow) {
      case "Soft":
        return "0px 0px 20px 10px hsl(0 0% 0% / 0.3)";
      case "Medium":
        return "0px 0px 40px 10px hsl(0 0% 0% / 0.6)";
      case "Hard":
        return "0px 0px 50px 10px hsl(0 0% 0% / 0.9)";
      default:
        return "none";
    }
  };

  // 3D transform for default mockup image
  const getTransform = () => {
    const scaleX = flipH ? -1 : 1;
    const scaleY = flipV ? -1 : 1;

    // Parallax effect: subtle position shift for realistic 3D perspective
    const translateX = rotationY * 0.2;
    const translateY = rotationX * -0.2;
    const translateZ = rotationZ * 0.2;

    const is3D = rotationX !== 0 || rotationY !== 0 || rotationZ !== 0;
    const scaleFactor = is3D ? 0.8 : 0.9;
    const finalZoom = zoom * scaleFactor;

    return `perspective(200em) translate(${translateX}%, ${translateY}%) translate(${
      position.x
    }px, ${position.y}px) scale(${finalZoom * scaleX}, ${
      finalZoom * scaleY
    }) rotateX(${rotationX}deg) rotateY(${rotationY}deg) rotateZ(${translateZ}deg) skewX(0deg) skewY(0deg)`;
  };

  const getDeviceTransform = () => {
    const translateX = rotationX;
    const translateY = rotationY;
    const translateZ = rotationZ || 1;

    return `translate(${translateX}%, ${translateY}%) translate(${
      position.x
    }px, ${position.y}px) scale(${zoom * translateZ})`;
  };

  return (
    <div className="flex-1 h-full">
      <div
        ref={containerRef}
        className="relative flex items-center justify-center h-full w-full overflow-hidden"
      >
        <div
          id="mockup-container"
          className="relative overflow-hidden"
          style={{
            width: `${resolution.width * scale}px`,
            height: `${resolution.height * scale}px`,
            ...(concentricBorderRadius && {
              borderRadius: `${borderRadius}px`,
            }),
          }}
        >
          <div
            data-id="mockup-background"
            className="absolute inset-0"
            style={{
              width: `${resolution.width}px`,
              height: `${resolution.height}px`,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              overflow: "hidden",

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
          />

          {blur > 0 && (
            <div
              data-id="mockup-blur"
              className="absolute inset-0"
              style={{
                backdropFilter: `blur(${blur}px)`,
              }}
            />
          )}

          {noiseOpacity > 0 && (
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url(/noise.svg)",
                opacity: noiseOpacity / 100,
              }}
            />
          )}

          {shadowOverlay && (
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${shadowOverlay})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                opacity: 0.5,
              }}
            />
          )}

          <div>
            {currentScreen.type === "default" ? (
              <div className="absolute inset-0 z-20">
                <div
                  className="relative w-full h-full flex items-center justify-center"
                  style={{
                    transform: getTransform(),
                    transition: "transform 0.180s linear",

                    transformOrigin: "center center",
                  }}
                >
                  <div
                    className="relative cursor-pointer group"
                    style={{
                      width:
                        imageAspectRatio > resolution.width / resolution.height
                          ? "100%"
                          : "auto",
                      height:
                        imageAspectRatio > resolution.width / resolution.height
                          ? "auto"
                          : "100%",
                      aspectRatio: imageAspectRatio,
                      boxShadow: getShadowStyle(),
                      borderRadius: `${parseInt(borderRadius)}px`,
                    }}
                    onClick={() => {
                      if (mockupInputRef.current) {
                        mockupInputRef.current.click();
                      }
                    }}
                  >
                    {/* Top stack */}
                    {imageStack === "stack-top" && (
                      <>
                        <div className="absolute -top-12 inset-x-20 rounded-4xl h-full bg-neutral-700" />
                        <div className="absolute -top-8 inset-x-10 rounded-4xl h-full bg-black" />
                      </>
                    )}

                    {/* Botom stack */}
                    {imageStack === "stack-bottom" && (
                      <>
                        <div className="absolute -bottom-12 inset-x-20 rounded-4xl h-full bg-neutral-700" />
                        <div className="absolute -bottom-8 inset-x-10 rounded-4xl h-full bg-black" />
                      </>
                    )}

                    {mockupImage &&
                      isImageLoaded &&
                      (imageSettings.outline ||
                        imageSettings.glass ||
                        imageSettings.border) && (
                        <div className="absolute -inset-[12px] overflow-hidden pointer-events-none">
                          <div
                            style={{
                              position: "absolute",
                              inset: 0,
                              ...(imageSettings.outline
                                ? {
                                    borderWidth: 2,
                                    borderStyle: "solid",
                                    borderColor: imageSettingsColor,
                                  }
                                : {}),
                              ...(imageSettings.glass
                                ? {
                                    backgroundColor: "rgba(255, 255, 255, 0.4)",
                                    backdropFilter: "blur(24px)",
                                    WebkitBackdropFilter: "blur(24px)",
                                  }
                                : {}),
                              ...(imageSettings.border
                                ? { backgroundColor: imageSettingsColor }
                                : {}),
                              borderRadius: `${
                                parseInt(borderRadius) > 0
                                  ? parseInt(borderRadius) + 12
                                  : 0
                              }px`,
                            }}
                          />
                        </div>
                      )}

                    <Image
                      src={mockupImage}
                      quality={100}
                      loading="eager"
                      style={{
                        borderRadius: `${parseInt(borderRadius)}px`,
                      }}
                      onLoad={(e) => {
                        setIsImageLoaded(true);
                        const img = e.target as HTMLImageElement;
                        setImageAspectRatio(
                          img.naturalWidth / img.naturalHeight,
                        );
                        extractColorFromImage(img);
                      }}
                      alt="Uploaded mockup"
                      fill
                      className="object-cover"
                    />

                    <div
                      className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-3 transition-all duration-300 ease-in-out bg-black/50"
                      style={{
                        borderRadius: `${parseInt(borderRadius)}px`,
                      }}
                    >
                      <UploadIcon className="size-10 text-white" />
                      <span className="text-white text-lg">Upload Image</span>
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
            ) : (
              (() => {
                const screen = SCREENS.find(
                  (s) =>
                    s.type === currentScreen.type &&
                    s.variant === currentScreen.variant,
                );
                if (!screen) return null;

                const getDeviceScale = (type: string) => {
                  switch (type) {
                    case OpenType.IPHONE_17:
                      return 1.244;
                    case OpenType.ANDROID:
                      return 1.238;
                    case OpenType.IPAD:
                      return 1.238;
                    case OpenType.MACBOOK_AIR:
                    case OpenType.MACBOOK_PRO:
                      return 1.49;
                    case OpenType.WATCH_SE:
                      return 1.99;
                    case OpenType.WATCH_ULTRA:
                      return 1.9;
                    default:
                      return 1.1;
                  }
                };

                const deviceAssetScale = getDeviceScale(currentScreen.type);
                const maskPath = DEVICE_MASKS[currentScreen.type];

                const [width, height] = screen.screenSize
                  .split("/")
                  .map(Number);
                const screenAspectRatio = width / height;
                const containerAspectRatio =
                  resolution.width / resolution.height;

                const targetFill = 0.75; // target 75% of container for the whole asset
                const wrapperPercent = (targetFill / deviceAssetScale) * 100;

                return (
                  <div
                    className="will-change-transform absolute inset-0"
                    style={{
                      transform: getDeviceTransform(),
                      transition: "transform 0.180s linear",
                      transformOrigin: "center center",
                    }}
                  >
                    <div className="relative flex items-center justify-center w-full h-full">
                      <div
                        className="relative flex items-center justify-center"
                        style={{
                          width:
                            screenAspectRatio > containerAspectRatio
                              ? `${wrapperPercent}%`
                              : "auto",
                          height:
                            screenAspectRatio > containerAspectRatio
                              ? "auto"
                              : `${wrapperPercent}%`,
                          aspectRatio: `${width}/${height}`,
                        }}
                      >
                        <div
                          className={cn(
                            `absolute group will-change-transform w-full h-auto`,
                            `aspect-[${width}/${height}]`,
                          )}
                          onClick={() => {
                            if (mockupInputRef.current) {
                              mockupInputRef.current.click();
                            }
                          }}
                        >
                          {/* Device screen */}
                          <div
                            className="pointer-events-none w-full h-full absolute top-0 left-0 z-10"
                            style={{
                              transform: `scale(${deviceAssetScale})`,
                            }}
                          >
                            <Image
                              src={screen.src}
                              alt="Screen"
                              quality={100}
                              loading="eager"
                              fill
                              className="object-contain"
                            />
                          </div>

                          {/* Device mask */}
                          <div
                            className="w-full h-full relative z-0"
                            style={{
                              aspectRatio: `${width}/${height}`,
                              maskImage: `url(${maskPath})`,
                              maskPosition: "center",
                              maskRepeat: "no-repeat",
                              maskSize: "100% 100%",
                              WebkitMaskImage: `url(${maskPath})`,
                              WebkitMaskPosition: "center",
                              WebkitMaskRepeat: "no-repeat",
                              WebkitMaskSize: "100% 100%",
                            }}
                          >
                            <Image
                              src={mockupImage}
                              alt="Screen Content"
                              quality={100}
                              loading="eager"
                              fill
                              className="object-cover"
                            />

                            <div
                              className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-2 transition-all duration-300 ease-in-out bg-black/50"
                              style={{
                                borderRadius: `${parseInt(borderRadius)}px`,
                              }}
                            >
                              <UploadIcon className="size-6 text-white" />
                              <span className="text-white text-xs">
                                Upload Image
                              </span>
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
                );
              })()
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
