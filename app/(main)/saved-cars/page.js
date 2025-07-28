import { getSavedCars } from "@/actions/car-listing";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import SavedCarsList from "./_components/saved-cars-list";

const SavedCarsPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in?redirect=/saved-cars");
  }

  //   fetch saved

  const savedCarsResult = await getSavedCars();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-6xl mb-6 gradient-title">Your Saved Cars</h1>

      <SavedCarsList initialData={savedCarsResult}></SavedCarsList>
    </div>
  );
};

export default SavedCarsPage;
