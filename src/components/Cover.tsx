import { useState } from "react";
import { Cover as CoverType } from "../lib/types";
import { backgroundOptions } from "../data/backgrounds";

interface CoverProps extends CoverType {
  id?: number | string;
}

export const Cover = ({
  album,
  imageUrl,
  imageSource,
  year,
  musicArtistName,
  musicArtistUrl,
  coverArtistName,
  coverArtistUrl,
  id,
}: CoverProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const randomBackground =
    backgroundOptions[Math.floor(Math.random() * backgroundOptions.length)];

  return (
    <div
      className={`aspect-square transition-opacity hover:opacity-80 rounded-lg overflow-hidden relative ${randomBackground} ${
        isLoading ? "animate-pulse" : ""
      }`}
      title={album}
    >
      <img
        src={imageUrl}
        alt={album}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};

