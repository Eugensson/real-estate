import { Banner } from "@/components/banner";
import { PropertyList } from "@/components/property-list";

import { getAllProperties } from "@/lib/db/actions/property.actions";

export const generateMetadata = async (props: {
  searchParams: Promise<{
    country: string;
    type: string;
    price: string;
    sort: string;
    page: string;
  }>;
}) => {
  const searchParams = await props.searchParams;

  const { country = "all", type = "all", price = "all" } = searchParams;

  if (country !== "all" || type !== "all" || price !== "all") {
    return {
      title: `Search
          ${country !== "all" ? ` : Country ${country}` : ""}
          ${type !== "all" ? ` : Type ${type}` : ""}          
          ${price !== "all" ? ` : Price ${price}` : ""}`,
    };
  } else {
    return {
      title: "Search Products",
    };
  }
};

const Home = async (props: {
  searchParams: Promise<{
    country: string;
    type: string;
    price: string;
    sort: string;
    page: string;
  }>;
}) => {
  const searchParams = await props.searchParams;

  const {
    country = "all",
    type = "all",
    price = "all",
    sort = "best-selling",
    page = "1",
  } = searchParams;

  const data = await getAllProperties({
    type,
    price,
    page: Number(page),
    sort,
    country,
  });

  return (
    <div>
      <Banner />
      <PropertyList items={data.properties} />
    </div>
  );
};

export default Home;
