import { differenceInDays } from "date-fns";
import type { DateRange } from "react-day-picker";
import type { HotelDetailDto } from "@/types/hotel";

// AI-Ref: Booking-Calc-Logic

export function calculateBookingDetails(
  hotel: HotelDetailDto | null,
  selectedRooms: string[],
  roomsCount: number,
  adults: number,
  childrenCount: number,
  dateRange?: DateRange
) {
  const totalGuests = adults + childrenCount;
  const nights = dateRange?.from && dateRange?.to ? differenceInDays(dateRange.to, dateRange.from) : 0;
  const safeNights = nights > 0 ? nights : 1;
  
  const multiplier = selectedRooms.length > 0 ? Math.max(1, Math.ceil(roomsCount / selectedRooms.length)) : 1;
  const effectiveRoomsCount = selectedRooms.length * multiplier;

  let totalCapacity = 0;
  let totalCents = 0;

  selectedRooms.forEach(roomId => {
      const room = hotel?.rooms?.find(r => r.id === roomId);
      if (room) {
          totalCapacity += room.maxGuests * multiplier;
          totalCents += Number(room.pricePerNight) * safeNights * multiplier;
      }
  });

  const hasEnoughCapacity = totalCapacity >= totalGuests;

  return {
      totalGuests,
      safeNights,
      multiplier,
      effectiveRoomsCount,
      totalCapacity,
      totalCents,
      hasEnoughCapacity
  };
}