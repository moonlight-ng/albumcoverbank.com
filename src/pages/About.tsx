import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <img src="/logo.svg" alt="Logo" className="h-6 w-6" />
  );
};

const About = () => {
  return (
    <div className="flex h-screen w-full bg-background">
      <aside className="hidden md:flex w-16 flex-col items-center justify-between border-r border-border py-6">
        <div>
          <Link to="/" className="mb-4 block">
            <Logo />
          </Link>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center gap-3 border-b border-border px-6 py-4">
          <h1 className="text-2xl font-semibold">About</h1>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">About Album Cover Bank</h2>
            <p className="text-muted-foreground mb-4">
              Album Cover Bank is a curated collection of album cover art from around the world.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;

