"use client";

import * as React from "react";
import { CheckIcon, ChevronsUpDownIcon, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "./ui/separator";

interface ComboboxProps<T> {
  options: T[];

  /** REQUIRED selectors */
  getLabel: (item: T) => string;
  getValue: (item: T) => string;

  defaultValue?: string;
  onChange?: (value: T | null) => void;
  label?: string;

  onActionEmpty?: (search: string) => void;
  onSearchEmpty?: (isEmpty: boolean, search: string) => void;
}

export function Combobox<T>({
  options,
  getLabel,
  getValue,
  defaultValue = "",
  onChange,
  label,
  onActionEmpty,
  onSearchEmpty,
}: ComboboxProps<T>) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string>(defaultValue);
  const [search, setSearch] = React.useState("");

  /** Filter options based on search */
  const filteredOptions = React.useMemo(() => {
    return options.filter((opt) =>
      getLabel(opt).toLowerCase().includes(search.toLowerCase())
    );
  }, [options, search, getLabel]);

  const isSearchEmpty = search.length > 0 && filteredOptions.length === 0;

  /** Selected item */
  const selectedItem = React.useMemo(
    () => options.find((opt) => getValue(opt) === value),
    [options, value, getValue]
  );

  const selectedLabel = selectedItem
    ? getLabel(selectedItem)
    : label || "Select option...";

  const handleSelect = (selectedValue: string) => {
    const newValue = selectedValue === value ? "" : selectedValue;
    setValue(newValue);

    const selected = options.find((opt) => getValue(opt) === newValue);

    onChange?.(selected ?? null);
    setOpen(false);
  };

  React.useEffect(() => {
    onSearchEmpty?.(isSearchEmpty, search);
  }, [isSearchEmpty, search, onSearchEmpty]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedLabel}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            value={search}
            onValueChange={setSearch}
            placeholder="Search..."
          />

          <CommandList>
            <CommandEmpty className="p-2">
              <div className="flex flex-col text-xs space-y-1">
                No results found.
                <Separator />
                <span className="flex justify-between items-center text-lg">
                  {search}
                  <Button
                    onClick={() => onActionEmpty?.(search)}
                    className="cursor-pointer shadow-md"
                  >
                    <Plus />
                  </Button>
                </span>
              </div>
            </CommandEmpty>

            <CommandGroup>
              {filteredOptions.map((opt) => {
                const optValue = getValue(opt);
                const optLabel = getLabel(opt);

                return (
                  <CommandItem
                    key={optValue}
                    value={optValue}
                    onSelect={handleSelect}
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === optValue ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {optLabel}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
