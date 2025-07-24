import React from "react";

const CarPage = async ({ params }) => {
  const { id } = await params;
  return <div>{id}</div>;
};

export default CarPage;
