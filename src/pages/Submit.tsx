import { Aside } from "../components/Aside";

const Submit = () => {
  return (
    <div className="flex h-screen w-full bg-background">
      <Aside />

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center gap-3 border-b border-border px-6 py-4">
          <h1 className="text-2xl font-semibold">Submit a cover</h1>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          {/* Empty for now */}
        </div>
      </main>
    </div>
  );
};

export default Submit;
