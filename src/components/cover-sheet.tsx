"use client";

import { ExternalLink } from "lucide-react";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { Cover } from "@/types/api";

interface CoverSheetProps {
  cover: Cover | null;
  isOpen: boolean;
  onClose: () => void;
}

const getDomainFromUrl = (url: string): string => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};

export function CoverSheet({ cover, isOpen, onClose }: CoverSheetProps) {
  if (!cover) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-[450px] px-2">
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold">
            {cover.album}
          </SheetTitle>
        </SheetHeader>
        <div className="px-4 pt-2 pb-6 space-y-6 overflow-y-auto">
          {/* Cover Image */}
          <div className="aspect-square rounded-lg overflow-hidden relative">
            <Image
              src={cover.imageUrl}
              alt={cover.album}
              fill
              className="object-cover"
            />
          </div>

          {/* Album Information */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">
                Cover Artist
              </h3>
              {cover.coverArtistUrl ? (
                <a
                  href={cover.coverArtistUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-primary hover:underline inline-flex items-center gap-1"
                >
                  {cover.coverArtistName}
                  <ExternalLink className="h-3 w-3" />
                </a>
              ) : (
                <p className="text-base">{cover.coverArtistName}</p>
              )}
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">
                Music Artist
              </h3>
              {cover.musicArtistUrl ? (
                <a
                  href={cover.musicArtistUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-primary hover:underline inline-flex items-center gap-1"
                >
                  {cover.musicArtistName}
                  <ExternalLink className="h-3 w-3" />
                </a>
              ) : (
                <p className="text-base">{cover.musicArtistName}</p>
              )}
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">
                Year
              </h3>
              <p className="text-base">
                {Number.isNaN(cover.year) || !cover.year ? "—" : cover.year}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">
                Image Source
              </h3>
              {cover.sourceUrl ? (
                <a
                  href={cover.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-primary hover:underline inline-flex items-center gap-1 break-all"
                >
                  {getDomainFromUrl(cover.sourceUrl)}
                  <ExternalLink className="h-3 w-3 flex-shrink-0" />
                </a>
              ) : (
                <p className="text-base text-muted-foreground">Not available</p>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
