"use client";

import { useState } from "react";
import { toPng, toJpeg } from "html-to-image";
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

  const handleExport = async (type: "png" | "jpg") => {
    const node = document.getElementById("mockup-container");
    if (!node) {
      return;
    }

    setLoading(true);

    try {
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
