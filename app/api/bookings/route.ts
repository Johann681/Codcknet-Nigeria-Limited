import { NextResponse } from "next/server";

import { addBooking, listBookings } from "@/lib/booking-store";

export async function GET() {
  try {
    const bookings = await listBookings();
    return NextResponse.json({ success: true, bookings });
  } catch (error) {
    console.error("Bookings GET failed:", error);
    return NextResponse.json(
      { success: false, message: "Booking storage is unavailable. Check the MongoDB connection." },
      { status: 503 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const company = typeof body?.company === "string" ? body.company.trim() : "";
    const vehicle = typeof body?.vehicle === "string" ? body.vehicle.trim() : "";
    const message = typeof body?.message === "string" ? body.message.trim() : "";
    const service = typeof body?.service === "string" ? body.service.trim() : "";

    if (!name || !phone || !email || !service) {
      return NextResponse.json(
        { success: false, message: "Name, phone, email, and service are required." },
        { status: 400 },
      );
    }

    const booking = await addBooking({ name, phone, email, company, vehicle, message, service });

    return NextResponse.json(
      {
        success: true,
        message: "Booking request saved successfully.",
        booking,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Bookings POST failed:", error);
    return NextResponse.json(
      { success: false, message: "Booking storage is unavailable. Check the MongoDB connection." },
      { status: 503 },
    );
  }
}
