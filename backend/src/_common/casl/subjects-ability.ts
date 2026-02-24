import { InferSubjects } from "@casl/ability";
import { Buchung } from "src/bookings/entities/booking.entity";
import { Ausstattung } from "src/features/entities/feature.entity";
import { Hotel } from "src/hotels/entities/hotel.entity";
import { HotelBild } from "src/images/hotel-image/entities/hotel-image.entity";
import { ZimmerBild } from "src/images/room-image/entities/room-image.entity";
import { Zimmer } from "src/rooms/entities/room.entity";
import { Benutzer } from "src/users/user.entity";

export type AbilitySubject =
  | InferSubjects<typeof Hotel | typeof Zimmer | typeof Benutzer | typeof Ausstattung | typeof Buchung | typeof ZimmerBild | typeof HotelBild>
  | "all"
  | "RoomImage";   // AI Ergebnis aus Eintrag 2