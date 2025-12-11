type SCREEN_PRESETS_TYPE = Array<{
  name: string;
  x: number;
  y: number;
  zX: number;
}>;

export const DEFAULT_SCREEN_PRESETS: SCREEN_PRESETS_TYPE = [
  { name: "0×0", x: 0, y: 0, zX: 0 },
  { name: "0×-8", x: 0, y: 0, zX: -8 },
  { name: "0×30", x: 0, y: 30, zX: 0 },
  { name: "30×0", x: 30, y: 0, zX: 0 },
  { name: "-30×0", x: -30, y: 0, zX: 0 },
  { name: "0×-30", x: 0, y: -30, zX: 0 },
  { name: "-30×-30", x: -30, y: -30, zX: 0 },
  { name: "-30×30", x: -30, y: 30, zX: 0 },
  { name: "30×-30", x: 30, y: -30, zX: 0 },
  { name: "30×30", x: 30, y: 30, zX: 0 },
];

export const MOBILE_SCREEN_PRESETS: SCREEN_PRESETS_TYPE = [
  { name: "0×0", x: 0, y: 0, zX: 0 },
  { name: "0×-30", x: 0, y: -60, zX: 3 },
  { name: "0×-30", x: 0, y: -40, zX: 2 },
  { name: "0×30", x: 0, y: 40, zX: 2 },
  { name: "0×60", x: 0, y: 60, zX: 3 },
];

export const LAPTOP_SCREEN_PRESETS: SCREEN_PRESETS_TYPE = [
  { name: "0×0", x: 0, y: 0, zX: 0 },
  { name: "-30×10", x: -30, y: 10, zX: 2 },
  { name: "30×10", x: 30, y: 10, zX: 2 },
  { name: "-30×20", x: -30, y: 20, zX: 2 },
  { name: "30×20", x: 30, y: 20, zX: 2 },
  { name: "-30×-20", x: -30, y: -20, zX: 2 },
  { name: "30×-20", x: 30, y: -20, zX: 2 },
];

export const IPAD_SCREEN_PRESETS: SCREEN_PRESETS_TYPE = [
  { name: "0×0", x: 0, y: 0, zX: 0 },
];

export const IWATCH_SCREEN_PRESETS: SCREEN_PRESETS_TYPE = [
  { name: "0×0", x: 0, y: 0, zX: 0 },
  { name: "0×0", x: 0, y: -40, zX: 2 },
  { name: "0×0", x: 0, y: 40, zX: 2 },
];
