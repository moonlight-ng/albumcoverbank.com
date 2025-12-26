import { Aside } from "@/components/layout/aside";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div
      className="
        grid
        sm:grid-cols-[auto_1fr]
        w-full
        bg-background
        overflow-hidden
        h-screen
      "
    >
      <div className="min-h-0 min-w-0 overflow-hidden">
        <Aside />
      </div>

      {/* Main content area – this is allowed to scroll */}
      <main className="flex flex-col min-h-0 min-w-0 overflow-hidden">
        {/* Inner scroll region */}
        <div className="flex-1 min-h-0 overflow-auto">{children}</div>
      </main>
    </div>
  );
};

export default MainLayout;
