import * as React from "react";
import { Popover as HeadlessPopover, Transition } from "@headlessui/react";
import { cn } from "../../lib/utils";

interface PopoverProps {
  children: (props: { open: boolean }) => React.ReactNode;
}

const PopoverRoot: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <HeadlessPopover className="relative">{children}</HeadlessPopover>;
};

const PopoverTrigger = HeadlessPopover.Button;

interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "left" | "right" | "top" | "bottom";
}

const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ className, side = "right", children, ...props }, ref) => {
    return (
      <Transition
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <HeadlessPopover.Panel
          ref={ref}
          className={cn(
            "absolute z-50 bg-popover border border-border p-4 shadow-md outline-none",
            {
              "left-full top-0": side === "right",
              "right-full top-0": side === "left",
              "bottom-full left-0": side === "top",
              "top-full left-0": side === "bottom",
            },
            className
          )}
          {...props}
        >
          {children}
        </HeadlessPopover.Panel>
      </Transition>
    );
  }
);
PopoverContent.displayName = "PopoverContent";

// Create a wrapper component for easier usage
const Popover: React.FC<{ children: React.ReactNode }> & {
  Trigger: typeof PopoverTrigger;
  Content: typeof PopoverContent;
} = ({ children }) => {
  return <PopoverRoot>{children}</PopoverRoot>;
};

Popover.Trigger = PopoverTrigger;
Popover.Content = PopoverContent;

export { Popover, PopoverTrigger, PopoverContent };
