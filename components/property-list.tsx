import { PropertyCard } from "@/components/property-card";

import { IPropertyInput } from "@/types";

interface PropertyListProps {
  items: IPropertyInput[];
}

export const PropertyList = ({ items }: PropertyListProps) => {
  return (
    <section className="mb-20">
      <div className="container">
        {items.length === 0 ? (
          <p className="text-center text-3xl text-gray-400 mt-48">
            Sorry, nothing found
          </p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-14">
            {items.map((property: IPropertyInput) => (
              <li key={property.slug}>
                <PropertyCard property={property} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};
