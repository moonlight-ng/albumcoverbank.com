import React, { useState } from "react";
import { ExternalLink } from "lucide-react";
import { Cover as CoverType } from "../lib/types";
import { backgroundOptions } from "../data/backgrounds";
import { SlideOver } from "./ui/slideover";

interface CoverProps extends CoverType {
  id?: number | string;
}

interface CoverDialogProps extends CoverType {
  isOpen: boolean;
  onClose: () => void;
}

const CoverDialog = ({
  album,
  imageUrl,
  imageSource,
  year,
  musicArtistName,
  musicArtistUrl,
  coverArtistName,
  coverArtistUrl,
  isOpen,
  onClose,
}: CoverDialogProps) => {
  return (
    <SlideOver isOpen={isOpen} onClose={onClose} title="Album Details">
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Cover Image */}
        <div className="aspect-square rounded-lg overflow-hidden">
          <img
            src={imageUrl}
            alt={album}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Album Information */}
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              Album
            </h3>
            <p className="text-lg font-semibold">{album}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              Year
            </h3>
            <p className="text-base">{year}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              Music Artist
            </h3>
            {musicArtistUrl ? (
              <a
                href={musicArtistUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-primary hover:underline inline-flex items-center gap-1"
              >
                {musicArtistName}
                <ExternalLink className="h-3 w-3" />
              </a>
            ) : (
              <p className="text-base">{musicArtistName}</p>
            )}
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              Cover Artist
            </h3>
            {coverArtistUrl ? (
              <a
                href={coverArtistUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-primary hover:underline inline-flex items-center gap-1"
              >
                {coverArtistName}
                <ExternalLink className="h-3 w-3" />
              </a>
            ) : (
              <p className="text-base">{coverArtistName}</p>
            )}
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              Image Source
            </h3>
            {imageSource ? (
              <a
                href={imageSource}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-primary hover:underline inline-flex items-center gap-1 break-all"
              >
                {imageSource}
                <ExternalLink className="h-3 w-3 flex-shrink-0" />
              </a>
            ) : (
              <p className="text-base text-muted-foreground">Not available</p>
            )}
          </div>
        </div>
      </div>
    </SlideOver>
  );
};

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
  const [isOpen, setIsOpen] = useState(false);
  const randomBackground =
    backgroundOptions[Math.floor(Math.random() * backgroundOptions.length)];

  return (
    <>
      <div
        className={`aspect-square transition-opacity hover:opacity-80 rounded-lg overflow-hidden relative cursor-pointer ${randomBackground} ${
          isLoading ? "animate-pulse" : ""
        }`}
        title={album}
        onClick={() => setIsOpen(true)}
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

      <CoverDialog
        album={album}
        imageUrl={imageUrl}
        imageSource={imageSource}
        year={year}
        musicArtistName={musicArtistName}
        musicArtistUrl={musicArtistUrl}
        coverArtistName={coverArtistName}
        coverArtistUrl={coverArtistUrl}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

