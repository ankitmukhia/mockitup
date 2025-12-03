import * as React from "react";

export const SharpBorder: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <defs>
      <clipPath id="sharp_svg__a">
        <path d="M0 0h24v24H0Z"></path>
      </clipPath>
    </defs>
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      d="M-17.75 4.25h37.5v37.5h-37.5z"
      clipPath="url(#sharp_svg__a)"
    />
  </svg>
);

export const CurvedBorder: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <defs>
      <clipPath id="curved_svg__a">
        <path d="M0 0h24v24H0Z"></path>
      </clipPath>
    </defs>
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      d="M-17.75 13A8.75 8.75 0 0 1-9 4.25h20A8.75 8.75 0 0 1 19.75 13v20A8.75 8.75 0 0 1 11 41.75H-9A8.75 8.75 0 0 1-17.75 33z"
      clipPath="url(#curved_svg__a)"
    />
  </svg>
);

export const RoundedBorder: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <defs>
      <clipPath id="round_svg__a">
        <path d="M0 0h24v24H0Z"></path>
      </clipPath>
    </defs>
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      d="M-17.75 23C-17.75 12.644-9.356 4.25 1 4.25S19.75 12.644 19.75 23 11.355 41.75 1 41.75-17.75 33.355-17.75 23Z"
      clipPath="url(#round_svg__a)"
    />
  </svg>
);

export const UploadImage: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 20 20"
    className="size-20"
    {...props}
  >
    <path
      d="m17,11.586l-2.732-2.732c-.975-.975-2.561-.975-3.535,0l-6.994,6.994c-.017.017-.022.041-.037.059.55.663,1.37,1.093,2.298,1.093h8c1.657,0,3-1.343,3-3v-2.414Z"
      strokeWidth="0"
      fill="currentColor"
    />
    <rect
      x="3"
      y="3"
      width="14"
      height="14"
      rx="3"
      ry="3"
      transform="translate(0 20) rotate(-90)"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <circle cx="7.5" cy="7.5" r="1.5" fill="currentColor" strokeWidth="0" />
  </svg>
);

export const UnplashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M15.7 10.845H22V22H2V10.845h6.299v5.576H15.7zM15.7 2H8.299v5.576H15.7z"
    />
  </svg>
);

export const Noise: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    className="pointer-events-none fixed isolate z-10 opacity-70 mix-blend-soft-light"
    width="100%"
    height="100%"
  >
    <filter id="noise">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.80"
        numOctaves="4"
        stitchTiles="stitch"
      />
    </filter>
    <rect width="100%" height="100%" filter="url(#noise)" />
  </svg>
);
