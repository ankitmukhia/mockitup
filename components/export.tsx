"use client";

import { toPng } from "html-to-image";
import { Download, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export const Export = () => {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    const node = document.getElementById("mockup-container");
    if (!node) {
      return;
    }

    setLoading(true);

    try {
      const dataUrl = await toPng(node, {
        pixelRatio: 2, // Better quality
      });
      const link = document.createElement("a");
      link.download = "mockup.png";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Failed to export image", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        className="w-48 cursor-pointer"
        onClick={handleExport}
        disabled={loading}
      >
        {loading ? <Loader2 className="animate-spin" /> : <Download />}
        Export
      </Button>
    </div>
  );
};
