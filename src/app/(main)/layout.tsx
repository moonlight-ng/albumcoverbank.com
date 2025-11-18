import { Aside } from "@/components/layout/aside";


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
