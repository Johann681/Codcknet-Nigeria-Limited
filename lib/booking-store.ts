import { ObjectId } from "mongodb";

import { getDb } from "@/lib/mongodb";

export type BookingRecord = {
  _id?: ObjectId;
  id?: string;
  name: string;
  phone: string;
  service: string;
  createdAt: string;
};

export async function listBookings(): Promise<BookingRecord[]> {
  const db = await getDb();
  const collection = db.collection<BookingRecord>("bookings");

  const records = await collection.find({}).sort({ createdAt: -1 }).toArray();

  return records.map((record) => ({
    ...record,
    id: record.id || record._id?.toString(),
  }));
}

export async function addBooking(input: { name: string; phone: string; service: string }): Promise<BookingRecord> {
  const db = await getDb();
  const collection = db.collection<BookingRecord>("bookings");

  const booking: BookingRecord = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name: input.name.trim(),
    phone: input.phone.trim(),
    service: input.service.trim(),
    createdAt: new Date().toISOString(),
  };

  const result = await collection.insertOne(booking);

  return {
    ...booking,
    _id: result.insertedId,
  };
}
