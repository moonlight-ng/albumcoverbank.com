import { Calendar, Palette, Music, Search } from "lucide-react";
import { FilterDropdown } from "../components/FilterDropdown";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const albums = [
  { id: 1, color: "bg-zinc-800" },
  { id: 2, color: "bg-zinc-700" },
  { id: 3, color: "bg-zinc-600" },
  { id: 4, color: "bg-zinc-500" },
  { id: 5, color: "bg-zinc-400" },
  { id: 6, color: "bg-zinc-300" },
  { id: 7, color: "bg-zinc-200" },
  { id: 8, color: "bg-zinc-900" },
];

const Index = () => {
  return (
    <div className="flex h-screen w-full bg-background">
      <aside className="hidden md:flex w-16 flex-col items-center gap-4 border-r border-border py-6">
        <div className="mb-4">
          <Music className="h-6 w-6" />
        </div>
        <FilterDropdown icon={<Calendar className="h-5 w-5" />} label="Filter by Year" />
        <FilterDropdown icon={<Palette className="h-5 w-5" />} label="Filter by Designer" />
        <FilterDropdown icon={<Music className="h-5 w-5" />} label="Filter by Artist" />
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center gap-3 border-b border-border px-6 py-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search albums, artists, designers..."
              className="pl-9 border-border"
            />
          </div>
          <Button>Submit</Button>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {albums.map((album) => (
              <div
                key={album.id}
                className={`aspect-square ${album.color} transition-opacity hover:opacity-80`}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
