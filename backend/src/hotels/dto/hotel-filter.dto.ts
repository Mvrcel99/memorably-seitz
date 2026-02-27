import { Type } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class HotelFilterDto {
    @IsOptional()
    @IsString()
    ort?: string; // Geändert von city zu ort

    @IsOptional()
    @Type(() => Date)
    from?: Date;

    @IsOptional()
    @Type(() => Date)
    to?: Date;
}