"use client";

import { useState } from "react";
import type { Cover as CoverType } from "@/types/api";
import Image from "next/image";

interface CoverProps extends CoverType {
  id: string | number;
  onClick: () => void;
}

export const Cover = ({ album, imageUrl, onClick }: CoverProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`aspect-square transition-opacity hover:opacity-80 rounded-lg overflow-hidden relative cursor-pointer bg-muted w-full outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] ${
        isLoading ? "animate-pulse" : ""
      }`}
      title={album}
    >
      <Image
        src={imageUrl}
        alt={album}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        loading="lazy"
        width={300}
        height={300}
        onLoad={() => setIsLoading(false)}
      />
    </button>
  );
};
