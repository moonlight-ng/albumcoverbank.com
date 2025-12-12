import { getBaseUrl } from "@/lib/utils";

export const SITE_CONFIG = {
  title: "Cover Bank",
  description:
    "A searchable archive of 5000+ images of Nigerian album cover art",
  openGraphImage: "/meta.webp",
  favicon: "/favicon.ico",
  url: getBaseUrl(),
  image: "/seo.jpg",
  keywords: [
    "album covers",
    "art",
    "graphic design",
    "music",
    "nigeria",
    "archives",
  ],
};

export const SITE_URL = `${getBaseUrl()}`;
