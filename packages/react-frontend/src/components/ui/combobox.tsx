import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export type ComboboxProps = {
  options: {
    value: string;
    label: string;
  }[];
  placeholder?: string;
  emptyText?: string;
  notFoundText?: string;
  value?: string;
  onChange?: (value: string) => void;
};

export function Combobox(props: ComboboxProps) {
  const {
    options,
    placeholder = "Select an option...",
    emptyText = "Select an option...",
    notFoundText = "No results found.",
    value,
    onChange,
  } = props;

  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState(value);

  React.useEffect(() => {
    setInternalValue(value);
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full text-left font-normal"
        >
          <span>
            {internalValue
              ? options.find((framework) => framework.value === internalValue)
                  ?.label
              : placeholder}
          </span>
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 popover-content">
        <Command>
          <CommandInput placeholder={emptyText} className="h-9" />
          <CommandEmpty>{notFoundText}</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={(currentValue) => {
                  setInternalValue(
                    currentValue === internalValue ? "" : currentValue
                  );
                  setOpen(false);
                  onChange?.(currentValue);
                }}
              >
                {option.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    internalValue === option.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
