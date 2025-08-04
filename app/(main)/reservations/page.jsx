import { getUserTestDrives } from "@/actions/test-drive";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import ReservationsList from "./_components/reservations-list";

export const metadata = {
  title: "Reservations | Vehiql",
  description: "Manage your reservations and bookings",
};

const ReservationsPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in?redirect_url=/reservations");
  }

  const reservationsResult = await getUserTestDrives();

  return (
    <div className="container mx-auto px-4 py-28">
      <h1 className="text-6xl mb-6 gradient-title">Your Reservations</h1>

      <ReservationsList initialData={reservationsResult}></ReservationsList>
    </div>
  );
};

export default ReservationsPage;
