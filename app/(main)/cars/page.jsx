import { getCarFilters } from "@/actions/car-listing";
import React from "react";
import CarFilters from "./_components/car-filters";
import { CarListings } from "./_components/car-listing";

export const metaData = {
  title: "Cars | Vehiql",
  description: "Browse and search for your dream car",
};

export default async function CarsPage() {
  const filtersData = await getCarFilters();
  return (
    <div className="mt-28 container mx-auto py-12">
      <h1 className="text-6xl mb-4 gradient-title">Browse Cars</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-80 flex flex-shrink-0">
          {/* Filters */}
          <CarFilters filters={filtersData.data}></CarFilters>
        </div>
        <div className="flex-1">
          {/* Listing */}

          <CarListings />
        </div>
      </div>
    </div>
  );
}
