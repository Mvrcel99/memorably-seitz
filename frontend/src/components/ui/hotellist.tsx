import type { HotelSearchDto } from "@/types/hotel";
import { HotelCard } from "./hotelcard";
import { Skeleton } from "@/components/ui/skeleton";

interface HotelListProps {
  hotels: HotelSearchDto[];
  isLoading: boolean;
}

export function HotelList({ hotels, isLoading }: HotelListProps) {
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col space-y-3">
            <Skeleton className="h-[200px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (hotels.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg bg-muted/10">
        <h3 className="text-lg font-semibold">Keine Unterkünfte gefunden</h3>
        <p className="text-muted-foreground">Versuche es mit anderen Filtern.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {hotels.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} />
       ))}
    </div>
  );
}