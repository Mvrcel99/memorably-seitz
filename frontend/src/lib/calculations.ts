import { differenceInDays } from "date-fns";
import type { DateRange } from "react-day-picker";
import type { HotelDetailDto } from "@/types/hotel";

export function calculateBookingDetails(
  hotel: HotelDetailDto | null | undefined,
  selectedRoomIds: string[],
  roomsCount: number,
  adults: number,
  childrenCount: number,
  dateRange: DateRange | undefined
) {

  if (!hotel || !hotel.rooms) {
    return { totalCapacity: 0, hasEnoughCapacity: false, effectiveRoomsCount: 0, totalPrice: 0, multiplier: 1, nights: 0 };
  }

  const nights = (dateRange?.from && dateRange?.to) 
    ? Math.max(0, differenceInDays(dateRange.to, dateRange.from)) 
    : 0;
    
  const multiplier = roomsCount || 1;
  const effectiveRoomsCount = selectedRoomIds.length * multiplier;

  let totalCapacity = 0;
  let totalPrice = 0;

  selectedRoomIds.forEach(roomId => {
    const room = hotel.rooms.find(r => r.id === roomId || r.zimmer_id.toString() === roomId);
    
    if (room) {
      totalCapacity += (room.max_anzahl * multiplier);
      totalPrice += (room.basispreis * multiplier * nights);
    }
  });

  const totalGuests = adults + childrenCount;
  const hasEnoughCapacity = totalCapacity >= totalGuests;

  return { 
    totalCapacity, 
    hasEnoughCapacity, 
    effectiveRoomsCount, 
    totalPrice, 
    multiplier, 
    nights 
  };
}