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
