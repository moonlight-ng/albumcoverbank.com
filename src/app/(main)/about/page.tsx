import type { Metadata } from "next";
import { SITE_CONFIG } from "@/constants/site";
import { contributors } from "@/constants/conteibutors";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Cover Bank, Nigeria's largest digital archive of album artwork. Discover our mission to preserve and celebrate Nigerian musical heritage and album cover design.",
  openGraph: {
    title: `About - ${SITE_CONFIG.title}`,
    description:
      "Learn about Cover Bank, Nigeria's largest digital archive of album artwork. Discover our mission to preserve and celebrate Nigerian musical heritage and album cover design.",
    url: `${SITE_CONFIG.url}/about`,
  },
};

export default function AboutPage() {
  const roleOrder = ["Producer", "Researcher", "Designer", "Engineer"] as const;

  const rolePriority = Object.fromEntries(roleOrder.map((r, i) => [r, i]));

  const sortedContributors = [...contributors].sort((a, b) => {
    const ra = rolePriority[a.role as (typeof roleOrder)[number]] ?? 999;
    const rb = rolePriority[b.role as (typeof roleOrder)[number]] ?? 999;
    if (ra !== rb) return ra - rb;
    return a.name.localeCompare(b.name);
  });

  return (
    <>
      <header className="flex items-center w-full justify-center py-4">
        <h1 className="text-xl font-semibold text-center tracking-tight sr-only">
          About
        </h1>
      </header>

      <div className="flex-1 overflow-y-auto">
        <section className="mx-auto w-full max-w-xl px-6 md:px-8 py-10 space-y-12">
          <div className="space-y-5 leading-relaxed">
            <p className="text-muted-foreground">
              Cover Bank is Nigeria&apos;s largest digital archive of album
              artwork, home to over 5,300 covers from 1950 to today. Each piece
              captures a moment in time—from the bold experiments of the
              &apos;70s to the digital innovations of the present.
            </p>
            <p className="text-muted-foreground">
              We celebrate two stories: Nigeria&apos;s rich musical heritage and
              the brilliant designers who gave it visual power. Through
              extensive research, we&apos;re building the first complete history
              of Nigerian album cover design—finally giving these creators their
              due.
            </p>
            <p className="text-muted-foreground">
              Cover Bank isn&apos;t just an archive—it&apos;s a living source of
              inspiration for historians, designers, educators, and anyone
              captivated by the evolution of African design.
            </p>
            <p className="text-muted-foreground">
              This project is funded and maintained by{" "}
              <a
                href="https://independent-arts.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Independent Arts
              </a>
              , a creative incubator dedicated to nurturing Nigerian artistry.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            <h2 className="text-lg font-semibold tracking-tight">
              Contributors
            </h2>

            <ul className="divide-y rounded-xl border bg-card/50 backdrop-blur-sm">
              {sortedContributors.map(({ name, role }) => (
                <li
                  key={`${name}-${role}`}
                  className="flex items-baseline justify-between gap-4 px-4 py-3"
                >
                  <span className="text-sm md:text-base font-medium text-foreground">
                    {name}
                  </span>
                  <span className="text-xs md:text-sm text-muted-foreground">
                    {role}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
