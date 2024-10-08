import { Check, ChevronsUpDown } from "lucide-react";

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
import React, { useState } from "react";
import { IBook } from "@/types";

const filters = [
  {
    value: "Rent:high-to-low",
    label: "Rent: High to Low",
  },
  {
    value: "Rent:low-to-high",
    label: "Rent: Low to High",
  },
];

const Filters = ({
  books,
  filteredBooks,
  setFilteredBooks,
  setMaxVal,
  setMinVal,
}: {
  books: IBook[];
  filteredBooks: IBook[];
  setFilteredBooks: React.Dispatch<React.SetStateAction<IBook[]>>;
  setMaxVal: React.Dispatch<React.SetStateAction<number>>;
  setMinVal: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[180px] justify-between"
        >
          {value
            ? filters.find((filter) => filter.value === value)?.label
            : "Select filter..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {filters.map((filter) => (
                <CommandItem
                  key={filter.value}
                  value={filter.value}
                  onSelect={(currentValue) => {
                    // setValue(currentValue === value ? "" : currentValue);
                    if (currentValue === value) {
                      setValue("");
                      setFilteredBooks(books);
                      setMaxVal(100);
                      setMinVal(0);
                    } else {
                      setValue(currentValue);
                      const sortedBooks = [...filteredBooks].sort((a, b) => {
                        if (currentValue === "Rent:high-to-low") {
                          return b.rentPerDay - a.rentPerDay;
                        } else {
                          return a.rentPerDay - b.rentPerDay;
                        }
                      });

                      setFilteredBooks(sortedBooks);
                    }
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === filter.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {filter.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Filters;
