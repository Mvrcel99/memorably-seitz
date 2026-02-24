// Query for Search Parm

import { Type } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class HotelFilterDto {
    @IsOptional()
    @IsString()
    city?: string;

    @IsOptional()
    @Type (()=> Date) //https://github.com/nestjs/nest/issues/631
    from?: Date;

    @IsOptional()
    @Type (()=> Date)
    to?: Date;
}
