import { RiMapPinLine } from "react-icons/ri";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CountryDropdownProps {
  countries: string[];
  selected: string;
  setSelected: (value: string) => void;
}

export const CountryDropdown = ({
  countries,
  selected,
  setSelected,
}: CountryDropdownProps) => {
  return (
    <Select onValueChange={setSelected} value={selected}>
      <SelectTrigger className="dropdown capitalize">
        <div className="flex items-center">
          <RiMapPinLine className="dropdown-icon-primary" />
          <SelectValue placeholder="Select a location" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem
          key="all"
          value="all"
          className="cursor-pointer focus:text-violet-700 transition-colors"
        >
          All location
        </SelectItem>
        {countries.map((country) => (
          <SelectItem
            key={country}
            value={country}
            className="capitalize cursor-pointer focus:text-violet-700 transition-colors"
          >
            {country}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
