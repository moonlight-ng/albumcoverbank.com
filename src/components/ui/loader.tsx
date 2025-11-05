import { useTheme } from "../../hooks/useTheme";

interface LoaderProps {
  message?: string;
}

export const Loader = ({ message }: LoaderProps) => {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center h-full gap-3">
      <img 
        src={theme === "dark" ? "/logo-white.svg" : "/logo.svg"}
        alt="Album Cover Bank" 
        className="h-12 w-12 animate-pulse"
      />
      {message && (
        <p className="text-muted-foreground opacity-50">
          {message}
        </p>
      )}
    </div>
  );
};

