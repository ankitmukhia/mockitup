"use client";

import { useMockupStore } from "@/stores/mockup-stores";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { UploadImage } from "@/assets/svg";
import ColorThief from "colorthief";
import { blendPalette } from "@/lib/color-blender";

export const Preview = () => {
  // states
  const zoom = useMockupStore.use.zoom();
  const resolution = useMockupStore.use.resolution();
  const mockupImage = useMockupStore.use.mockupImage();
  const backgroundImage = useMockupStore.use.backgroundImage();
  const gradientBackgroundColor = useMockupStore.use.gradientBackgroundColor();
  const solidBackgroundColor = useMockupStore.use.solidBackgroundColor();
  const rotationX = useMockupStore.use.rotationX();
  const rotationY = useMockupStore.use.rotationY();
  const rotationZ = useMockupStore.use.rotationZ();
  const flipH = useMockupStore.use.flipH();
  const flipV = useMockupStore.use.flipV();

  // store actions
  const setColorPalette = useMockupStore.use.setColorPalette();
  const setMockupImage = useMockupStore.use.setMockupImage();

  const mockupInputRef = useRef<HTMLInputElement>(null);

  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });
  const [canvasRadius, setCanvasRadius] = useState(20);
  const [blur, setBlur] = useState(60);
  const [noiseOpacity, setNoiseOpacity] = useState(0);

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

  const extractColorFromImage = (image: HTMLImageElement) => {
    const colorThief = new ColorThief();
    const palette = colorThief.getPalette(image);

    const blended = blendPalette(palette);
    setColorPalette(blended);
  };

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

  // Get 3D transform string
  const getTransform = () => {
    const scaleX = flipH ? -1 : 1;
    const scaleY = flipV ? -1 : 1;
    const translateX = rotationY * 0.2;
    const translateY = rotationX * -0.2;
    const translateZ = rotationZ * 0.2;

    return `perspective(200em) translate(${translateX}%, ${translateY}%) scale(${
      zoom * scaleX
    }, ${
      zoom * scaleY
    }) rotateX(${rotationX}deg) rotateY(${rotationY}deg) rotateZ(${translateZ}deg) skewX(0deg) skewY(0deg)`;
  };

  return (
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
            <div
              style={{
                width: `${resolution.width}px`,
                height: `${resolution.height}px`,
                borderRadius: `${canvasRadius}px`,
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
                      backgroundColor: solidBackgroundColor,
                    }),
              }}
            />

            <div className={`absolute inset-0 backdrop-blur-[${blur}px]`} />
            <div
              style={{
                backgroundImage: "url(/noise.svg)",
                opacity: noiseOpacity,
              }}
              className="absolute inset-0 z-100"
            />

            <div className="absolute inset-0 z-100 flex items-center justify-center">
              <div
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
                  src={mockupImage}
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
  );
};
