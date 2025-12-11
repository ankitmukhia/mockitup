import { del, get, set } from "idb-keyval";
import {
  SingleColor,
  ThreeColorGradient,
  TwoColorGradient,
} from "@/lib/color-blender";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { SOLID_COLORS } from "@/lib/constants";
import { createSelectors } from "./create-selectors";

type ScreenType =
  | "default"
  | "android"
  | "ipad"
  | "se"
  | "ultra"
  | "macbook-air"
  | "macbook-pro"
  | "iphone-17";

type UpdateType = "noiseOpacity" | "blur";
export type ImageSettingType = "border" | "outline" | "glass";

interface MockupStore {
  position: { x: number; y: number };
  currentScreen: {
    type: ScreenType;
    variant: string;
  };
  settings: {
    noiseOpacity: number;
    blur: number;
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
  solidBackgroundColor: string | null;
  solidBackgroundColors: Array<string>;
  shadowOverlay: string | null;
  colorPalette: {
    singles: SingleColor[];
    twoColorGradients: TwoColorGradient[];
    threeColorGradients: ThreeColorGradient[];
  };
  imageSettings: {
    border: boolean;
    outline: boolean;
    glass: boolean;
  };
  borderRadius: string;
  concentricBorderRadius: boolean;
  imageSettingsColor: string;
}

interface MockupStoreActions {
  setPosition: (position: { x: number; y: number }) => void;
  setCurrentScreen: (currentScreen: {
    type: ScreenType;
    variant: string;
  }) => void;
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
    gradientBackgroundColor: TwoColorGradient | ThreeColorGradient | null,
  ) => void;
  setSolidBackgroundColor: (newColor: string | null) => void;
  setSolidBackgroundColors: (solidBackgroundColor: string) => void;
  setShadowOverlay: (shadowOverlay: string | null) => void;
  setColorPalette: (colorPalette: {
    singles: SingleColor[];
    twoColorGradients: TwoColorGradient[];
    threeColorGradients: ThreeColorGradient[];
  }) => void;
  setImageSettings: (type: ImageSettingType) => void;
  updateImageSettingsColor: (color: string) => void;
  setBorderRadius: (borderRadius: string) => void;
  setConcentricBorderRadius: (concentricBorderRadius: boolean) => void;
}

const useMockupStoreBase = create<MockupStore & MockupStoreActions>()(
  persist(
    (set, get) => ({
      position: { x: 0, y: 0 },
      currentScreen: {
        type: "default",
        variant: "",
      },
      settings: {
        noiseOpacity: 15,
        blur: 28,
      },
      imageSettings: {
        border: false,
        outline: false,
        glass: true,
      },
      concentricBorderRadius: false,
      borderRadius: "23",
      imageSettingsColor: "#fff",
      zoom: 0.85,
      rotationX: 0,
      rotationY: 30,
      flipH: false,
      flipV: false,
      rotationZ: 0,
      mockupImage:
        "https://res.cloudinary.com/dtxxjwdml/image/upload/v1764985625/ewyhgstlvunmr5xesvqj.png",
      backgroundImage: "/mystic-gradient/mystic-2.jpg",
      gradientBackgroundColor: null,
      solidBackgroundColor: null,
      solidBackgroundColors: SOLID_COLORS,
      shadowOverlay: null,
      resolution: { width: 1920, height: 1080 },
      colorPalette: {
        singles: [] as SingleColor[],
        twoColorGradients: [] as TwoColorGradient[],
        threeColorGradients: [] as ThreeColorGradient[],
      },

      setPosition: (position: { x: number; y: number }) => {
        set({ position });
      },
      updateImageSettingsColor: (color: string) => {
        set({ imageSettingsColor: color });
      },
      setBorderRadius: (borderRadius: string) => {
        set({ borderRadius });
      },
      setConcentricBorderRadius: (concentricBorderRadius: boolean) => {
        set({ concentricBorderRadius });
      },
      setImageSettings: (type: ImageSettingType) => {
        switch (type) {
          case "border":
            set({
              imageSettings: { border: true, outline: false, glass: false },
            });
            break;
          case "outline":
            set({
              imageSettings: { border: false, outline: true, glass: false },
            });
            break;
          case "glass":
            set({
              imageSettings: { border: false, outline: false, glass: true },
            });
            break;
          default:
            set({
              imageSettings: { border: false, outline: false, glass: false },
            });
            break;
        }
      },
      setCurrentScreen: (currentScreen) => {
        set({ currentScreen });
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
      setShadowOverlay: (shadowOverlay) => set({ shadowOverlay }),
      setResolution: (resolution) => set({ resolution }),
      setColorPalette: (colorPalette) => set({ colorPalette }),
    }),
    {
      name: "mockup-store",
      storage: createJSONStorage(() => ({
        getItem: async (name: string): Promise<string | null> => {
          const value = await get(name);
          return value || null;
        },
        setItem: async (name: string, value: string): Promise<void> => {
          await set(name, value);
        },
        removeItem: async (name: string): Promise<void> => {
          await del(name);
        },
      })),
    },
  ),
);

export const useMockupStore = createSelectors(useMockupStoreBase);
