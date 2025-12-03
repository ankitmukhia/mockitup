type RGB = [number, number, number];
type HexColor = string;

interface SingleColor {
  color: HexColor;
}

interface TwoColorGradient {
  first: HexColor;
  second: HexColor;
  angle: number;
  x1: number;
  y1: number;
}

interface ThreeColorGradient {
  first: HexColor;
  second: HexColor;
  third: HexColor;
  angle: number;
  x1: number;
  y1: number;
}

interface ColorPalette {
  singles: SingleColor[];
  twoColorGradients: TwoColorGradient[];
  threeColorGradients: ThreeColorGradient[];
}

// Convert RGB array to Hex
const rgbToHex = (rgb: RGB): HexColor => {
  return (
    "#" +
    rgb
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
      .toUpperCase()
  );
};

// Get all combinations of size n from array
const getCombinations = <T>(arr: T[], size: number): T[][] => {
  const result: T[][] = [];

  const combine = (start: number, current: T[]) => {
    if (current.length === size) {
      result.push([...current]);
      return;
    }

    for (let i = start; i < arr.length; i++) {
      current.push(arr[i]);
      combine(i + 1, current);
      current.pop();
    }
  };

  combine(0, []);
  return result;
};

// Convert angle to canvas coordinates
const angleToCanvasCoordinates = (
  angle: number
): { x1: number; y1: number } => {
  const rad = (angle * Math.PI) / 180;
  const distance = 100;

  return {
    x1: Math.cos(rad) * distance,
    y1: Math.sin(rad) * distance,
  };
};

const createSingleColors = (palette: HexColor[]): SingleColor[] => {
  return palette.map((color) => ({
    color,
  }));
};

const createTwoColorGradients = (
  palette: HexColor[],
  limit = 10
): TwoColorGradient[] => {
  const combinations = getCombinations(palette, 2);
  const gradients: TwoColorGradient[] = [];

  for (let combo of combinations) {
    if (gradients.length >= limit) break;

    const angle = Math.floor(Math.random() * 360);
    const { x1, y1 } = angleToCanvasCoordinates(angle);
    gradients.push({
      first: combo[0],
      second: combo[1],
      angle,
      x1,
      y1,
    });
  }

  return gradients;
};

const createThreeColorGradients = (
  palette: HexColor[],
  limit = 10
): ThreeColorGradient[] => {
  const combinations = getCombinations(palette, 3);

  const gradients: ThreeColorGradient[] = [];

  for (let combo of combinations) {
    if (gradients.length >= limit) break;

    const angle = Math.floor(Math.random() * 360);
    const { x1, y1 } = angleToCanvasCoordinates(angle);
    gradients.push({
      first: combo[0],
      second: combo[1],
      third: combo[2],
      angle,
      x1,
      y1,
    });
  }

  return gradients;
};

export const blendPalette = (palette: RGB[]): ColorPalette => {
  const hexPalette = palette.map(rgbToHex);

  return {
    singles: createSingleColors(hexPalette),
    twoColorGradients: createTwoColorGradients(hexPalette),
    threeColorGradients: createThreeColorGradients(hexPalette),
  };
};

export type { ColorPalette, SingleColor, TwoColorGradient, ThreeColorGradient };
