"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RiSearch2Line } from "react-icons/ri";

import { TypeDropdown } from "@/components/type-dropdown";
import { CountryDropdown } from "@/components/country-dropdown";
import { PriceRangeDropdown } from "@/components/price-range-dropdown";

interface SearchBarProps {
  types: string[];
  countries: string[];
}

export const SearchBar = ({ types, countries }: SearchBarProps) => {
  const router = useRouter();

  const [selectedType, setSelectedType] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams();

    if (selectedType) params.set("type", selectedType);
    if (selectedCountry) params.set("country", selectedCountry);
    if (selectedPrice) params.set("price", selectedPrice);

    router.push(`/?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative lg:-top-4 px-8 py-6 max-w-[1170px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-x-3 lg:shadow-1 bg-white lg:bg-transparent lg:backdrop-blur rounded-lg"
    >
      <CountryDropdown
        countries={countries}
        selected={selectedCountry}
        setSelected={setSelectedCountry}
      />
      <TypeDropdown
        types={types}
        selected={selectedType}
        setSelected={setSelectedType}
      />
      <PriceRangeDropdown
        selected={selectedPrice}
        setSelected={setSelectedPrice}
      />
      <button
        type="submit"
        className="w-full lg:max-w-[162px] h-16 flex items-center justify-center bg-violet-700 hover:bg-violet-800 text-white rounded-lg transition-colors"
      >
        <RiSearch2Line size={18} />
      </button>
    </form>
  );
};
