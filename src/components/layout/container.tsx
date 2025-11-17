import { cn } from "@/lib/utils";

type PageContainerProps = React.HtmlHTMLAttributes<HTMLDivElement>;

export function PageContainer({
  children,
  className,
  ...props
}: PageContainerProps) {
  return (
    <div className={cn("mx-auto w-full h-full container", className)} {...props}>
      {children}
    </div>
  );
}
