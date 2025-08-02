"use client";
import { toggleSavedCar } from "@/actions/car-listing";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import { useAuth } from "@clerk/nextjs";
import { CarIcon, Heart, Share2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import is from "zod/v4/locales/is.cjs";

const CarDetails = ({ car, testDriveInfo }) => {
  const router = useRouter();

  const { isSignedIn } = useAuth();

  const [isWishlisted, setIsWishlisted] = useState(car.wishlisted);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const {
    loading: savingCar,
    fn: toggleSavedCarFn,
    data: toggleResult,
    error: toggleError,
  } = useFetch(toggleSavedCar);

  useEffect(() => {
    if (toggleResult?.success && toggleResult.saved !== isWishlisted) {
      setIsWishlisted(toggleResult.saved);
      toast.success(toggleResult.message);
    }
  }, [toggleResult, isWishlisted]);

  useEffect(() => {
    if (toggleError) {
      toast.error("Failed to update favourite");
    }
  }, [toggleError]);

  const handleSaveCar = async (e) => {
    if (!isSignedIn) {
      toast.error("Please sign in to save cars");
      router.push("/sign-in");
      return;
    }

    if (savingCar) return;

    await toggleSavedCarFn(car.id);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${car.year} ${car.make} ${car.model}`,
          text: `Check out this car: ${car.description}`,
          url: window.location.href,
        })
        .catch((error) => {
          console.error("Error sharing:", error);
          copyToClipboard();
        });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-7/12">
          <div className="aspect-video rounded-lg overflow-hidden relative mb-4">
            {car.images && car.images.length > 0 ? (
              <Image
                src={car.images[currentImageIndex]}
                alt={`${car.make} ${car.model}`}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                <CarIcon className="h-12 w-12 text-gray-500" />
              </div>
            )}
          </div>

          {car.images && car.images.length > 1 && (
            <div
              key={index}
              className={`relative cursor-pointer rounded-md h-20 w-24 flex-shrink-0 transition ${
                index === currentImageIndex
                  ? "border-2 border-blue-600"
                  : "opacity-70 hover:opacity-100"
              }`}
              onClick={() => setCurrentImageIndex(index)}
            >
              {car.images.map((image, index) => {
                return (
                  <div key={index} className={``}>
                    <Image
                      src={image}
                      alt={` ${car.year} ${car.make} ${car.model} - view ${
                        index + 1
                      }`}
                      fill
                      className="object-cover"
                    />
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex mt-4 gap-4">
            <Button
              variant="outline"
              className={`flex items-center gap-2 flex-1 ${
                isWishlisted ? "text-red-500" : ""
              }`}
              onClick={handleSaveCar}
              disabled={savingCar}
            >
              <Heart
                className={`h-5 w-5 ${isWishlisted ? "fill-red-500" : ""}`}
              />
              {isWishlisted ? "Saved" : "Save"}
            </Button>

            <Button
              variant={"outline"}
              className="flex items-center gap-2 flex-1 "
              onClick={handleShare}
            >
              <Share2 className="h-5 w-5" />
              Share
            </Button>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between ">
            <Badge className="mb-2">{car.bodyType}</Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
