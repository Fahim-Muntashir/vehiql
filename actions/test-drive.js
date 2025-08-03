"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import th from "zod/v4/locales/th.cjs";

export async function bookTestDrive({
  carId,
  bookingData,
  startTime,
  endTime,
  notes,
}) {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("You must be logged in to book a test drive.");
    }

    const user = await db.user.findUniqe({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found.");

    const car = await db.car.findUnique({
      where: { id: carId, status: "AVAILABLE" },
    });

    if (!car) {
      throw new Error("Car not found or not available for test drive.");
    }

    const existingBooking = await db.testDriveBooking.findFirst({
      where: {
        carId,
        bookingDate: new Date(bookingData),
        startTime,
        status: { in: ["PENDING", "CONFIRMED"] },
      },
    });

    if (existingBooking) {
      throw new Error("This car is already booked for the selected time.");
    }

    const booking = await db.testDriveBooking.create({
      data: {
        carId,
        userId: user.id,
        bookingDate: new Date(bookingData),
        startTime,
        endTime,
        notes: notes || null,
        status: "PENDING",
      },
    });

    revalidatePath(`/test-drive/${carId}`);
    revalidatePath(`/cars/${carId}`);

    return { success: true, data: booking };
  } catch (error) {
    console.error("Book test drive error:", error);
    return { success: false, error: error.message };
  }
}
