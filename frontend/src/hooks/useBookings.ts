import { useState } from "react";
import type { BookingDto } from "@/types/booking";
import { API_BASE_URL } from "@/lib/api";

export function useBookings() {
  const [booking, setBooking] = useState<BookingDto | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchBooking = async (email: string, code: string) => {
    setIsLoading(true); setError(null); setBooking(null);
    try {
      const res = await fetch(`${API_BASE_URL}/bookings/lookup?email=${encodeURIComponent(email)}&bookingCode=${encodeURIComponent(code)}`);
      if (!res.ok) throw new Error(res.status === 404 ? "Keine Reservierung gefunden." : "Unbekannter Fehler");
      setBooking(await res.json());
    } catch (err: any) { setError(err.message); } finally { setIsLoading(false); }
  };

  const cancelBooking = async (email: string, code: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/bookings/cancel?email=${encodeURIComponent(email)}&bookingCode=${encodeURIComponent(code)}`, { method: "PATCH" });
      if (!res.ok) throw new Error("Stornierung fehlgeschlagen.");
      setBooking(await res.json()); 
      return true; // Success
    } catch (err: any) { setError(err.message); return false; }
  };

  return { booking, isLoading, error, searchBooking, cancelBooking, setBooking, setError };
}