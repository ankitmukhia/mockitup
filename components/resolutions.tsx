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
      <PopoverTrigger className="flex items-center justify-between w-full bg-muted h-12 rounded-lg px-2">
        <div
          className="w-6 min-h-4 max-h-8 border border-primary rounded"
          style={{
            aspectRatio: `${resolution.width}/${resolution.height}`,
          }}
        />

        <div className="flex flex-col items-center justify-center">
          <span className="text-sm">
            {
              RESOLUTION_PRESETS.find(
                (preset) =>
                  preset.width === resolution.width &&
                  preset.height === resolution.height
              )?.name
            }
          </span>
          <span className="text-[10px] text-muted-foreground/70">
            {resolution.width}x{resolution.height}
          </span>
        </div>
        <ChevronDown className="size-4" />
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-xl h-140 space-y-6 overflow-y-auto no-scrollbar rounded-2xl"
      >
        <div className="space-y-2">
          <h1 className="text-sm">Regular</h1>
          <div className="grid grid-cols-3 gap-2">
            {RESOLUTION_PRESETS.filter(
              (preset) => preset.category === CATEGORY_NAMES.REGULAR
            ).map((preset, index) => (
              <div
                key={index}
                onClick={() =>
                  setResolution({ width: preset.width, height: preset.height })
                }
                className="bg-muted h-20 flex items-center justify-center rounded-xl border cursor-pointer"
              >
                <div className="flex flex-col items-center justify-center gap-2">
                  <span>{preset.name}</span>
                  <span className="text-xs text-muted-foreground/70">
                    {preset.width}x{preset.height}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-sm">Mobile Devices</h1>
          <div className="grid grid-cols-3 gap-2">
            {RESOLUTION_PRESETS.filter(
              (preset) => preset.category === CATEGORY_NAMES.MOBILE_DEVICES
            ).map((preset, index) => (
              <div
                key={index}
                onClick={() =>
                  setResolution({ width: preset.width, height: preset.height })
                }
                className="bg-muted h-20 flex items-center justify-center rounded-xl border cursor-pointer"
              >
                <div className="flex flex-col items-center justify-center gap-2">
                  <span>{preset.name}</span>
                  <span className="text-xs text-muted-foreground/70">
                    {preset.width}x{preset.height}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-sm">Tablet Devices</h1>
          <div className="grid grid-cols-3 gap-2">
            {RESOLUTION_PRESETS.filter(
              (preset) => preset.category === CATEGORY_NAMES.TABLETS
            ).map((preset, index) => (
              <div
                key={index}
                onClick={() =>
                  setResolution({ width: preset.width, height: preset.height })
                }
                className="bg-muted h-20 flex items-center justify-center rounded-xl border cursor-pointer"
              >
                <div className="flex flex-col items-center justify-center gap-2">
                  <span>{preset.name}</span>
                  <span className="text-xs text-muted-foreground/70">
                    {preset.width}x{preset.height}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-sm">Metadata</h1>
          <div className="grid grid-cols-3 gap-2">
            {RESOLUTION_PRESETS.filter(
              (preset) => preset.category === CATEGORY_NAMES.METADATA
            ).map((preset, index) => (
              <div
                key={index}
                onClick={() =>
                  setResolution({ width: preset.width, height: preset.height })
                }
                className="bg-muted h-20 flex items-center justify-center rounded-xl border cursor-pointer"
              >
                <div className="flex flex-col items-center justify-center gap-2">
                  <span>{preset.name}</span>
                  <span className="text-xs text-muted-foreground/70">
                    {preset.width}x{preset.height}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-sm">Facebook</h1>
          <div className="grid grid-cols-3 gap-2">
            {RESOLUTION_PRESETS.filter(
              (preset) => preset.category === CATEGORY_NAMES.FACEBOOK
            ).map((preset, index) => (
              <div
                key={index}
                onClick={() =>
                  setResolution({ width: preset.width, height: preset.height })
                }
                className="bg-muted h-20 flex items-center justify-center rounded-xl border cursor-pointer"
              >
                <div className="flex flex-col items-center justify-center gap-2">
                  <span>{preset.name}</span>
                  <span className="text-xs text-muted-foreground/70">
                    {preset.width}x{preset.height}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-sm">Instagram</h1>
          <div className="grid grid-cols-3 gap-2">
            {RESOLUTION_PRESETS.filter(
              (preset) => preset.category === CATEGORY_NAMES.INSTAGRAM
            ).map((preset, index) => (
              <div
                key={index}
                onClick={() =>
                  setResolution({ width: preset.width, height: preset.height })
                }
                className="bg-muted h-20 flex items-center justify-center rounded-xl border cursor-pointer"
              >
                <div className="flex flex-col items-center justify-center gap-2">
                  <span>{preset.name}</span>
                  <span className="text-xs text-muted-foreground/70">
                    {preset.width}x{preset.height}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-sm">Twitter</h1>
          <div className="grid grid-cols-3 gap-2">
            {RESOLUTION_PRESETS.filter(
              (preset) => preset.category === CATEGORY_NAMES.TWITTER
            ).map((preset, index) => (
              <div
                key={index}
                onClick={() =>
                  setResolution({ width: preset.width, height: preset.height })
                }
                className="bg-muted h-20 flex items-center justify-center rounded-xl border cursor-pointer"
              >
                <div className="flex flex-col items-center justify-center gap-2">
                  <span>{preset.name}</span>
                  <span className="text-xs text-muted-foreground/70">
                    {preset.width}x{preset.height}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-sm">LinkedIn</h1>
          <div className="grid grid-cols-3 gap-2">
            {RESOLUTION_PRESETS.filter(
              (preset) => preset.category === CATEGORY_NAMES.LINKEDIN
            ).map((preset, index) => (
              <div
                key={index}
                onClick={() =>
                  setResolution({ width: preset.width, height: preset.height })
                }
                className="bg-muted h-20 flex items-center justify-center rounded-xl border cursor-pointer"
              >
                <div className="flex flex-col items-center justify-center gap-2">
                  <span>{preset.name}</span>
                  <span className="text-xs text-muted-foreground/70">
                    {preset.width}x{preset.height}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-sm">Desktop & Monitors</h1>
          <div className="grid grid-cols-3 gap-2">
            {RESOLUTION_PRESETS.filter(
              (preset) =>
                preset.category === CATEGORY_NAMES.DESKTOP_AND_MONITORS
            ).map((preset, index) => (
              <div
                key={index}
                onClick={() =>
                  setResolution({ width: preset.width, height: preset.height })
                }
                className="bg-muted h-20 flex items-center justify-center rounded-xl border cursor-pointer"
              >
                <div className="flex flex-col items-center justify-center gap-2">
                  <span>{preset.name}</span>
                  <span className="text-xs text-muted-foreground/70">
                    {preset.width}x{preset.height}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
