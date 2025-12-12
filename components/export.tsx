"use client";

import { useState } from "react";
import { toPng, toJpeg } from "html-to-image";
import { useMockupStore } from "@/stores/mockup-stores";
import {
  Download,
  Loader2,
  ImagePlusIcon,
  ChevronDownIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";

export const Export = () => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { blur } = useMockupStore.use.settings();

  const handleExport = async (type: "png" | "jpg") => {
    const node = document.getElementById("mockup-container");
    if (!node) {
      return;
    }

    setLoading(true);

    // this is just a workaround for backdrop-filter not working in html-to-image
    // improve it more in future
    // TODO: improve workaround

    // Direct DOM Manipulation variables
    const blurLayer = document.querySelector(
      '[data-id="mockup-blur"]'
    ) as HTMLElement;
    const backgroundLayer = document.querySelector(
      '[data-id="mockup-background"]'
    ) as HTMLElement;

    // Store original styles to restore later
    const originalBlurDisplay = blurLayer ? blurLayer.style.display : "";
    const originalBgFilter = backgroundLayer
      ? backgroundLayer.style.filter
      : "";
    const originalBgTransform = backgroundLayer
      ? backgroundLayer.style.transform
      : "";

    try {
      // Apply workaround styles directly to DOM
      const blurValue = Number(blur);
      if (blurLayer && backgroundLayer && blurValue > 0) {
        // Hide the original blur layer
        blurLayer.style.display = "none";

        // Apply blur to background
        backgroundLayer.style.filter = `blur(${blurValue}px)`;

        // Apply scale to background
        const width = parseInt(backgroundLayer.style.width);
        if (width && width > 0) {
          const scaleFactor = 1 + (blurValue * 4) / width;
          // Append scale to existing transform
          backgroundLayer.style.transform += ` scale(${scaleFactor})`;
        } else {
          backgroundLayer.style.transform += " scale(1.05)";
        }
      }

      // Add delay to allow DOM updates to paint
      await new Promise((resolve) => setTimeout(resolve, 100));

      let dataUrl;
      const options = {
        pixelRatio: 2, // Better quality
        quality: 1, // Max quality for JPEG
      };

      if (type === "png") {
        dataUrl = await toPng(node, options);
      } else {
        // set white background for JPEG since transparency isn't supported
        dataUrl = await toJpeg(node, {
          ...options,
          backgroundColor: "#ffffff",
        });
      }

      const link = document.createElement("a");
      link.download = `mockup.${type}`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Failed to export image", error);
    } finally {
      // Restore original styles
      if (blurLayer) {
        blurLayer.style.display = originalBlurDisplay;
      }
      if (backgroundLayer) {
        backgroundLayer.style.filter = originalBgFilter;
        backgroundLayer.style.transform = originalBgTransform;
      }
      setLoading(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button className="w-30 flex items-center gap-3 cursor-pointer">
          <div className="flex items-center gap-1.5">
            <Download />
            Export
          </div>
          <ChevronDownIcon
            className={`size-4 transition-transform duration-300 ease-in-out ${
              isOpen && "rotate-180"
            }`}
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0 w-sm" align="start">
        <Tabs defaultValue="png" className="relative">
          <div className="p-2">
            <TabsList className="w-full h-11">
              <TabsTrigger
                value="png"
                className="dark:data-[state=active]:bg-background"
              >
                PNG
              </TabsTrigger>
              <TabsTrigger
                value="jpg"
                className="dark:data-[state=active]:bg-background"
              >
                JPG
              </TabsTrigger>
            </TabsList>
          </div>

          <Separator className="my-1" />

          <TabsContent value="png" className="flex flex-col gap-3 px-2 pb-2">
            <div className="flex flex-col gap-2">
              <h1 className="text-sm font-semibold">Export PNG Image</h1>
              <p className="text-xs text-muted-foreground">
                Export your mockup as a PNG image.
              </p>
            </div>
            <Button
              onClick={() => handleExport("png")}
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <ImagePlusIcon />
              )}
              Export PNG
            </Button>
          </TabsContent>
          <TabsContent value="jpg" className="flex flex-col gap-3 px-2 pb-2">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <TriangleAlertIcon className="size-4 text-yellow-500" />
                <p className="text-xs text-yellow-500">
                  JPG doesn't support transparency.
                </p>
              </div>
              <h1 className="text-sm font-semibold">Export JPG Image</h1>
              <p className="text-xs text-muted-foreground">
                Export your mockup as a JPG image.
              </p>
            </div>
            <Button onClick={() => handleExport("jpg")} className="w-full">
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <ImagePlusIcon />
              )}
              Export JPG
            </Button>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};
