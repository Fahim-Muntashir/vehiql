"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge, Filter, Sliders, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CarFilterControls from "./filter-controls";

const CarFilters = ({ filters }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get current filter values from searchParams
  const currentMake = searchParams.get("make") || "";
  const currentBodyType = searchParams.get("bodyType") || "";
  const currentFuelType = searchParams.get("fuelType") || "";
  const currentTransmission = searchParams.get("transmission") || "";

  const currentMinPrice = searchParams.get("minPrice")
    ? parseInt(searchParams.get("minPrice"))
    : filters.priceRange.min;

  const currentMaxPrice = searchParams.get("maxPrice")
    ? parseInt(searchParams.get("maxPrice"))
    : filters.priceRange.max;

  const currentSortBy = searchParams.get("sortBy") || "newest";

  // Individual filter states initialized from URL query parameters
  const [make, setMake] = useState(currentMake); // Car brand
  const [bodyType, setBodyType] = useState(currentBodyType); // Sedan, SUV, etc.
  const [fuelType, setFuelType] = useState(currentFuelType); // Petrol, Diesel, etc.
  const [transmission, setTransmission] = useState(currentTransmission); // Manual/Automatic

  // Price range as an array: [min, max]
  const [priceRange, setPriceRange] = useState([
    currentMinPrice, // From URL or fallback
    currentMaxPrice, // From URL or fallback
  ]);

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Sorting method (e.g. newest, priceAsc, priceDesc)
  const [sortBy, setSortBy] = useState(currentSortBy);
  // 🟢 Sync local state with updated URL query parameters
  useEffect(() => {
    setMake(currentMake);
    setBodyType(currentBodyType);
    setFuelType(currentFuelType);
    setTransmission(currentTransmission);
    setPriceRange([currentMinPrice, currentMaxPrice]);
    setSortBy(currentSortBy);
  }, [
    currentMake,
    currentBodyType,
    currentFuelType,
    currentTransmission,
    currentMinPrice,
    currentMaxPrice,
    currentSortBy,
  ]);

  const activeFilterCount = [
    make,
    bodyType,
    fuelType,
    transmission,
    currentMinPrice > filters.priceRange ||
      currentMaxPrice < filters.priceRange.max,
  ].filter(Boolean).length;

  const currentFilterCount = {
    make,
    bodyType,
    fuelType,
    transmission,
    priceRange,
    priceRangeMin: filters.priceRange.min,
    priceRangeMax: filters.priceRange.max,
  };

  const handleFilterChange = (filterName, value) => {
    switch (filterName) {
      case "make":
        setMake(value);
        break;

      case "bodyType":
        setBodyType(value);
        break;

      case "fuelType":
        setFuelType(value);
        break;

      case "transmission":
        setTransmission(value);
        break;

      case "priceRange":
        setPriceRange(value);
        break;
    }
  };

  const handleClearFilter = (filterName) => {
    handleFilterChange(filterName, "");
  };

  const clearFilters = () => {
    setMake(""); // Clear selected make
    setBodyType(""); // Clear selected body type
    setFuelType(""); // Clear selected fuel type
    setTransmission("");
    setPriceRange([filters.priceRange.min, filters.priceRange.max]);
    setSortBy("newest");

    const params = new URLSearchParams();
    const search = searchParams.get("search");

    if (search) params.sett("search", search);

    const query = params.toString();

    const url = query ? `${pathname}?${query}` : pathname;

    router.push(url);
    setIsSheetOpen(false);
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (make) params.set("make", make);
    if (bodyType) params.set("bodyType", bodyType);
    if (fuelType) params.set("fuelType", fuelType);
    if (transmission) params.set("transmission", transmission);

    if (priceRange[0] > filters.priceRange.min)
      params.set("minPrice", priceRange[0].toString());

    if (priceRange[1] < filters.priceRange.max)
      params.set("maxPrice", priceRange[1].toString());

    if (sortBy !== "newest") params.set("sortBy", sortBy);

    const search = searchParams.get("search");
    const page = searchParams.get("page");

    if (search) params.set("search", search);
    if (page && page !== "1") params.set("page", page);

    const query = params.toString();

    const url = query ? `${pathname}?${query}` : pathname;

    router.push(url);
    setIsSheetOpen(false);
  };

  return (
    <div className="flex lg:flex-col justify-between gap-4">
      {/* mobile filters */}
      <div className="lg:hidden mb-4">
        <div className="flex items-center">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant={"outline"} className={"flex items-center gap-2"}>
                <Filter className="h-4 w-4" /> Filters
                {activeFilterCount > 0 && (
                  <Badge className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent
              className={"w-full sm:max-w-md ovreflow-y-auto"}
              side="left"
            >
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>

              <div className="py-6">
                <CarFilterControls
                  filters={filters}
                  currentFilters={currentFilterCount}
                  onFilterChange={handleFilterChange}
                  onClearFilter={handleClearFilter}
                ></CarFilterControls>
              </div>

              <SheetFooter
                className={
                  "sm:justify-between flex-row pt-2 border-t space-x-4 mt-auto"
                }
              >
                <Button
                  type="button"
                  variant={"outline"}
                  onClick={clearFilters}
                  className={"flex-1"}
                >
                  Reset
                </Button>
                <Button
                  type="button"
                  onClick={applyFilters}
                  className={"flex-1"}
                >
                  Show Result
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/*Sort Selection */}
      <Select
        value={sortBy}
        onValueChange={(value) => {
          setSortBy(value);
          setTimeout(() => applyFilters(), 0);
        }}
      >
        <SelectTrigger className="w-[180px] lg:w-full">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>

        <SelectContent>
          {[
            { value: "newest", label: "Newest First" },
            { value: "priceAsc", label: "Price: Low to High" },
            { value: "priceDesc", label: "Price: High to Low" },
          ].map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Desktop filters */}
      <div className="hidden lg:block sticky top-24">
        <div className="border rounded-lg overflow-hidden bg-white">
          <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
            <h3 className="font-medium flex items-center">
              <Sliders className={"mr-2 h-4 w-4"}></Sliders>
              Filters
            </h3>

            {activeFilterCount > 0 && (
              <Button
                variant={"ghoast"}
                size={"sm"}
                className={"h-8 text-sm text-gray-600"}
                onClick={clearFilters}
              >
                <X className="mr-1 h-3 w-3"></X>
              </Button>
            )}
          </div>

          <div className="p-6">
            <CarFilterControls
              filters={filters}
              currentFilters={currentFilterCount}
              onFilterChange={handleFilterChange}
              onClearFilter={handleClearFilter}
            ></CarFilterControls>
          </div>

          <div className="px-4 py-4 border-t">
            <Button onClick={applyFilters} className={"w-full"}>
              Apply Filter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarFilters;
