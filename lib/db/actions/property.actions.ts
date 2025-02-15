"use server";

import { connectToDatabase } from "@/lib/db";
import { Agent, IAgent } from "@/lib/db/models/agent.model";
import { Property, IProperty } from "@/lib/db/models/property.model";

export const getAllTypes = async () => {
  await connectToDatabase();
  const types = await Property.find().distinct("type");
  return types;
};

export const getAllCountries = async () => {
  await connectToDatabase();
  const countries = await Property.find().distinct("country");
  return countries;
};

export const getPropertyBySlug = async (slug: string) => {
  await connectToDatabase();

  const property = await Property.findOne({ slug });

  if (!property) throw new Error("Property not found");

  return JSON.parse(JSON.stringify(property)) as IProperty;
};

export const getAgentById = async (agentId: string) => {
  await connectToDatabase();

  const agent = await Agent.findById(agentId);

  return JSON.parse(JSON.stringify(agent)) as IAgent;
};

export const getAllProperties = async ({
  country,
  type,
  price,
  limit,
  page,
  sort,
}: {
  country?: string;
  type?: string;
  limit?: number;
  page?: number;
  price?: string;
  sort?: string;
}) => {
  limit = limit ?? 6;

  await connectToDatabase();

  const countryFilter = country && country !== "all" ? { country } : {};

  const typeFilter = type && type !== "all" ? { type } : {};

  const priceFilter =
    price && price !== "all"
      ? {
          price: {
            $gte: Number(price.split("-")[0]),
            $lte: Number(price.split("-")[1]),
          },
        }
      : {};

  const order: Record<string, 1 | -1> =
    sort === "best-selling"
      ? { numSales: -1 }
      : sort === "price-low-to-high"
      ? { price: 1 }
      : sort === "price-high-to-low"
      ? { price: -1 }
      : sort === "avg-customer-review"
      ? { avgRating: -1 }
      : { _id: -1 };

  const properties = await Property.find({
    ...countryFilter,
    ...typeFilter,
    ...priceFilter,
  })
    .sort(order)
    .skip(limit * (Number(page) - 1))
    .limit(limit)
    .lean();

  const countProperties = await Property.countDocuments({
    ...countryFilter,
    ...typeFilter,
    ...priceFilter,
  });

  const types = await getAllTypes();
  const countries = await getAllCountries();

  return {
    properties: JSON.parse(JSON.stringify(properties)) as IProperty[],
    totalPages: Math.ceil(countProperties / limit),
    totalProperties: countProperties,
    from: limit * (Number(page) - 1) + 1,
    to: limit * (Number(page) - 1) + properties.length,
    types,
    countries,
  };
};
