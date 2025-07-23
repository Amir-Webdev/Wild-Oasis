import { useState } from "react";
import { isFuture, isPast, isToday } from "date-fns";
import supabase from "../services/supabase";
import Button from "../ui/Button";
import { subtractDates } from "../utils/helpers";

// Import raw data
import { bookings } from "./data-bookings";
import { cabins } from "./data-cabins";
import { guests } from "./data-guests";

async function deleteGuests() {
  const { error } = await supabase.from("guests").delete().gt("id", 0);
  if (error) console.log("Guest deletion error:", error.message);
}

async function deleteCabins() {
  const { error } = await supabase.from("cabins").delete().gt("id", 0);
  if (error) console.log("Cabin deletion error:", error.message);
}

async function deleteBookings() {
  const { error } = await supabase.from("bookings").delete().gt("id", 0);
  if (error) console.log("Booking deletion error:", error.message);
}

async function createGuests() {
  const { error } = await supabase.from("guests").insert(guests);
  if (error) console.log("Guest creation error:", error.message);
}

async function createCabins() {
  const { error } = await supabase.from("cabins").insert(cabins);
  if (error) console.log("Cabin creation error:", error.message);
}

async function createBookings() {
  const { data: guestsData } = await supabase
    .from("guests")
    .select("id")
    .order("id");

  const { data: cabinsData } = await supabase
    .from("cabins")
    .select("id")
    .order("id");

  if (!guestsData || !cabinsData) {
    console.error("Error fetching guest or cabin IDs");
    return;
  }

  const allGuestIds = guestsData.map((g) => g.id);
  const allCabinIds = cabinsData.map((c) => c.id);

  const finalBookings = bookings.map((booking) => {
    const cabin = cabins[booking.cabinId - 1];
    const numNights = subtractDates(booking.endDate, booking.startDate);
    const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);
    const extrasPrice = booking.hasBreakfast
      ? numNights * 15 * booking.numGuests
      : 0;
    const totalPrice = cabinPrice + extrasPrice;

    let status = "unconfirmed";
    const startDate = new Date(booking.startDate);
    const endDate = new Date(booking.endDate);

    if (isPast(endDate) && !isToday(endDate)) status = "checked-out";
    if (isFuture(startDate) || isToday(startDate)) status = "unconfirmed";
    if (
      (isFuture(endDate) || isToday(endDate)) &&
      isPast(startDate) &&
      !isToday(startDate)
    )
      status = "checked-in";

    return {
      ...booking,
      numNights,
      cabinPrice,
      extrasPrice,
      totalPrice,
      guestId: allGuestIds[booking.guestId - 1],
      cabinId: allCabinIds[booking.cabinId - 1],
      status,
    };
  });

  const { error } = await supabase.from("bookings").insert(finalBookings);
  if (error) console.log("Booking creation error:", error.message);
}

function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    setIsLoading(true);
    await deleteBookings();
    await deleteGuests();
    await deleteCabins();
    await createGuests();
    await createCabins();
    await createBookings();
    setIsLoading(false);
  }

  async function uploadBookings() {
    setIsLoading(true);
    await deleteBookings();
    await createBookings();
    setIsLoading(false);
  }

  return (
    <div
      style={{
        marginTop: "auto",
        backgroundColor: "#e0e7ff",
        padding: "8px",
        borderRadius: "5px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <h3>دیتای آزمایشی</h3>

      <Button onClick={uploadAll} disabled={isLoading}>
        اپلود همه
      </Button>

      <Button onClick={uploadBookings} disabled={isLoading}>
        اپلود فقط رزرو ها
      </Button>
    </div>
  );
}

export default Uploader;
