import {
  SingleColor,
  ThreeColorGradient,
  TwoColorGradient,
} from "@/lib/color-blender";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { SOLID_COLORS } from "@/lib/constants";
import { createSelectors } from "./create-selectors";

type UpdateType = "noiseOpacity" | "blur" | "canvasRadius";

interface MockupStore {
  settings: {
    noiseOpacity: number;
    blur: number;
    canvasRadius: number;
  };
  zoom: number;

  // 3d
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  flipH: boolean;
  flipV: boolean;

  resolution: { width: number; height: number };
  mockupImage: string;
  backgroundImage: string | null;
  gradientBackgroundColor: TwoColorGradient | ThreeColorGradient | null;
  solidBackgroundColor: string;
  solidBackgroundColors: Array<string>;
  colorPalette: {
    singles: SingleColor[];
    twoColorGradients: TwoColorGradient[];
    threeColorGradients: ThreeColorGradient[];
  };
}

interface MockupStoreActions {
  setSettings: (updateType: UpdateType, setting: number) => void;
  setRotationX: (rotationX: number) => void;
  setRotationY: (rotationY: number) => void;
  setRotationZ: (rotationZ: number) => void;
  setFlipH: (flipH: boolean) => void;
  setFlipV: (flipV: boolean) => void;
  setZoom: (zoom: number) => void;
  setResolution: (resolution: { width: number; height: number }) => void;
  setMockupImage: (mockupImage: string) => void;
  setBackgroundImage: (backgroundImage: string | null) => void;
  setGradientBackgroundColor: (
    gradientBackgroundColor: TwoColorGradient | ThreeColorGradient | null
  ) => void;
  setSolidBackgroundColor: (newColor: string) => void;
  setSolidBackgroundColors: (solidBackgroundColor: string) => void;
  setColorPalette: (colorPalette: {
    singles: SingleColor[];
    twoColorGradients: TwoColorGradient[];
    threeColorGradients: ThreeColorGradient[];
  }) => void;
}

const useMockupStoreBase = create<MockupStore & MockupStoreActions>()(
  persist(
    (set, get) => ({
      settings: {
        noiseOpacity: 0,
        blur: 0,
        canvasRadius: 0,
      },
      zoom: 0.75,
      rotationX: 0,
      rotationY: 0,
      flipH: false,
      flipV: false,
      rotationZ: 0,
      mockupImage:
        "https://res.cloudinary.com/dtxxjwdml/image/upload/v1764683481/aisabnqodcuu2ze8nbu7.png",
      backgroundImage: null,
      gradientBackgroundColor: null,
      solidBackgroundColor: "#3F4F44",
      solidBackgroundColors: SOLID_COLORS,
      resolution: { width: 2778, height: 1284 },
      colorPalette: {
        singles: [] as SingleColor[],
        twoColorGradients: [] as TwoColorGradient[],
        threeColorGradients: [] as ThreeColorGradient[],
      },

      setRotationX: (rotationX) => set({ rotationX }),
      setRotationY: (rotationY) => set({ rotationY }),
      setRotationZ: (rotationZ) => set({ rotationZ }),
      setFlipH: (flipH) => set({ flipH }),
      setFlipV: (flipV) => set({ flipV }),
      setSettings: (updateType, setting) => {
        const { settings } = get();

        switch (updateType) {
          case "noiseOpacity":
            set({ settings: { ...settings, noiseOpacity: setting } });
            break;
          case "blur":
            set({ settings: { ...settings, blur: setting } });
            break;
          case "canvasRadius":
            set({ settings: { ...settings, canvasRadius: setting } });
            break;
        }
      },
      setZoom: (zoom) => set({ zoom }),
      setMockupImage: (mockupImage) => set({ mockupImage }),
      setBackgroundImage: (backgroundImage) => set({ backgroundImage }),
      setGradientBackgroundColor: (gradientBackgroundColor) =>
        set({ gradientBackgroundColor }),
      setSolidBackgroundColor: (solidBackgroundColor) =>
        set({ solidBackgroundColor: solidBackgroundColor }),
      setSolidBackgroundColors: (newColor) => {
        const { solidBackgroundColors } = get();
        set({ solidBackgroundColors: [...solidBackgroundColors, newColor] });
      },
      setResolution: (resolution) => set({ resolution }),
      setColorPalette: (colorPalette) => set({ colorPalette }),
    }),
    {
      name: "mockup-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useMockupStore = createSelectors(useMockupStoreBase);
