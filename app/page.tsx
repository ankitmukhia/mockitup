"use client";

import { useState, useEffect } from "react";
import { Desktop } from "@/components/responsive-components/desktop";
import { Mobile } from "@/components/responsive-components/mobile";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const detectMobileScreenSize = () => {
      const screenWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;

      return screenWidth < 768 ? setIsMobile(true) : setIsMobile(false);
    };

    detectMobileScreenSize();

    window.addEventListener("resize", detectMobileScreenSize);

    return () => window.removeEventListener("resize", detectMobileScreenSize);
  }, []);

  const AppComponent = isMobile ? Mobile : Desktop;

  return <AppComponent />;
}
