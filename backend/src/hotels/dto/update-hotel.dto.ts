import { PartialType } from "@nestjs/mapped-types";
import { CreateHotelDto } from "./create-hotel.dto";
import { IsArray, IsNumber, IsOptional } from 'class-validator';


export class UpdateHotelDto extends PartialType(CreateHotelDto) {
    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    featureIds?: number[]
}
