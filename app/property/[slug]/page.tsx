import Link from "next/link";
import Image from "next/image";
import { BiBed, BiBath, BiArea } from "react-icons/bi";

import {
  getAgentById,
  getPropertyBySlug,
} from "@/lib/db/actions/property.actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = (await params).slug;
  try {
    const property = await getPropertyBySlug(slug);
    if (!property) {
      return { title: "Property not found" };
    }

    return {
      title: property.name,
      description: property.description,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return { title: "Property not found" };
  }
};

const PropertyDetails = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = (await params).slug;

  const {
    bedrooms,
    bathrooms,
    surface,
    price,
    name,
    image,
    address,
    type,
    country,
    description,
    agent,
  } = await getPropertyBySlug(slug);

  const {
    image: agentImage,
    name: agentName,
    phone,
  } = await getAgentById(agent.toString());

  return (
    <section className="min-h-[800px] mb-14">
      <div className="container">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">{name}</h2>
            <address className="not-italic text-lg mb-4">{address}</address>
          </div>
          <div className="mb-4 lg:mb-0 flex gap-x-2 text-sm">
            <p className="bg-green-500 text-white rounded-full px-3 py-0.5 capitalize">
              {type}
            </p>
            <p className="bg-violet-500 text-white rounded-full px-3 py-0.5 capitalize">
              {country}
            </p>
          </div>
          <p className="text-3xl font-semibold text-violet-600">$ {price}</p>
        </div>
        <div className="flex flex-col lg:flex-row items-start gap-8">
          <div className="w-full max-w-screen-md">
            <div className="relative mb-8  h-[500px]">
              <Image
                src={image}
                alt={`${name} image`}
                fill
                quality={100}
                className="object-cover w-full h-full"
              />
            </div>
            <ul className="flex gap-x-6 mb-6">
              <li className="flex items-center gap-x-2 text-violet-700">
                <BiBed size={24} className="" />
                {bedrooms}
              </li>
              <li className="flex items-center gap-x-2 text-violet-700">
                <BiBath size={24} />
                {bathrooms}
              </li>
              <li className="flex items-center gap-x-2 text-violet-700">
                <BiArea size={24} />
                {surface} sq ft
              </li>
            </ul>
            <p>{description}</p>
          </div>
          <div className="mb-8 px-6 py-8 flex-1 w-full border border-gray-300 rounded-lg bg-white">
            <div className="flex items-center gap-x-4 mb-8">
              <div className="size-20 rounded-full p-1 border border-gray-300">
                <Image
                  src={agentImage}
                  alt={`${agentName} image`}
                  width={80}
                  height={80}
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <p className="text-lg font-bold">{agentName}</p>
                <Link href="#" className="text-violet-700 text-sm capitalize">
                  View listings
                </Link>
              </div>
            </div>
            <form className="flex flex-col gap-y-4">
              <Input placeholder="Name*" />
              <Input placeholder="Email*" />
              <Input placeholder="Phone number*" />
              <Textarea placeholder="Type your message here" />
              <div className="flex items-center gap-x-2">
                <button
                  type="submit"
                  className="text-sm bg-violet-700 hover:bg-violet-800 text-white p-4 rounded transition-colors flex-1"
                >
                  Send message
                </button>
                <Link
                  href={`tel:${phone}`}
                  type="button"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Call agent"
                  className="flex-1 flex items-center justify-center border border-violet-700 text-violet-700 hover:text-violet-500 hover:border-violet-500 transition-colors p-4 rounded text-sm"
                >
                  Call
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyDetails;
