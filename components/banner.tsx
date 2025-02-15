import Image from "next/image";

import bannerImg from "@/public/images/banner.png";
import { SearchBar } from "@/components/search-bar";

import {
  getAllCountries,
  getAllTypes,
} from "@/lib/db/actions/property.actions";

export const Banner = async () => {
  const types = await getAllTypes();
  const countries = await getAllCountries();

  return (
    <section className="h-full max-h-[640px] mb-8 xl:mb-24">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:ml-8 xl:ml-[135px] flex flex-col items-center lg:items-start justify-center flex-1 text-center lg:text-left px-4 lg:px-0">
          <h1 className="text-4xl lg:text-[58px] font-semibold leading-none mb-6 capitalize">
            <span className="text-violet-700">Rent</span> your dream house with
            us.
          </h1>
          <p className="max-w-[480px] mb-8 xl:text-lg">
            Find the perfect home for yourself and your family. Choose from
            thousands of verified properties at great prices. Transparent terms,
            secure transactions, and full support at every stage of buying or
            renting!
          </p>
        </div>
        <div className="hidden flex-1 lg:flex items-end justify-end">
          <Image priority src={bannerImg} alt="banner" />
        </div>
      </div>
      <SearchBar types={types} countries={countries} />
    </section>
  );
};
