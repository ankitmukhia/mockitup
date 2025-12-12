"use client";

import { useMockupStore } from "@/stores/mockup-stores";
import { RangeInput } from "@/components/ui/range-input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RANGE_THUMB_SIZE } from "@/lib/constants";
import { StackIcon, SingleIcon } from "@/assets/svg";
import { PositionController } from "@/components/position-controller";
import {
  FlipHorizontal2Icon,
  FlipVertical2Icon,
  RefreshCcwIcon,
} from "lucide-react";
import {
  DEFAULT_SCREEN_PRESETS,
  IPAD_SCREEN_PRESETS,
  IWATCH_SCREEN_PRESETS,
  LAPTOP_SCREEN_PRESETS,
  MOBILE_SCREEN_PRESETS,
} from "@/lib/presets";
import Image from "next/image";

export const RightSidebar = () => {
  // states
  const mockupImage = useMockupStore.use.mockupImage();
  const currentScreen = useMockupStore.use.currentScreen();
  const zoom = useMockupStore.use.zoom();
  const rotationX = useMockupStore.use.rotationX();
  const rotationY = useMockupStore.use.rotationY();
  const rotationZ = useMockupStore.use.rotationZ();
  const flipH = useMockupStore.use.flipH();
  const flipV = useMockupStore.use.flipV();
  const position = useMockupStore.use.position();
  const resolution = useMockupStore.use.resolution();

  // actions
  const setZoom = useMockupStore.use.setZoom();
  const setRotationX = useMockupStore.use.setRotationX();
  const setRotationY = useMockupStore.use.setRotationY();
  const setFlipH = useMockupStore.use.setFlipH();
  const setFlipV = useMockupStore.use.setFlipV();
  const setRotationZ = useMockupStore.use.setRotationZ();
  const setPosition = useMockupStore.use.setPosition();

  const resetRotation = () => {
    setRotationX(0);
    setRotationY(0);
    setRotationZ(0);
    setFlipH(false);
    setFlipV(false);
  };

  return (
    <div className="flex flex-col h-full gap-2 w-[210px]">
      <div className="w-full bg-sidebar p-2 rounded-xl min-h-[150px]">
        <PositionController
          value={position}
          onChange={(value) => setPosition(value)}
          width={resolution.width}
          height={resolution.height}
        />
      </div>
      <div className="w-full flex-1 min-h-0 bg-sidebar p-2 rounded-xl overflow-y-auto no-scrollbar">
        <h1 className="px-1 text-md font-bold text-sidebar-foreground mb-4">
          3D Controls
        </h1>

        <Tabs defaultValue="single">
          <TabsList className="flex flex-1 w-full bg-transparent">
            <TabsTrigger value="single" className="border-none rounded-full">
              <SingleIcon className="size-6" />
            </TabsTrigger>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex-1 flex items-center justify-center">
                  <TabsTrigger
                    value="double"
                    className="border-none rounded-full cursor-not-allowed"
                    disabled
                  >
                    <StackIcon className="size-6" />
                  </TabsTrigger>
                </div>
              </TooltipTrigger>

              <TooltipContent>
                <p>Coming soon...</p>
              </TooltipContent>
            </Tooltip>
          </TabsList>

          <RangeInput
            label="Zoom"
            thumbSize={RANGE_THUMB_SIZE.BIG}
            min={10}
            max={200}
            step={5}
            value={zoom * 100}
            onChange={(e) => setZoom(Number(e.target.value) / 100)}
            className="w-full -mb-0.5"
          />
          <TabsContent value="single" className="space-y-5">
            <div className="flex flex-col gap-1.5">
              <RangeInput
                label="Horizontal"
                thumbSize={RANGE_THUMB_SIZE.BIG}
                min={-90}
                max={90}
                step={1}
                value={rotationX}
                onChange={(e) => setRotationX(Number(e.target.value))}
                className="w-full"
              />

              <RangeInput
                label="Vertical"
                thumbSize={RANGE_THUMB_SIZE.BIG}
                min={-90}
                max={90}
                step={1}
                value={rotationY}
                onChange={(e) => setRotationY(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="ml-1 text-xs text-sidebar-foreground/40 uppercase">
                Flips
              </p>

              <div className="flex gap-1.5">
                <button
                  onClick={() => setFlipH(!flipH)}
                  className={`w-full py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
                    flipH
                      ? "bg-foreground"
                      : "bg-sidebar-border hover:bg-sidebar-border/80"
                  } flex items-center justify-center`}
                >
                  <FlipHorizontal2Icon
                    className={`size-5 ${
                      flipH ? "text-background" : "text-primary"
                    }`}
                  />
                </button>
                <button
                  onClick={() => setFlipV(!flipV)}
                  className={`w-full py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
                    flipV
                      ? "bg-foreground"
                      : "bg-sidebar-border hover:bg-sidebar-border/80"
                  } flex items-center justify-center`}
                >
                  <FlipVertical2Icon
                    className={`size-5 ${
                      flipV ? "text-background" : "text-primary"
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <p className="ml-1 text-xs text-sidebar-foreground/40 uppercase">
                Presets
              </p>

              {currentScreen.type === "default" ? (
                <div className="flex flex-col gap-1.5">
                  {DEFAULT_SCREEN_PRESETS.map((preset, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setRotationX(preset.x);
                        setRotationY(preset.y);
                        setRotationZ(preset.zX);
                      }}
                      className={`relative px-8 py-2 rounded-xl text-sm cursor-pointer font-semibold transition-all ${
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
              ) : currentScreen.type === "iphone-17" ||
                currentScreen.type === "android" ? (
                <div className="flex flex-col gap-1.5">
                  {MOBILE_SCREEN_PRESETS.map((preset, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setRotationX(preset.x);
                        setRotationY(preset.y);
                        setRotationZ(preset.zX);
                      }}
                      className={`relative flex items-center justify-center px-8 py-2 rounded-xl text-sm cursor-pointer font-semibold transition-all overflow-hidden ${
                        rotationX === preset.x &&
                        rotationY === preset.y &&
                        rotationZ === preset.zX
                          ? "outline outline-ring outline-offset-2 bg-sidebar-border"
                          : "bg-sidebar-border text-sidebar-foreground hover:bg-sidebar-border/80"
                      }`}
                    >
                      <div
                        className="w-12 h-16 flex items-center justify-center px-2"
                        style={{
                          transform: `translate(${preset.x}%, ${
                            preset.y
                          }%) scale(${Number(preset.zX) || 2})`,
                          transformStyle: "preserve-3d",
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
              ) : currentScreen.type === "macbook-air" ||
                currentScreen.type === "macbook-pro" ? (
                <div className="flex flex-col gap-1.5">
                  {LAPTOP_SCREEN_PRESETS.map((preset, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setRotationX(preset.x);
                        setRotationY(preset.y);
                        setRotationZ(preset.zX);
                      }}
                      className={`relative flex items-center justify-center px-8 py-2 rounded-xl text-sm cursor-pointer font-semibold transition-all overflow-hidden ${
                        rotationX === preset.x &&
                        rotationY === preset.y &&
                        rotationZ === preset.zX
                          ? "outline outline-ring outline-offset-2 bg-sidebar-border"
                          : "bg-sidebar-border text-sidebar-foreground hover:bg-sidebar-border/80"
                      }`}
                    >
                      <div
                        className="w-24 h-26 flex items-center justify-center px-2"
                        style={{
                          transform: `translate(${preset.x}%, ${
                            preset.y
                          }%) scale(${Number(preset.zX) || 1.5})`,
                          transformStyle: "preserve-3d",
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
              ) : currentScreen.type === "ipad" ? (
                <div className="flex flex-col gap-1.5">
                  {IPAD_SCREEN_PRESETS.map((preset, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setRotationX(preset.x);
                        setRotationY(preset.y);
                        setRotationZ(preset.zX);
                      }}
                      className={`relative flex items-center justify-center px-8 py-2 rounded-xl text-sm cursor-pointer font-semibold transition-all overflow-hidden ${
                        rotationX === preset.x &&
                        rotationY === preset.y &&
                        rotationZ === preset.zX
                          ? "outline outline-ring outline-offset-2 bg-sidebar-border"
                          : "bg-sidebar-border text-sidebar-foreground hover:bg-sidebar-border/80"
                      }`}
                    >
                      <div
                        className="w-12 h-16 flex items-center justify-center px-2"
                        style={{
                          transform: `translate(${preset.x}%, ${
                            preset.y
                          }%) scale(${Number(preset.zX) || 2})`,
                          transformStyle: "preserve-3d",
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
              ) : currentScreen.type === "se" ||
                currentScreen.type === "ultra" ? (
                <div className="flex flex-col gap-1.5">
                  {IWATCH_SCREEN_PRESETS.map((preset, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setRotationX(preset.x);
                        setRotationY(preset.y);
                        setRotationZ(preset.zX);
                      }}
                      className={`relative flex items-center justify-center px-8 py-2 rounded-xl text-sm cursor-pointer font-semibold transition-all overflow-hidden ${
                        rotationX === preset.x &&
                        rotationY === preset.y &&
                        rotationZ === preset.zX
                          ? "outline outline-ring outline-offset-2 bg-sidebar-border"
                          : "bg-sidebar-border text-sidebar-foreground hover:bg-sidebar-border/80"
                      }`}
                    >
                      <div
                        className="w-12 h-16 flex items-center justify-center px-2"
                        style={{
                          transform: `translate(${preset.x}%, ${
                            preset.y
                          }%) scale(${Number(preset.zX) || 2})`,
                          transformStyle: "preserve-3d",
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
              ) : null}
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={resetRotation}
                className="w-full py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-semibold bg-background text-foreground hover:bg-background/60 transition-all"
              >
                <RefreshCcwIcon className="size-4" />
                Reset 3D
              </button>
            </div>
          </TabsContent>

          <TabsContent value="double">
            <div className="flex items-center justify-center mb-6 p-2 rounded-xl">
              Double
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
