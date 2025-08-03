import React from "react";

export async function generateMetadata() {
  return {
    title: "Test Drive | Vehiql",
    description: "Book a test drive for your favorite car",
  };
}

const TestDrivePage = ({ params }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Test Drive Page</h1>
    </div>
  );
};

export default TestDrivePage;
