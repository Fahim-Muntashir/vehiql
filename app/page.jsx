import CarCard from "@/components/car-card";
import HomeSearch from "@/components/home-search";
import { Button } from "@/components/ui/button";
import { carMakes, featuredCars } from "@/lib/data";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mt-20 flex flex-col">
      {/* Hero*/}
      <section className="relative py-16 md:py-28 dotted-background">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-8xl mb-4 gradient-title">
              Find your Dream Car With Vehiql AI
            </h1>

            <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
              Advanced AI Car Search and test drive from thousands of vehicles
            </p>
          </div>

          {/* Search */}

          <HomeSearch></HomeSearch>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between intems-center mb-8">
            <h2 className="text-2xl font-bold">Featured Cars</h2>
            <Button variant={"ghost"} className={"flex items-center"} asChild>
              <Link href={"/cars"}>
                View All <ChevronRight className="ml-1 h-4 w-4"></ChevronRight>
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCars.map((car) => {
              return <CarCard key={car.id} car={car}></CarCard>;
            })}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between intems-center mb-8">
            <h2 className="text-2xl font-bold">Browse By Make</h2>
            <Button variant={"ghost"} className={"flex items-center"} asChild>
              <Link href={"/cars"}>
                View All <ChevronRight className="ml-1 h-4 w-4"></ChevronRight>
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {carMakes.map((make) => {
              return (
                <Link
                  href={`/cars?make=${make.name}`}
                  key={make.name}
                  className="bg-white rounded-lg shadow p-4 text-center hover:shadow-md transistion cursor-pointer"
                >
                  <div className="h-16 w-auto mb-2 mx-auto relative">
                    <Image
                      src={make.image}
                      alt={make.name}
                      fill
                      style={{ objectFit: "contain" }}
                    ></Image>
                  </div>

                  <h3 className="font-medium">{make.name} </h3>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
