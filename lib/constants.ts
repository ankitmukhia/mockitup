import { TwoColorGradient, ThreeColorGradient } from "./color-blender";

export enum RANGE_THUMB_SIZE {
  BIG = "slider-big",
  SMALL = "slider-small",
}

export enum CATEGORY_NAMES {
  REGULAR = "Regular",
  MOBILE_DEVICES = "Mobile Devices",
  TABLETS = "Tablets",
  DESKTOP_AND_MONITORS = "Desktop & Monitors",
  METADATA = "Metadata",
  FACEBOOK = "Facebook",
  INSTAGRAM = "Instagram",
  TWITTER = "Twitter",
  LINKEDIN = "LinkedIn",
}

export const SOLID_COLORS = [
  "A1BC98",
  "778873",
  "696FC7",
  "34495E",
  "597445",
  "405559",
  "3C415C",
  "D62B70",
  "FF006C",
  "709FB0",
  "709FB0",
  "7469B6",
  "A04747",
  "343131",
  "D8A25E",
  "EEDF7A",
  "393E46",
  "D65A31",
  "5432D3",
];

export const RESOLUTION_PRESETS = [
  {
    name: "16:9",
    width: 1920,
    height: 1080,
    category: CATEGORY_NAMES.REGULAR,
  },
  {
    name: "3:2",
    width: 1920,
    height: 1280,
    category: CATEGORY_NAMES.REGULAR,
  },
  {
    name: "4:3",
    width: 1920,
    height: 1440,
    category: CATEGORY_NAMES.REGULAR,
  },
  {
    name: "5:4",
    width: 1920,
    height: 1536,
    category: CATEGORY_NAMES.REGULAR,
  },
  {
    name: "1:1",
    width: 1920,
    height: 1920,
    category: CATEGORY_NAMES.REGULAR,
  },
  {
    name: "4:5",
    width: 1080,
    height: 1350,
    category: CATEGORY_NAMES.REGULAR,
  },
  {
    name: "3:4",
    width: 1080,
    height: 1440,
    category: CATEGORY_NAMES.REGULAR,
  },
  {
    name: "2:3",
    width: 1080,
    height: 1620,
    category: CATEGORY_NAMES.REGULAR,
  },
  {
    name: "9:16",
    width: 1080,
    height: 1920,
    category: CATEGORY_NAMES.REGULAR,
  },
  // Mobile Devices
  {
    name: "iPhone 15",
    width: 1179,
    height: 2556,
    category: CATEGORY_NAMES.MOBILE_DEVICES,
  },
  {
    name: "iPhone 15 Pro",
    width: 1179,
    height: 2556,
    category: CATEGORY_NAMES.MOBILE_DEVICES,
  },
  {
    name: "iPhone 15 Pro Max",
    width: 1290,
    height: 2796,
    category: CATEGORY_NAMES.MOBILE_DEVICES,
  },
  {
    name: "Android (S)",
    width: 720,
    height: 1520,
    category: CATEGORY_NAMES.MOBILE_DEVICES,
  },
  {
    name: "Android (M)",
    width: 1080,
    height: 2400,
    category: CATEGORY_NAMES.MOBILE_DEVICES,
  },
  {
    name: "Android (L)",
    width: 1440,
    height: 3200,
    category: CATEGORY_NAMES.MOBILE_DEVICES,
  },

  // Tablets
  {
    name: 'iPad Pro 12.9"',
    width: 2048,
    height: 2732,
    category: CATEGORY_NAMES.TABLETS,
  },
  {
    name: "iPad Air",
    width: 1668,
    height: 2388,
    category: CATEGORY_NAMES.TABLETS,
  },
  {
    name: "Samsung Tab S7",
    width: 2560,
    height: 1600,
    category: CATEGORY_NAMES.TABLETS,
  },

  // Desktop & Monitors
  {
    name: "2K (QHD)",
    width: 2560,
    height: 1440,
    category: CATEGORY_NAMES.DESKTOP_AND_MONITORS,
  },
  {
    name: "Full HD",
    width: 1920,
    height: 1080,
    category: CATEGORY_NAMES.DESKTOP_AND_MONITORS,
  },
  {
    name: "4K UHD",
    width: 3840,
    height: 2160,
    category: CATEGORY_NAMES.DESKTOP_AND_MONITORS,
  },

  // Use:
  {
    name: "Open Graph",
    width: 1200,
    height: 630,
    category: CATEGORY_NAMES.METADATA,
  },

  // Facebook
  {
    name: "Story/Reels",
    width: 1080,
    height: 1920,
    category: CATEGORY_NAMES.FACEBOOK,
  },
  {
    name: "Event Cover",
    width: 1920,
    height: 1005,
    category: CATEGORY_NAMES.FACEBOOK,
  },

  // Instagram
  {
    name: "Square Post",
    width: 1080,
    height: 1080,
    category: CATEGORY_NAMES.INSTAGRAM,
  },
  {
    name: "Portrait Post",
    width: 1080,
    height: 1350,
    category: CATEGORY_NAMES.INSTAGRAM,
  },
  {
    name: "Story/Reels",
    width: 1080,
    height: 1920,
    category: CATEGORY_NAMES.INSTAGRAM,
  },

  // Twitter
  {
    name: "Post Image",
    width: 1600,
    height: 900,
    category: CATEGORY_NAMES.TWITTER,
  },
  {
    name: "Header",
    width: 1500,
    height: 500,
    category: CATEGORY_NAMES.TWITTER,
  },

  // LinkedIn
  { name: "Post", width: 1200, height: 627, category: CATEGORY_NAMES.LINKEDIN },
  {
    name: "Banner",
    width: 1584,
    height: 396,
    category: CATEGORY_NAMES.LINKEDIN,
  },
];

export const EXAMPLE_SEARCHES = [
  "Nature",
  "People",
  "Food",
  "Travel",
  "Business",
];

export const GRADIENTS_COLORS: (TwoColorGradient | ThreeColorGradient)[] = [
  {
    first: "#FF6432",
    second: "#FF0065",
    third: "#7B2EFF",
    angle: 140,
    x1: -76.6,
    y1: 64.3,
  },
  {
    first: "#F4E5F0",
    second: "#E536AB",
    third: "#5C03BC",
    angle: 140,
    x1: -76.6,
    y1: 64.3,
  },
  {
    first: "#EEDDF3",
    second: "#EE92B1",
    third: "#6330B4",
    angle: 135,
    x1: -70.7,
    y1: 70.7,
  },
  {
    first: "#45BEE8",
    second: "#D6A1AC",
    third: "#E88C5D",
    angle: 113.96,
    x1: -39.3,
    y1: 91.2,
  },
  {
    first: "#45E99F",
    second: "#D5A89B",
    third: "#E84698",
    angle: 113.96,
    x1: -39.3,
    y1: 91.2,
  },
  {
    first: "#45DFE8",
    second: "#D3AAB0",
    third: "#E86764",
    angle: 113.96,
    x1: -39.3,
    y1: 91.2,
  },
  {
    first: "#A0E97D",
    second: "#A9CBB1",
    third: "#C080E8",
    angle: 293.96,
    x1: 27.5,
    y1: -96.1,
  },
  { first: "#727A9A", second: "#D8DBE9", angle: -45, x1: 70.7, y1: -70.7 },
  { first: "#303030", second: "#101010", angle: 135, x1: -70.7, y1: 70.7 },
  { first: "#4FACFE", second: "#00F2FE", angle: 135, x1: -70.7, y1: 70.7 },
  { first: "#0ACFFE", second: "#495AFF", angle: 135, x1: -70.7, y1: 70.7 },
  {
    first: "#3D4E81",
    second: "#5753C9",
    third: "#6E7FF3",
    angle: -45,
    x1: 70.7,
    y1: -70.7,
  },
  {
    first: "#C6FFDD",
    second: "#FBD786",
    third: "#F7797D",
    angle: 135,
    x1: -70.7,
    y1: 70.7,
  },
  { first: "#F8D081", second: "#EE8144", angle: 135, x1: -70.7, y1: 70.7 },
  { first: "#F83600", second: "#F9D423", angle: -45, x1: 70.7, y1: -70.7 },
  { first: "#D4FC79", second: "#96E6A1", angle: 135, x1: -70.7, y1: 70.7 },
  { first: "#43E97B", second: "#38F9D7", angle: 135, x1: -70.7, y1: 70.7 },
  { first: "#F9F047", second: "#0FD850", angle: 135, x1: -70.7, y1: 70.7 },
  {
    first: "#69EACB",
    second: "#EACCF8",
    third: "#6654F1",
    angle: -225,
    x1: 95.1,
    y1: -30.9,
  },
  {
    first: "#D7EBEB",
    second: "#F4AFE9",
    third: "#9D7EF3",
    angle: 135,
    x1: -70.7,
    y1: 70.7,
  },
  {
    first: "#505285",
    second: "#585E92",
    third: "#65689F",
    angle: -45,
    x1: 70.7,
    y1: -70.7,
  },
  {
    first: "#45BEE8",
    second: "#D6A1AC",
    third: "#E88C5D",
    angle: 113.96,
    x1: -39.3,
    y1: 91.2,
  },
  {
    first: "#45E99F",
    second: "#D5A89B",
    third: "#E84698",
    angle: 113.96,
    x1: -39.3,
    y1: 91.2,
  },
];

export const COSMIC_GRADIENTS_IMAGES = [
  {
    name: "Cosmic Gradient 1",
    src: "/cosmic-gradient/cosmic-1.jpg",
  },
  {
    name: "Cosmic Gradient 2",
    src: "/cosmic-gradient/cosmic-2.jpg",
  },
  {
    name: "Cosmic Gradient 3",
    src: "/cosmic-gradient/cosmic-3.jpg",
  },
  {
    name: "Cosmic Gradient 4",
    src: "/cosmic-gradient/cosmic-4.jpg",
  },
  {
    name: "Cosmic Gradient 5",
    src: "/cosmic-gradient/cosmic-5.jpg",
  },
  {
    name: "Cosmic Gradient 6",
    src: "/cosmic-gradient/cosmic-6.jpg",
  },
  {
    name: "Cosmic Gradient 7",
    src: "/cosmic-gradient/cosmic-7.jpg",
  },
  {
    name: "Cosmic Gradient 8",
    src: "/cosmic-gradient/cosmic-8.jpg",
  },
  {
    name: "Cosmic Gradient 9",
    src: "/cosmic-gradient/cosmic-9.jpg",
  },
];

export const MYSTIC_GRADIENTS_IMAGES = [
  {
    name: "Mystic Gradient 1",
    src: "/mystic-gradient/mystic-1.jpg",
  },
  {
    name: "Mystic Gradient 2",
    src: "/mystic-gradient/mystic-2.jpg",
  },
  {
    name: "Mystic Gradient 3",
    src: "/mystic-gradient/mystic-3.jpg",
  },
  {
    name: "Mystic Gradient 4",
    src: "/mystic-gradient/mystic-4.jpg",
  },
  {
    name: "Mystic Gradient 5",
    src: "/mystic-gradient/mystic-5.jpg",
  },
  {
    name: "Mystic Gradient 6",
    src: "/mystic-gradient/mystic-6.png",
  },
];

export const WALLPAPERS_IMAGES = [
  {
    name: "Wallpaper 1",
    src: "/wallpapers/wallpaper-1.jpg",
  },
  {
    name: "Wallpaper 2",
    src: "/wallpapers/wallpaper-2.jpg",
  },
  {
    name: "Wallpaper 3",
    src: "/wallpapers/wallpaper-3.jpg",
  },
  {
    name: "Wallpaper 4",
    src: "/wallpapers/wallpaper-4.jpg",
  },
  {
    name: "Wallpaper 5",
    src: "/wallpapers/wallpaper-5.jpg",
  },
  {
    name: "Wallpaper 6",
    src: "/wallpapers/wallpaper-6.jpg",
  },
  {
    name: "Wallpaper 7",
    src: "/wallpapers/wallpaper-7.jpg",
  },
  {
    name: "Wallpaper 8",
    src: "/wallpapers/wallpaper-8.jpg",
  },
  {
    name: "Wallpaper 9",
    src: "/wallpapers/wallpaper-9.jpg",
  },
  {
    name: "Wallpaper 10",
    src: "/wallpapers/wallpaper-10.jpg",
  },
  {
    name: "Wallpaper 11",
    src: "/wallpapers/wallpaper-11.jpg",
  },
  {
    name: "Wallpaper 12",
    src: "/wallpapers/wallpaper-12.jpg",
  },
  {
    name: "Wallpaper 13",
    src: "/wallpapers/wallpaper-13.jpg",
  },
  {
    name: "Wallpaper 14",
    src: "/wallpapers/wallpaper-14.jpg",
  },
  {
    name: "Wallpaper 15",
    src: "/wallpapers/wallpaper-15.jpg",
  },
  {
    name: "Wallpaper 16",
    src: "/wallpapers/wallpaper-16.jpg",
  },
  {
    name: "Wallpaper 17",
    src: "/wallpapers/wallpaper-17.jpg",
  },
  {
    name: "Wallpaper 18",
    src: "/wallpapers/wallpaper-18.jpg",
  },
  {
    name: "Wallpaper 19",
    src: "/wallpapers/wallpaper-19.jpg",
  },
  {
    name: "Wallpaper 20",
    src: "/wallpapers/wallpaper-20.jpg",
  },
  {
    name: "Wallpaper 21",
    src: "/wallpapers/wallpaper-21.jpg",
  },
  {
    name: "Wallpaper 22",
    src: "/wallpapers/wallpaper-22.png",
  },
  {
    name: "Wallpaper 23",
    src: "/wallpapers/wallpaper-23.png",
  },
  {
    name: "Wallpaper 24",
    src: "/wallpapers/wallpaper-24.jpg",
  },
];

export const ABSTRACT_IMAGES = [
  {
    name: "Abstract 1",
    src: "/abstract/abstract-1.jpg",
  },
  {
    name: "Abstract 2",
    src: "/abstract/abstract-2.jpg",
  },
  {
    name: "Abstract 3",
    src: "/abstract/abstract-3.avif",
  },
  {
    name: "Abstract 4",
    src: "/abstract/abstract-4.jpg",
  },
  {
    name: "Abstract 5",
    src: "/abstract/abstract-5.jpg",
  },
  {
    name: "Abstract 6",
    src: "/abstract/abstract-6.jpg",
  },
  {
    name: "Abstract 7",
    src: "/abstract/abstract-7.jpg",
  },
  {
    name: "Abstract 8",
    src: "/abstract/abstract-8.jpg",
  },
  {
    name: "Abstract 9",
    src: "/abstract/abstract-9.jpg",
  },
  {
    name: "Abstract 10",
    src: "/abstract/abstract-10.png",
  },
];

export const GLASS_IMAGES = [
  {
    name: "Glass 1",
    src: "/glass/glass-1.jpg",
  },
  {
    name: "Glass 2",
    src: "/glass/glass-2.jpg",
  },
  {
    name: "Glass 3",
    src: "/glass/glass-3.png",
  },
  {
    name: "Glass 4",
    src: "/glass/glass-4.png",
  },
  {
    name: "Glass 5",
    src: "/glass/glass-5.jpg",
  },
  {
    name: "Glass 6",
    src: "/glass/glass-6.jpg",
  },
  {
    name: "Glass 7",
    src: "/glass/glass-7.jpg",
  },
  {
    name: "Glass 8",
    src: "/glass/glass-8.png",
  },
  {
    name: "Glass 9",
    src: "/glass/glass-9.jpg",
  },
  {
    name: "Glass 10",
    src: "/glass/glass-10.jpg",
  },
  {
    name: "Glass 11",
    src: "/glass/glass-11.jpg",
  },
  {
    name: "Glass 12",
    src: "/glass/glass-12.png",
  },
  {
    name: "Glass 13",
    src: "/glass/glass-13.png",
  },
  {
    name: "Glass 14",
    src: "/glass/glass-14.png",
  },
];

export const KAWAII_IMAGES = [
  {
    name: "Kawaii 1",
    src: "/kawaii/kawaii-1.jpg",
  },
  {
    name: "Kawaii 2",
    src: "/kawaii/kawaii-2.png",
  },
  {
    name: "Kawaii 3",
    src: "/kawaii/kawaii-3.png",
  },
  {
    name: "Kawaii 4",
    src: "/kawaii/kawaii-4.png",
  },
  {
    name: "Kawaii 5",
    src: "/kawaii/kawaii-5.png",
  },
  {
    name: "Kawaii 6",
    src: "/kawaii/kawaii-6.jpg",
  },
  {
    name: "Kawaii 7",
    src: "/kawaii/kawaii-7.png",
  },
  {
    name: "Kawaii 8",
    src: "/kawaii/kawaii-8.png",
  },
  {
    name: "Kawaii 9",
    src: "/kawaii/kawaii-9.png",
  },
  {
    name: "Kawaii 10",
    src: "/kawaii/kawaii-10.jpg",
  },
  {
    name: "Kawaii 11",
    src: "/kawaii/kawaii-11.jpg",
  },
  {
    name: "Kawaii 12",
    src: "/kawaii/kawaii-12.jpg",
  },
  {
    name: "Kawaii 13",
    src: "/kawaii/kawaii-13.png",
  },
  {
    name: "Kawaii 14",
    src: "/kawaii/kawaii-14.png",
  },
  {
    name: "Kawaii 15",
    src: "/kawaii/kawaii-15.jpg",
  },
  {
    name: "Kawaii 16",
    src: "/kawaii/kawaii-16.png",
  },
  {
    name: "Kawaii 17",
    src: "/kawaii/kawaii-17.png",
  },
  {
    name: "Kawaii 18",
    src: "/kawaii/kawaii-18.jpg",
  },
  {
    name: "Kawaii 19",
    src: "/kawaii/kawaii-19.png",
  },
  {
    name: "Kawaii 20",
    src: "/kawaii/kawaii-20.png",
  },
];

export const SHADOW_IMAGES = [
  {
    name: "Shadow 1",
    src: "/shadow/shadow-1.webp",
  },
  {
    name: "Shadow 2",
    src: "/shadow/shadow-2.webp",
  },
  {
    name: "Shadow 3",
    src: "/shadow/shadow-3.webp",
  },
  {
    name: "Shadow 4",
    src: "/shadow/shadow-4.webp",
  },
  {
    name: "Shadow 5",
    src: "/shadow/shadow-5.webp",
  },
];

export interface ScreenImage {
  name: string;
  src: string;
  device: string;
  variant: string;
  type: OpenType;
  screenSize: string;
}

export enum OpenType {
  ANDROID = "android",
  IPAD = "ipad",
  MACBOOK_AIR = "macbook-air",
  MACBOOK_PRO = "macbook-pro",
  IPHONE_17 = "iphone-17",
  WATCH_SE = "se",
  WATCH_ULTRA = "ultra",
}

export const SCREENS: ScreenImage[] = [
  // Android
  {
    name: "Android Hazel",
    src: "/screens/android/hazel.png",
    device: "Android",
    variant: "Hazel",
    type: OpenType.ANDROID,
    screenSize: "720/1560",
  },
  {
    name: "Android Obsidian",
    src: "/screens/android/obsidian.png",
    device: "Android",
    variant: "Obsidian",
    type: OpenType.ANDROID,
    screenSize: "720/1560",
  },
  {
    name: "Android Snow",
    src: "/screens/android/snow.png",
    device: "Android",
    variant: "Snow",
    type: OpenType.ANDROID,
    screenSize: "720/1560",
  },

  // iPad
  {
    name: "iPad Silver",
    src: "/screens/ipad/silver.png",
    device: "iPad",
    variant: "Silver",
    type: OpenType.IPAD,
    screenSize: "2048/2732",
  },
  {
    name: "iPad Space Gray",
    src: "/screens/ipad/space-gray.png",
    device: "iPad",
    variant: "Space Gray",
    type: OpenType.IPAD,
    screenSize: "2048/2732",
  },

  // iPhone 17
  {
    name: "iPhone 17 Black",
    src: "/screens/iphone/17/black.png",
    device: "iPhone 17",
    variant: "Black",
    type: OpenType.IPHONE_17,
    screenSize: "402/874",
  },
  {
    name: "iPhone 17 Lavender",
    src: "/screens/iphone/17/lavender.png",
    device: "iPhone 17",
    variant: "Lavender",
    type: OpenType.IPHONE_17,
    screenSize: "402/874",
  },
  {
    name: "iPhone 17 Mist Blue",
    src: "/screens/iphone/17/mist-blue.png",
    device: "iPhone 17",
    variant: "Mist Blue",
    type: OpenType.IPHONE_17,
    screenSize: "402/874",
  },
  {
    name: "iPhone 17 Sage",
    src: "/screens/iphone/17/sage.png",
    device: "iPhone 17",
    variant: "Sage",
    type: OpenType.IPHONE_17,
    screenSize: "402/874",
  },
  {
    name: "iPhone 17 White",
    src: "/screens/iphone/17/white.png",
    device: "iPhone 17",
    variant: "White",
    type: OpenType.IPHONE_17,
    screenSize: "402/874",
  },

  // MacBook Air
  {
    name: "MacBook Air Midnight",
    src: "/screens/mac/air/midnight.png",
    device: "MacBook Air",
    variant: "Midnight",
    type: OpenType.MACBOOK_AIR,
    screenSize: "2560/1664",
  },
  {
    name: "MacBook Air Silver",
    src: "/screens/mac/air/silver.png",
    device: "MacBook Air",
    variant: "Silver",
    type: OpenType.MACBOOK_AIR,
    screenSize: "2560/1664",
  },
  {
    name: "MacBook Air Space Gray",
    src: "/screens/mac/air/space-gray.png",
    device: "MacBook Air",
    variant: "Space Gray",
    type: OpenType.MACBOOK_AIR,
    screenSize: "2560/1664",
  },
  {
    name: "MacBook Air Starlight",
    src: "/screens/mac/air/starlight.png",
    device: "MacBook Air",
    variant: "Starlight",
    type: OpenType.MACBOOK_AIR,
    screenSize: "2560/1664",
  },

  // MacBook Pro
  {
    name: "Mac Silver",
    src: "/screens/mac/silver.png",
    device: "Mac",
    variant: "Silver",
    type: OpenType.MACBOOK_PRO,
    screenSize: "3456/2234",
  },

  // Apple Watch
  {
    name: "Apple Watch Rose Gold",
    src: "/screens/watch/rose-gold.png",
    device: "Apple Watch",
    variant: "Rose Gold",
    type: OpenType.WATCH_SE,
    screenSize: "416/496",
  },

  // Apple Watch Ultra
  {
    name: "Apple Watch Ultra Black Ocean Band Navy",
    src: "/screens/watch/ultra/black-ocean-band-navy.png",
    device: "Apple Watch Ultra",
    variant: "Black Ocean Band Navy",
    type: OpenType.WATCH_ULTRA,
    screenSize: "410/502",
  },
  {
    name: "Apple Watch Ultra Black Titanium Loop",
    src: "/screens/watch/ultra/black-titanium-loop.png",
    device: "Apple Watch Ultra",
    variant: "Black Titanium Loop",
    type: OpenType.WATCH_ULTRA,
    screenSize: "410/502",
  },
  {
    name: "Apple Watch Ultra Black Trail Loop Black",
    src: "/screens/watch/ultra/black-trail-loop-black.png",
    device: "Apple Watch Ultra",
    variant: "Black Trail Loop Black",
    type: OpenType.WATCH_ULTRA,
    screenSize: "410/502",
  },
  {
    name: "Apple Watch Ultra Natural",
    src: "/screens/watch/ultra/ultra-natural.png",
    device: "Apple Watch Ultra",
    variant: "Natural",
    type: OpenType.WATCH_ULTRA,
    screenSize: "410/502",
  },
];

export const SCREEN_PREVIEW = [
  {
    device: "iPhone 17",
    src: "/screens/preview/iphone/17.png",
    type: OpenType.IPHONE_17,
    defaultVariant: "Black",
  },
  {
    device: "Apple Watch SE",
    src: "/screens/preview/watch/se.png",
    type: OpenType.WATCH_SE,
    defaultVariant: "Rose Gold",
  },
  {
    device: "Apple Watch Ultra",
    src: "/screens/preview/watch/ultra.png",
    type: OpenType.WATCH_ULTRA,
    defaultVariant: "Black Ocean Band Navy",
  },
  {
    device: "MacBook Air",
    src: "/screens/preview/mac/air.png",
    type: OpenType.MACBOOK_AIR,
    defaultVariant: "Midnight",
  },
  {
    device: "MacBook Pro",
    src: "/screens/preview/mac/pro.png",
    type: OpenType.MACBOOK_PRO,
    defaultVariant: "Silver",
  },
  {
    device: "iPad",
    src: "/screens/preview/ipad/1.png",
    type: OpenType.IPAD,
    defaultVariant: "Silver",
  },
  {
    device: "Android",
    src: "/screens/preview/android/1.png",
    type: OpenType.ANDROID,
    defaultVariant: "Hazel",
  },
];

// Map device types to their display mask SVG paths
export const DEVICE_MASKS: Record<string, string> = {
  [OpenType.IPHONE_17]: "/masks/iphone-17-display.svg",
  [OpenType.ANDROID]: "/masks/android-display.svg",
  [OpenType.IPAD]: "/masks/ipad-display.svg",
  [OpenType.MACBOOK_AIR]: "/masks/macbook-air-display.svg",
  [OpenType.MACBOOK_PRO]: "/masks/macbook-pro-display.svg",
  [OpenType.WATCH_SE]: "/masks/watch-se-display.svg",
  [OpenType.WATCH_ULTRA]: "/masks/watch-ultra-display.svg",
};
