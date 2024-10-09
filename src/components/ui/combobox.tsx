import { worldlyObject } from "@/pages/Homepage";
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
import { useState } from "react";
import { Button } from "./button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

type ComboboxProps = {
  data: worldlyObject[] | null;
  onValueChange: (value: worldlyObject) => void;
  selectedValue: worldlyObject | null;
};

export function Combobox({
  data,
  onValueChange,
  selectedValue,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (currentValue: string) => {
    const selectedObject = data?.find((object) => object.name === currentValue);
    if (selectedObject) {
      setOpen(false);
      onValueChange(selectedObject);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[170px] sm:w-[200px] pl-2 pr-1 justify-between"
        >
          <p className="text-xs sm:text-base">
            {selectedValue ? selectedValue.name : "Select thing..."}
          </p>
          <ChevronsUpDown className="ml-1 sm:ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[170px] sm:w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search things..." />
          <CommandList>
            <CommandEmpty>No objects found.</CommandEmpty>
            <CommandGroup>
              {data?.map((object: worldlyObject) => (
                <CommandItem
                  key={object.name}
                  value={object.name}
                  onSelect={handleSelect}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedValue?.name === object.name
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  <p className="text-xs sm:text-base">{object.name}</p>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
