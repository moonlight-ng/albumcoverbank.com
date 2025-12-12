import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/constants/site";

export const metadata: Metadata = {
  title: "Submit a Cover",
  description:
    "Submit a Nigerian album cover to Cover Bank. Help us expand our archive and preserve more pieces of Nigeria's rich musical and design heritage.",
  openGraph: {
    title: `Submit a Cover - ${SITE_CONFIG.title}`,
    description:
      "Submit a Nigerian album cover to Cover Bank. Help us expand our archive and preserve more pieces of Nigeria's rich musical and design heritage.",
    url: `${SITE_CONFIG.url}/submit`,
  },
};

export default function SubmitPage() {
  return (
    <>
      <header className="flex items-center w-full justify-center py-4">
        <h1 className="text-xl font-semibold tracking-tight sr-only">
          Submit a cover
        </h1>
      </header>

      <div className="flex-1 overflow-y-auto">
        <section className="mx-auto w-full max-w-xl px-6 md:px-8 py-10 space-y-8">
          <div className="space-y-5 leading-relaxed">
            <p className="text-muted-foreground">
              Have a Nigerian album cover that belongs in our archive?
              We&apos;re always looking to expand our collection and preserve
              more pieces of Nigeria&apos;s rich musical and design heritage.
            </p>
            <p className="text-muted-foreground">
              Whether it&apos;s a classic from the &apos;60s or a recent
              release, we welcome submissions that help us build the most
              comprehensive archive of Nigerian album artwork.
            </p>
            <p className="text-muted-foreground">
              To submit a cover, please include the album name, artist, year,
              cover designer (if known), and a high-quality image. We review all
              submissions and will add them to the archive if they meet our
              standards.
            </p>
          </div>

          <div className="pt-4">
            <Button asChild className="w-full rounded-full" size="lg">
              <Link target="_blank" href="https://www.notion.so/moonlight-studios/2af599ecfca680b9a98eda781e2935b0">
                Submit a cover
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
