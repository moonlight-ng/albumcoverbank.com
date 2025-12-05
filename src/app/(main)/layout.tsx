import { Aside } from "@/components/layout/aside";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      {/* Fixed banner – 40px high */}
      <div className="fixed top-0 left-0 right-0 z-50 w-full bg-yellow-500 text-yellow-900 px-4 py-2 text-center text-sm font-medium">
        Site is under construction and will be ready soon
      </div>

      {/* Main grid under the banner */}
      <div
        className="
          grid
          sm:grid-cols-[auto_1fr]
          w-full
          bg-background
          overflow-hidden
          h-[calc(100vh-40px)]
          mt-10
        "
      >
        <div className="min-h-0 min-w-0 overflow-hidden">
          <Aside />
        </div>

        {/* Main content area – this is allowed to scroll */}
        <main className="flex flex-col min-h-0 min-w-0 overflow-hidden">
          {/* Inner scroll region */}
          <div className="flex-1 min-h-0 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </>
  );
};

export default MainLayout;
