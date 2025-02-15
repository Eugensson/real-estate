import { RiHome5Line } from "react-icons/ri";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TypeDropdownProps {
  types: string[];
  selected: string;
  setSelected: (value: string) => void;
}

export const TypeDropdown = ({
  types,
  selected,
  setSelected,
}: TypeDropdownProps) => {
  return (
    <Select onValueChange={setSelected} value={selected}>
      <SelectTrigger className="dropdown capitalize">
        <div className="flex items-center">
          <RiHome5Line className="dropdown-icon-primary" />
          <SelectValue placeholder="Select a type" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem
          key="all"
          value="all"
          className="cursor-pointer focus:text-violet-700 transition-colors"
        >
          All types
        </SelectItem>
        {types.map((type) => (
          <SelectItem
            key={type}
            value={type}
            className="capitalize cursor-pointer focus:text-violet-700 transition-colors"
          >
            {type}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
