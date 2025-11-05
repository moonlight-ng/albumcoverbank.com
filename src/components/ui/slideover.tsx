import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";
import { useTheme } from "../../hooks/useTheme";

interface SlideOverProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const SlideOver = ({
  isOpen,
  onClose,
  title,
  children,
  className,
}: SlideOverProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        {/* Backdrop */}
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            aria-hidden="true"
          />
        </Transition.Child>

        {/* Dialog panel sliding from right */}
        <div className="fixed inset-0 flex items-center justify-end pointer-events-none">
          <Transition.Child
            as={React.Fragment}
            enter="transform transition ease-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel
              className={cn(
                "w-full max-w-md h-full shadow-xl pointer-events-auto flex flex-col",
                className
              )}
              style={{
                backgroundColor: isDark ? 'hsl(var(--background))' : '#ffffff'
              }}
            >
              {/* Header */}
              {title && (
                <div className="flex items-center justify-between px-6 pt-4 pb-0 shrink-0 relative z-10">
                  <Dialog.Title className="text-xl font-semibold">
                    {title}
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    aria-label="Close dialog"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              )}

              {/* Content with fade effect */}
              <div className="relative flex-1 overflow-hidden">
                <div className={cn("h-full overflow-y-auto scroll-fade", isDark ? "scroll-fade-dark" : "scroll-fade-light")}>
                  {children}
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

