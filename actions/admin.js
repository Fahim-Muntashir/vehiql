"use server";

import { serializeCarData } from "@/lib/helpers";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// Check if current user is admin
async function checkAdmin() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  const user = await db.user.findUnique({ where: { clerkUserId: userId } });
  if (!user || user.role !== "ADMIN") throw new Error("Unauthorized");
  return user;
}

// Get admin info with authorization flag
export async function getAdmin() {
  try {
    const user = await checkAdmin();
    return { authorized: true, user };
  } catch {
    return { authorized: false, reason: "not-admin" };
  }
}

// Fetch test drives with optional search and status filters
export async function getAdminTestDrives({ search = "", status = "" }) {
  try {
    await checkAdmin();

    const where = {};
    if (status) where.status = status;

    if (search) {
      where.OR = [
        {
          car: {
            OR: [
              { make: { contains: search, mode: "insensitive" } },
              { model: { contains: search, mode: "insensitive" } },
            ],
          },
        },
        {
          user: {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { email: { contains: search, mode: "insensitive" } },
            ],
          },
        },
      ];
    }

    const bookings = await db.testDriveBooking.findMany({
      where,
      include: {
        car: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            imageUrl: true,
            phone: true,
          },
        },
      },
      orderBy: [{ bookingDate: "desc" }, { startTime: "asc" }],
    });

    const formattedBookings = bookings.map((b) => ({
      id: b.id,
      carId: b.carId,
      car: serializeCarData(b.car),
      userId: b.userId,
      user: b.user,
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
    console.error("Fetch test drives error:", error);
    return { success: false, error: error.message };
  }
}

// Update status of a test drive booking
export async function updateTestDriveStatus(bookingId, newStatus) {
  try {
    await checkAdmin();

    const booking = await db.testDriveBooking.findUnique({
      where: { id: bookingId },
    });
    if (!booking) throw new Error("Booking not found");

    const validStatuses = [
      "PENDING",
      "CONFIRMED",
      "COMPLETED",
      "CANCELLED",
      "NO_SHOW",
    ];
    if (!validStatuses.includes(newStatus))
      return { success: false, error: "Invalid status" };

    await db.testDriveBooking.update({
      where: { id: bookingId },
      data: { status: newStatus },
    });

    revalidatePath("/admin/test-drives");
    revalidatePath("/reservations");

    return { success: true, message: "Status updated successfully" };
  } catch (error) {
    throw new Error("Error updating status: " + error.message);
  }
}

// Fetch dashboard summary data for cars and test drives
export async function getDashboardData() {
  try {
    await checkAdmin();

    const [cars, testDrives] = await Promise.all([
      db.car.findMany({ select: { id: true, status: true, featured: true } }),
      db.testDriveBooking.findMany({
        select: { id: true, status: true, carId: true },
      }),
    ]);

    const countByStatus = (items, key, value) =>
      items.filter((item) => item[key] === value).length;

    const totalCars = cars.length;
    const availableCars = countByStatus(cars, "status", "AVAILABLE");
    const soldCars = countByStatus(cars, "status", "SOLD");
    const unavailableCars = countByStatus(cars, "status", "UNAVAILABLE");
    const featuredCars = countByStatus(cars, "featured", true);

    const totalTestDrives = testDrives.length;
    const pendingTestDrives = countByStatus(testDrives, "status", "PENDING");
    const confirmedTestDrives = countByStatus(
      testDrives,
      "status",
      "CONFIRMED"
    );
    const completedTestDrives = countByStatus(
      testDrives,
      "status",
      "COMPLETED"
    );
    const cancelledTestDrives = countByStatus(
      testDrives,
      "status",
      "CANCELLED"
    );
    const noShowTestDrives = countByStatus(testDrives, "status", "NO_SHOW");

    const completedCarIds = testDrives
      .filter((td) => td.status === "COMPLETED")
      .map((td) => td.carId);

    const soldAfterTestDrive = cars.filter(
      (car) => car.status === "SOLD" && completedCarIds.includes(car.id)
    ).length;

    const conversionRate =
      totalTestDrives > 0
        ? (soldAfterTestDrive / completedTestDrives) * 100
        : 0;

    return {
      success: true,
      data: {
        cars: {
          total: totalCars,
          available: availableCars,
          sold: soldCars,
          unavailable: unavailableCars,
          featured: featuredCars,
        },
        testDrives: {
          total: totalTestDrives,
          pending: pendingTestDrives,
          confirmed: confirmedTestDrives,
          completed: completedTestDrives,
          cancelled: cancelledTestDrives,
          noShow: noShowTestDrives,
          conversionRate: +conversionRate.toFixed(2),
        },
      },
    };
  } catch (error) {
    console.error("Dashboard data fetch error:", error);
    return { success: false, error: error.message };
  }
}
