import { getFeaturedCars } from "@/actions/home";
import CarCard from "@/components/car-card";
import HomeSearch from "@/components/home-search";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { bodyTypes, carMakes, faqItems } from "@/lib/data";
import { SignedOut } from "@clerk/nextjs";
import { Calendar, Car, ChevronRight, Key } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const featuredCars = await getFeaturedCars();

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

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">
            Why Choose Our Platform
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 text-blue-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Car className="h-8 w-8"></Car>
              </div>

              <h3 className="text-xl font-bold mb-2">Wide Selection</h3>
              <p className="text-gray-600">
                Thousand of verified vehicles form trusted dealerships and
                private sellers.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 text-blue-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8" />
              </div>

              <h3 className="text-xl font-bold mb-2">Easy a test drive</h3>
              <p className="text-gray-600">
                Easy a test drive online in minutes,with flexible scheiong
                option
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 text-blue-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Key className="h-8 w-8" />
              </div>

              <h3 className="text-xl font-bold mb-2">Best Sequrity</h3>
              <p className="text-gray-600">
                Sequre your Self by our ai powered monitoring syesteam
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between intems-center mb-8">
            <h2 className="text-2xl font-bold">Browse By Body Type</h2>
            <Button variant={"ghost"} className={"flex items-center"} asChild>
              <Link href={"/cars"}>
                View All <ChevronRight className="ml-1 h-4 w-4"></ChevronRight>
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bodyTypes.map((type) => {
              return (
                <Link
                  href={`/cars?bodyType=${type.name}`}
                  key={type.name}
                  className="relative group cursor-pointer"
                >
                  <div className="overflow-hidden rounded-lg flex justify-end h-28 mb-4 relative">
                    <Image
                      src={type.image}
                      alt={type.name}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-300"
                    ></Image>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to transparent rounded-lg flex items-end">
                    <h3 className="text-white text-xl font-bold pb-2 pl-4">
                      {type.name}{" "}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center margin-bottom">
            Frequently Asked Questions
          </h2>

          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="bg-slate-900 py-16 px-6 dotted-background">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Find Your Dream Car?
          </h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who found their perfect
            vehicle through our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-slate-900 hover:bg-slate-100 px-8"
            >
              <Link href={"/cars"}> View All Cars</Link>{" "}
            </Button>
            <SignedOut>
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8"
              >
                <Link href="/sign-up">Sign Up Now</Link>{" "}
              </Button>
            </SignedOut>
          </div>
        </div>
      </section>
    </div>
  );
}
