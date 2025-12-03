import {
  SingleColor,
  ThreeColorGradient,
  TwoColorGradient,
} from "@/lib/color-blender";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { SOLID_COLORS } from "@/lib/constants";
import { createSelectors } from "./create-selectors";

interface MockupStore {
  resolution: { width: number; height: number };
  mockupImage: string | null;
  backgroundImage: string | null;
  gradientBackgroundColor: TwoColorGradient | ThreeColorGradient | null;
  canvasSolidBackgroundColor: string;
  solidBackgroundColor: Array<string>;
  colorPalette: {
    singles: SingleColor[];
    twoColorGradients: TwoColorGradient[];
    threeColorGradients: ThreeColorGradient[];
  };
}

interface MockupStoreActions {
  setResolution: (resolution: { width: number; height: number }) => void;
  setMockupImage: (mockupImage: string | null) => void;
  setBackgroundImage: (backgroundImage: string | null) => void;
  setGradientBackgroundColor: (
    gradientBackgroundColor: TwoColorGradient | ThreeColorGradient | null
  ) => void;
  setSolidBackgroundColor: (newColor: string) => void;
  setCanvasSolidBackgroundColor: (solidBackgroundColor: string) => void;
  setColorPalette: (colorPalette: {
    singles: SingleColor[];
    twoColorGradients: TwoColorGradient[];
    threeColorGradients: ThreeColorGradient[];
  }) => void;
}

const useMockupStoreBase = create<MockupStore & MockupStoreActions>()(
  persist(
    (set, get) => ({
      mockupImage: null,
      backgroundImage: null,
      gradientBackgroundColor: null,
      solidBackgroundColor: SOLID_COLORS,
      canvasSolidBackgroundColor: "#3F4F44",
      resolution: { width: 2778, height: 1284 },
      colorPalette: {
        singles: [] as SingleColor[],
        twoColorGradients: [] as TwoColorGradient[],
        threeColorGradients: [] as ThreeColorGradient[],
      },

      setMockupImage: (mockupImage) => set({ mockupImage }),
      setBackgroundImage: (backgroundImage) => set({ backgroundImage }),
      setGradientBackgroundColor: (gradientBackgroundColor) =>
        set({ gradientBackgroundColor }),
      setSolidBackgroundColor: (newColor) => {
        const { solidBackgroundColor } = get();
        set({ solidBackgroundColor: [...solidBackgroundColor, newColor] });
      },
      setCanvasSolidBackgroundColor: (solidBackgroundColor) =>
        set({ canvasSolidBackgroundColor: solidBackgroundColor }),
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
