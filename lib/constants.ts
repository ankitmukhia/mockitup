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

export const GRADIENTS_COLORS = [
  "linear-gradient(140deg, #ff6432 12.8%, #ff0065 43.52%, #7b2eff 84.34%)",
  "linear-gradient(140deg,#f4e5f0,#e536ab,#5c03bc,#0e0725)",
  "linear-gradient(135deg,#eeddf3,#ee92b1,#6330b4)",
  "linear-gradient(113.96deg, rgb(69, 190, 232) 13.54%, rgb(214, 161, 172) 50%, rgb(232, 140, 93) 85.42%)",
  "linear-gradient(113.96deg, rgb(69, 233, 159) 11.98%, rgb(213, 168, 155) 50%, rgb(232, 70, 152) 85.42%)",
  "linear-gradient(113.96deg, rgb(69, 223, 232) 11.98%, rgb(211, 170, 175) 50%, rgb(232, 103, 100) 85.42%)",
  "linear-gradient(293.96deg, rgb(160, 233, 125) 11.46%, rgb(169, 203, 177) 50%, rgb(192, 128, 232) 88.54%)",
  "linear-gradient(-45deg, rgb(114, 122, 154), rgb(216, 219, 233))",
  "linear-gradient(135deg, rgb(48, 48, 48), rgb(16, 16, 16))",
  "linear-gradient(135deg, rgb(79, 172, 254), rgb(0, 242, 254))",
  "linear-gradient(135deg, rgb(10, 207, 254), rgb(73, 90, 255))",
  "linear-gradient(-45deg, rgb(61, 78, 129) 0%, rgb(87, 83, 201) 48%, rgb(110, 127, 243) 100%)",
  "linear-gradient(135deg, rgb(198, 255, 221), rgb(251, 215, 134), rgb(247, 121, 125))",
  "linear-gradient(135deg, rgb(248, 208, 129), rgb(238, 129, 68))",
  "linear-gradient(-45deg, rgb(248, 54, 0) 0%, rgb(249, 212, 35) 100%)",
  "linear-gradient(135deg, rgb(212, 252, 121), rgb(150, 230, 161))",
  "linear-gradient(135deg, rgb(67, 233, 123), rgb(56, 249, 215))",
  "linear-gradient(135deg, rgb(249, 240, 71), rgb(15, 216, 80))",
  "linear-gradient(-225deg, rgb(105, 234, 203) 0%, rgb(234, 204, 248) 48%, rgb(102, 84, 241) 100%)",
  "linear-gradient(135deg, rgb(215, 235, 235), rgb(244, 175, 233), rgb(157, 126, 243))",
  "linear-gradient(-45deg, rgb(80, 82, 133) 0%, rgb(88, 94, 146) 12%, rgb(101, 104, 159) 25%, rgb(116, 116, 176) 37%, rgb(126, 126, 187) 50%, rgb(131, 137, 199) 62%, rgb(151, 149, 212) 75%, rgb(162, 161, 220) 87%, rgb(181, 174, 228) 100%)",
  "linear-gradient(113.96deg, #45BEE8 13.54%, #D6A1AC 50%, #E88C5D 85.42%)",
  "linear-gradient(113.96deg, #45E99F 11.98%, #D5A89B 50%, #E84698 85.42%)",
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
