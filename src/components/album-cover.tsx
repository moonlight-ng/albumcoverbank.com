"use client";

import { useState } from "react";
import type { Cover as CoverType } from "@/types/api";
import Image from "next/image";

interface AlbumCoverProps extends CoverType {
  id: string | number;
  onClick: () => void;
  priority?: boolean;
}

export const AlbumCover = ({
  album,
  imageUrl,
  onClick,
  priority = false,
}: AlbumCoverProps) => {
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
        loading={priority ? undefined : "lazy"}
        priority={priority}
        width={300}
        height={300}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 300px"
        onLoad={() => setIsLoading(false)}
      />
    </button>
  );
};
