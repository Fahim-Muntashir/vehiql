"use server";

import { serializeCarData } from "@/lib/helpers";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

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

    const user = await db.user.findUnique({
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

export async function getUserTestDrives() {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("You must be logged in to view your test drives.");
    }
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });
    if (!user) throw new Error("User not found.");
    const bookings = await db.testDriveBooking.findMany({
      where: { userId: user.id },
      include: {
        car: true,
      },
      orderBy: { bookingDate: "desc" },
    });

    const formattedBookings = bookings.map((b) => ({
      id: b.id,
      carId: b.carId,
      car: serializeCarData(b.car),
      bookingDate: b.bookingDate.toISOString(),
      startTime: b.startTime,
      endTime: b.endTime,
      status: b.status,
      notes: b.notes,
      createdAt: b.createdAt.toISOString(),
      updatedAt: b.updatedAt.toISOString(),
    }));

    return { success: true, data: formattedBookings };
  } catch (error) {
    console.error("Fetch user test drives error:", error);
    return { success: false, error: error.message };
  }
}

export async function cancelTestDrive(bookingId) {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("You must be logged in to cancel a test drive.");
    }

    const user = await db.user.findUniqe({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found.");

    // get booking
    const booking = await db.testDriveBooking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return { success: false, error: "Booking not found." };
    }

    if (booking.userId !== userId || user.role !== "ADMIN") {
      return {
        success: false,
        error: "You can only cancel your own bookings.",
      };
    }

    if (booking.status === "CANCELLED") {
      return { success: false, error: "This booking is already cancelled." };
    }

    if (booking.status === "COMPLETED") {
      return { success: false, error: "This booking is already completed." };
    }

    await db.testDriveBooking.update({
      where: { id: bookingId },
      data: { status: "CANCELLED" },
    });

    revalidatePath(`/reservations`);
    revalidatePath(`/admin/test-drives`);

    return {
      success: true,
      message: "Test drive booking cancelled successfully.",
    };
  } catch (error) {
    console.error("Cancel test drive error:", error);
    return { success: false, error: error.message };
  }
}
