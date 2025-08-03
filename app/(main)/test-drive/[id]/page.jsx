import { getCarById } from "@/actions/car-listing";
import { notFound } from "next/navigation";
import React from "react";
import TestDriveForm from "./_components/test-drive-form";

export async function generateMetadata() {
  return {
    title: "Test Drive | Vehiql",
    description: "Book a test drive for your favorite car",
  };
}

const TestDrivePage = async ({ params }) => {
  const { id } = await params;

  const result = await getCarById(id);

  if (!result.success) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-6xl mb-6 gradient-title">Test Drive Page</h1>

      <TestDriveForm
        car={result.data}
        testDriveInfo={result.data.testDriveInfo}
      />
    </div>
  );
};

export default TestDrivePage;
