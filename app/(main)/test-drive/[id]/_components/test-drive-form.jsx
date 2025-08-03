"use client";
import { bookTestDrive } from "@/actions/test-drive";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/hooks/use-fetch";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { se } from "date-fns/locale";
import { CalendarIcon, Car, CheckCircle2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z, { set } from "zod";

const testDriveSchema = z.object({
  date: z.date({
    required_error: "Select a date for the test drive.",
  }),
  timeSlot: z.string({
    required_error: "Select a time slot for the test drive.",
  }),
  notes: z.string().optional(),
});

const TestDriveForm = ({ car, testDriveInfo }) => {
  const router = useRouter();
  const [availableTimeSlots, setAvailbaleTimeSlots] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingDetails, setBookingDetails] = useState();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(testDriveSchema),
    defaultValues: {
      date: undefined,
      timeSlot: undefined,
      notes: "",
    },
  });

  const {
    loading: bookingInProgress,
    fn: bookTestDriveFn,
    data: bookingResult,
    error: bookingError,
  } = useFetch(bookTestDrive);

  const dealership = testDriveInfo?.dealership;
  const existingBookings = testDriveInfo?.existingBookings || [];
  const selectedDate = watch("date");

  const onSubmit = async (data) => {
    const selectedSlot = availableTimeSlots.find(
      (slot) => slot.id === data.timeSlot
    );
  };
  const isDayDisabled = (day) => {
    // Disable past dates
    if (day < new Date()) {
      return true;
    }

    // Get day of week
    const dayOfWeek = format(day, "EEEE").toUpperCase();

    // Find working hours for the day
    const daySchedule = dealership?.workingHours?.find(
      (schedule) => schedule.dayOfWeek === dayOfWeek
    );

    // Disable if dealership is closed on this day
    return !daySchedule || !daySchedule.isOpen;
  };

  useEffect(() => {
    if (!selectedDate || !dealership?.workingHours) return;
    const selectedDayOfWeek = format(selectedDate, "EEEE").toUpperCase();

    const daySechedule = dealership.workingHours.find(
      (day) => day.dayOfWeek === selectedDayOfWeek
    );

    if (!daySechedule || !daySechedule.isOpen) {
      setAvailbaleTimeSlots([]);
      return;
    }

    const openHour = parseInt(daySechedule.openTime.split(":")[0]);
    const closeHour = parseInt(daySechedule.closeTime.split(":")[0]);

    const slots = [];
    for (let hour = openHour; hour < closeHour; hour++) {
      const startTime = new Date(selectedDate);
      startTime.setHours(hour, 0, 0);

      const endTime = new Date(selectedDate);
      endTime.setHours(hour + 1, 0, 0);

      slots.push({
        id: `${format(startTime, "HHmm")}-${format(endTime, "HHmm")}`,
        label: `${format(startTime, "h:mm a")} - ${format(endTime, "h:mm a")}`, // e.g., 2:00 PM - 3:00 PM
        startTime: format(startTime, "HHmm"),
        endTime: format(endTime, "HHmm"),
      });
    }

    setAvailbaleTimeSlots(slots);

    // clear time slot selection when date changes
    setValue("timeSlot", "");
  }, [selectedDate]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <Card>
          <CardContent className={"p-6"}>
            <h2 className="text-xl font-bold mb-4">Car Details</h2>
            <div className="aspect-video rounded-lg overflow-hidden relative mb-4">
              {car.images && car.images.length > 0 ? (
                <img
                  src={car.images[0]}
                  alt={`${car.year} ${car.make} ${car.model}`}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <Car className="h-12 w-12 text-gray-400" />
                </div>
              )}
            </div>

            <h3 className="text-lg font-bold">
              {car.year} {car.make} {car.model}
            </h3>

            <div className="mt-2 text-xl font-bold text-blue-600">
              ${car.price.toLocaleString()}
            </div>

            <div className="mt-4 text-sm text-gray-500">
              <div className="flex justify-between py-1 border-b">
                <span>Mileage</span>
                <span className="font-medium">
                  {car.mileage.toLocaleString()} miles
                </span>
              </div>

              <div className="flex justify-between py-1 border-b">
                <span>Fuel Type</span>
                <span className="font-medium">{car.fuelType}</span>
              </div>

              <div className="flex justify-between py-1 border-b">
                <span>Transmission</span>
                <span className="font-medium">{car.transmission}</span>
              </div>

              <div className="flex justify-between py-1 border-b">
                <span>Body Type</span>
                <span className="font-medium">{car.bodyType}</span>
              </div>

              <div className="flex justify-between py-1">
                <span>Color</span>
                <span className="font-medium">{car.color}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Dealership Info</h2>
            <div className="text-sm">
              <p className="font-medium">
                {dealership?.name || "Vehiq1 Motors"}
              </p>
              <p className="text-gray-600 mt-1">
                {dealership?.address || "Address not available"}
              </p>
              <p className="text-gray-600 mt-3">
                <span className="font-medium">Phone:</span>{" "}
                {dealership?.phone || "Not available"}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Email:</span>{" "}
                {dealership?.email || "Not available"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-2">
        <Card>
          <CardContent>
            <h2 className="text-xl font-bold mb-6">Schedule Your Test Drive</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Select a Date
                </label>
                <Controller
                  name="date"
                  control={control}
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value
                              ? format(field.value, "PPP")
                              : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            className={"rounded-md border"}
                            initialFocus
                            disabled={isDayDisabled}
                          />
                        </PopoverContent>
                      </Popover>

                      {errors.date && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.date.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>{" "}
              <div className="space-y-2`">
                <label className="block text-sm font-medium ">
                  Select a Time Slot
                </label>
                <Controller
                  name="timeSlot"
                  control={control}
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={
                          !selectedDate || !availableTimeSlots.length === 0
                        }
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              !selectedDate
                                ? "Select a date first"
                                : availableTimeSlots.length === 0
                                  ? "No available time slots"
                                  : "Select a time slot"
                            }
                          />
                        </SelectTrigger>

                        <SelectContent>
                          {availableTimeSlots.map((slot) => (
                            <SelectItem key={slot.id} value={slot.id}>
                              {slot.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {errors.timeSlot && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.timeSlot.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
              {/* Notes */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Additional Notes (Optional)
                </label>

                <Controller
                  name="notes"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      placeholder="Any specific questions or requests for your test drive?"
                      className="min-h-24"
                    />
                  )}
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={bookingInProgress}
              >
                {bookingInProgress ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Booking Your Test Drive
                  </>
                ) : (
                  "Book Test Drive"
                )}
              </Button>
            </form>

            <div className="mt-8 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">What to expect</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  Bring your driver's license for verification
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  Test drives typically last 30–60 minutes
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  A dealership representative will accompany you
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TestDriveForm;
