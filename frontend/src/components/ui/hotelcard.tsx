import type { HotelSearchDto } from "@/types/hotel";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { formatPrice, getImageUrl } from "@/lib/utils";
import { Star, MapPin } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom"; 

interface HotelCardProps {
  hotel: HotelSearchDto;
}

export function HotelCard({ hotel }: HotelCardProps) {
  const [searchParams] = useSearchParams();

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="w-full">
        <AspectRatio ratio={16 / 9}>
          <img
            src={getImageUrl(hotel.previewImageUrl)}
            alt={hotel.title}
            className="object-cover w-full h-full rounded-t-md"
          />
        </AspectRatio>
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold truncate">{hotel.title}</h3>
          <div className="flex items-center text-yellow-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="ml-1 text-sm font-medium">{hotel.stars}</span>
          </div>
        </div>

        <div className="flex items-center text-muted-foreground text-sm mb-4">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{hotel.city}, {hotel.country}</span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-between items-center border-t bg-muted/20 mt-auto">
        <div className="flex flex-col py-2">
          <span className="text-xs text-muted-foreground">Preis pro Nacht</span>
          <span className="text-lg font-bold text-primary">
            {formatPrice(hotel.minPricePerNight)}
          </span>
        </div>

        <Button asChild>
          <Link to={`/hotels/${hotel.slug}?${searchParams.toString()}`}>
            Details ansehen
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}