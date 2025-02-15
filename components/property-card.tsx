import Link from "next/link";
import Image from "next/image";
import { BiBed, BiBath, BiArea } from "react-icons/bi";

import { IPropertyInput } from "@/types";

interface PropertyCardProps {
  property: IPropertyInput;
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
  const {
    name,
    price,
    bedrooms,
    bathrooms,
    image,
    country,
    address,
    type,
    surface,
  } = property;

  return (
    <Link href={`/property/${property.slug}`}>
      <article className="bg-white shadow-1 p-5 rounded-lg rounded-tl-[90px] w-full max-w-[352px] mx-auto hover:shadow-2xl transition-shadow">
        <div className="relative mb-8 w-full h-[300px] overflow-hidden rounded-tl-[90px] rounded-tr-2xl rounded-bl-2xl rounded-br-[90px]">
          <Image
            src={image}
            alt={`${name} image`}
            fill
            quality={100}
            className="object-cover"
          />
        </div>
        <div className="mb-4 flex items-center gap-2 text-sm">
          <p className="bg-green-500 text-white rounded-full px-3 py-0.5 capitalize">
            {type}
          </p>
          <p className="bg-violet-500 text-white rounded-full px-3 py-0.5 capitalize">
            {country}
          </p>
        </div>
        <address className="not-italic text-lg font-semibold max-w-[85%] min-h-14 line-clamp-2">
          {address}
        </address>
        <ul className="flex gap-x-4 my-4">
          <li className="flex items-center gap-1 text-gray-600">
            <BiBed size={20} />
            {bedrooms}
          </li>
          <li className="flex items-center gap-1 text-gray-600">
            <BiBath size={20} />
            {bathrooms}
          </li>
          <li className="flex items-center gap-1 text-gray-600">
            <BiArea size={20} />
            {surface} sq ft
          </li>
        </ul>
        <p className="mb-4 text-lg font-semibold text-violet-600">$ {price}</p>
      </article>
    </Link>
  );
};
