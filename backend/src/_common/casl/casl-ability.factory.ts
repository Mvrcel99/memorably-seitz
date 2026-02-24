import { AbilityBuilder, createMongoAbility, PureAbility } from "@casl/ability";
import { Injectable } from "@nestjs/common";

import { Hotel } from "../../hotels/entities/hotel.entity";
import { Zimmer } from "../../rooms/entities/room.entity";
import { Action } from "./action.enum";
import { AbilitySubject } from "./subjects-ability";
import { AuthenticatedUser, UserRole } from "./casl.utils";
import {  Buchung } from "../../bookings/entities/booking.entity";
import { HotelBild } from "../../images/hotel-image/entities/hotel-image.entity";
import {  ZimmerBild } from "../../images/room-image/entities/room-image.entity"; 

export type AppAbility = PureAbility<[Action, AbilitySubject]>;


@Injectable()
export class CaslAbilityFactory {
    createForUser(user: AuthenticatedUser): AppAbility {
    const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

    if (user.role === UserRole.ADMIN) {
        can(Action.Manage, 'all'); 
    }
        else if (user.role === UserRole.HOTEL_OWNER) {
            // Eigenes Hotel
            can(Action.Read, Hotel, { besitzerId: user.id });
            can(Action.Update, Hotel, { besitzerId: user.id });

            // Eigene Raumbilder
            can(Action.Create, ZimmerBild);            
            can(Action.Update, ZimmerBild); 
            can(Action.Delete, ZimmerBild);

            // Eigene Hotelbilder
            can(Action.Create, HotelBild);
            can(Action.Update, HotelBild);
            can(Action.Delete, HotelBild);
            
            // Eigene Zimmer
            can(Action.Create, Zimmer);       
            can(Action.Update, Zimmer,  { 'hotel.besitzerId': user.id } );
            can(Action.Delete, Zimmer,  { 'hotel.besitzerId': user.id } );

            can(Action.Read, Buchung,{ 'hotel.besitzerId': user.id } );
        }
    
    return build({
        detectSubjectType: (item) => {
            if (item instanceof Function) return item;
            return item.constructor as any;
        },
    }
    )

}

}