import { RESOLUTION_PRESETS } from "@/lib/constants";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useMockupStore } from "@/stores/mockup-stores";
import { CATEGORY_NAMES } from "@/lib/constants";
import { ChevronDown } from "lucide-react";

export const Resolutions = () => {
  const resolution = useMockupStore.use.resolution();
  const setResolution = useMockupStore.use.setResolution();

  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex items-center gap-2">
          <span>
            {resolution.width}x{resolution.height}
          </span>
          <ChevronDown className="size-5" />
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-xl h-140 overflow-y-auto">
        <h1 className="text-lg font-semibold">Regular</h1>
        <div className="grid grid-cols-3 gap-2">
          {RESOLUTION_PRESETS.filter(
            (preset) => preset.category === CATEGORY_NAMES.REGULAR
          ).map((preset, index) => (
            <div
              key={index}
              onClick={() =>
                setResolution({ width: preset.width, height: preset.height })
              }
              className="bg-muted h-16 flex items-center justify-center rounded-md"
            >
              <span className="text-sm">
                {preset.width}x{preset.height}
              </span>
            </div>
          ))}
        </div>

        <h1>Mobile Devices</h1>
        <div className="grid grid-cols-3 gap-2">
          {RESOLUTION_PRESETS.filter(
            (preset) => preset.category === CATEGORY_NAMES.MOBILE_DEVICES
          ).map((preset, index) => (
            <div
              key={index}
              onClick={() =>
                setResolution({ width: preset.width, height: preset.height })
              }
              className="bg-muted h-16 flex items-center justify-center rounded-md"
            >
              <span className="text-sm">
                {preset.width}x{preset.height}
              </span>
            </div>
          ))}
        </div>

        <h1>Tablet Devices</h1>
        <div className="grid grid-cols-3 gap-2">
          {RESOLUTION_PRESETS.filter(
            (preset) => preset.category === CATEGORY_NAMES.TABLETS
          ).map((preset, index) => (
            <div
              key={index}
              onClick={() =>
                setResolution({ width: preset.width, height: preset.height })
              }
              className="bg-muted h-16 flex items-center justify-center rounded-md"
            >
              <span className="text-sm">
                {preset.width}x{preset.height}
              </span>
            </div>
          ))}
        </div>

        <h1>Metadata</h1>
        <div className="grid grid-cols-3 gap-2">
          {RESOLUTION_PRESETS.filter(
            (preset) => preset.category === CATEGORY_NAMES.METADATA
          ).map((preset, index) => (
            <div
              key={index}
              onClick={() =>
                setResolution({ width: preset.width, height: preset.height })
              }
              className="bg-muted h-16 flex items-center justify-center rounded-md"
            >
              <span className="text-sm">
                {preset.width}x{preset.height}
              </span>
            </div>
          ))}
        </div>

        <h1>Facebook</h1>
        <div className="grid grid-cols-3 gap-2">
          {RESOLUTION_PRESETS.filter(
            (preset) => preset.category === CATEGORY_NAMES.FACEBOOK
          ).map((preset, index) => (
            <div
              key={index}
              onClick={() =>
                setResolution({ width: preset.width, height: preset.height })
              }
              className="bg-muted h-16 flex items-center justify-center rounded-md"
            >
              <span className="text-sm">
                {preset.width}x{preset.height}
              </span>
            </div>
          ))}
        </div>

        <h1>Instagram</h1>
        <div className="grid grid-cols-3 gap-2">
          {RESOLUTION_PRESETS.filter(
            (preset) => preset.category === CATEGORY_NAMES.INSTAGRAM
          ).map((preset, index) => (
            <div
              key={index}
              onClick={() =>
                setResolution({ width: preset.width, height: preset.height })
              }
              className="bg-muted h-16 flex items-center justify-center rounded-md"
            >
              <span className="text-sm">
                {preset.width}x{preset.height}
              </span>
            </div>
          ))}
        </div>

        <h1>Twitter</h1>
        <div className="grid grid-cols-3 gap-2">
          {RESOLUTION_PRESETS.filter(
            (preset) => preset.category === CATEGORY_NAMES.TWITTER
          ).map((preset, index) => (
            <div
              key={index}
              onClick={() =>
                setResolution({ width: preset.width, height: preset.height })
              }
              className="bg-muted h-16 flex items-center justify-center rounded-md"
            >
              <span className="text-sm">
                {preset.width}x{preset.height}
              </span>
            </div>
          ))}
        </div>

        <h1>LinkedIn</h1>
        <div className="grid grid-cols-3 gap-2">
          {RESOLUTION_PRESETS.filter(
            (preset) => preset.category === CATEGORY_NAMES.LINKEDIN
          ).map((preset, index) => (
            <div
              key={index}
              onClick={() =>
                setResolution({ width: preset.width, height: preset.height })
              }
              className="bg-muted h-16 flex items-center justify-center rounded-md"
            >
              <span className="text-sm">
                {preset.width}x{preset.height}
              </span>
            </div>
          ))}
        </div>

        <h1>Desktop & Monitors</h1>
        <div className="grid grid-cols-3 gap-2">
          {RESOLUTION_PRESETS.filter(
            (preset) => preset.category === CATEGORY_NAMES.DESKTOP_AND_MONITORS
          ).map((preset, index) => (
            <div
              key={index}
              onClick={() =>
                setResolution({ width: preset.width, height: preset.height })
              }
              className="bg-muted h-16 flex items-center justify-center rounded-md"
            >
              <span className="text-sm">
                {preset.width}x{preset.height}
              </span>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
