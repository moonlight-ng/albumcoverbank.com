import type { Metadata } from "next";
import { Aside } from "@/components/layout/aside";
import { SITE_CONFIG } from "@/constants/site";

export const metadata: Metadata = {
  title: {
    default: "Explore 5000+ Nigerian Album Covers",
    template: `%s - ${SITE_CONFIG.title}`,
  },
  description: SITE_CONFIG.description,
  openGraph: {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.title,
    images: [
      {
        url: SITE_CONFIG.openGraphImage,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: SITE_CONFIG.openGraphImage,
        width: 1200,
        height: 630,
      },
    ],
  },
};

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 w-full bg-yellow-500 text-yellow-900 px-4 py-2 text-center text-sm font-medium">
        Site is under construction and will be ready soon
      </div>
      <div
        className="grid sm:grid-cols-[auto_1fr] w-full bg-background"
        style={{ height: "calc(100dvh - 40px)", marginTop: "40px" }}
      >
        <Aside />
        <main className="flex-1 flex flex-col overflow-hidden">{children}</main>
      </div>
    </>
  );
};

export default MainLayout;
