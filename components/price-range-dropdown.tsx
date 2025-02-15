import { RiWallet3Line } from "react-icons/ri";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const prices = [
  { label: "0 - 50000", value: "0-50000" },
  { label: "50000 - 75000", value: "50001-75000" },
  { label: "75000 - 100000", value: "75001-100000" },
  { label: "100000 - 150000", value: "100001-150000" },
  { label: "150000 - 300000", value: "150001-300000" },
  { label: "300000 - 500000", value: "300001-500000" },
];

interface PriceRangeDropdownProps {
  selected: string;
  setSelected: (value: string) => void;
}

export const PriceRangeDropdown = ({
  selected,
  setSelected,
}: PriceRangeDropdownProps) => {
  return (
    <Select onValueChange={setSelected} value={selected}>
      <SelectTrigger className="dropdown capitalize">
        <div className="flex items-center">
          <RiWallet3Line className="dropdown-icon-primary" />
          <SelectValue placeholder="Choose price range" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem
          key="all"
          value="all"
          className="cursor-pointer focus:text-violet-700 transition-colors"
        >
          Price range (all)
        </SelectItem>
        {prices.map(({ label, value }) => (
          <SelectItem
            key={label}
            value={value}
            className="capitalize cursor-pointer focus:text-violet-700 transition-colors"
          >
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
