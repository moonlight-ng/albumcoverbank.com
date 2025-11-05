import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Cover } from "../components/Cover";
import { Aside } from "../components/Aside";

const albums = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
];

const Index = () => {
  return (
    <div className="flex h-screen w-full bg-background">
      <Aside />

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center gap-3 border-b border-border px-6 py-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search albums, artists, designers..."
              className="pl-9 border rounded-full"
            />
          </div>
          <Link to="/submit">
            <Button>Submit a cover</Button>
          </Link>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {albums.map((album) => (
              <Cover key={album.id} id={album.id} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
