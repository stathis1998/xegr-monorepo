import { useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { isNumeric } from "@/lib/utils";

export type FilterButtonProps = {
  label: string;
  onChange?: (value: [number, number]) => void;
  subLabel1?: string;
  subLabel2?: string;
};

export function FilterButton(props: FilterButtonProps) {
  const { label, onChange, subLabel1, subLabel2 } = props;

  const [value, setValue] = useState<[number, number]>([0, 0]);

  const [open, setOpen] = useState(false);

  function handleChange(val: string, index: number) {
    if (isNumeric(val) || val === "") {
      if (val === "") {
        val = "0";
      }
      if (index !== 0) {
        setValue((prev) => {
          onChange && onChange([prev[0], parseInt(val)]);
          return [prev[0], parseInt(val)];
        });
      } else {
        setValue((prev) => {
          onChange && onChange([parseInt(val), prev[1]]);
          return [parseInt(val), prev[1]];
        });
      }
    }
  }

  return (
    <div className="relative">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant={"outline"}>
            {value[0] && value[1] && !open
              ? `${value[0]} - ${value[1]}`
              : label}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex gap-2 w-[350px]" align="start">
          <div className="relative">
            <Input
              value={value[0]}
              onChange={(e) => handleChange(e.target.value, 0)}
            />
            {subLabel1 && (
              <span className="absolute bg-white -top-2 left-2 text-xs px-1">
                {subLabel1}
              </span>
            )}
          </div>
          <div className="relative">
            <Input
              value={value[1]}
              onChange={(e) => handleChange(e.target.value, 1)}
            />
            {subLabel2 && (
              <span className="absolute bg-white -top-2 left-2 text-xs px-1">
                {subLabel2}
              </span>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
