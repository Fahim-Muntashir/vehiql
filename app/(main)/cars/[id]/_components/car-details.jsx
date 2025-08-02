"use client";
import { toggleSavedCar } from "@/actions/car-listing";
import useFetch from "@/hooks/use-fetch";
import { useAuth } from "@clerk/nextjs";
import { CarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import is from "zod/v4/locales/is.cjs";

const CarDetails = ({ car, testDriveInfo }) => {
  const router = useRouter();

  const { isSignedIn } = useAuth();

  const [isWishlisted, setIsWishlisted] = React.useState(car.isWishlisted);

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
  return (
    <div>
      <div>
        <div>
          <div>
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
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default CarDetails;
