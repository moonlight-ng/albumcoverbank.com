import { Popover, Transition } from "@headlessui/react";
import { ReactNode } from "react";

interface FilterDropdownProps {
  icon: ReactNode;
  label: string;
}

export const FilterDropdown = ({ icon, label }: FilterDropdownProps) => {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button className="flex h-12 w-12 items-center justify-center text-foreground transition-opacity hover:opacity-60">
            {icon}
          </Popover.Button>
          <Transition
            show={open}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              className="absolute left-full top-0 z-50 w-64 bg-popover border border-border p-4 shadow-md outline-none ml-2"
            >
              <div className="space-y-2">
                <h4 className="font-medium text-sm">{label}</h4>
                <p className="text-sm text-muted-foreground">Filter options coming soon...</p>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};
