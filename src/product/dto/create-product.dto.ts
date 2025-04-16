import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @ApiProperty()
    @IsString()
    name: string

    @ApiProperty()
    @IsNumber()
    price: number

    @ApiProperty()
    @IsString()
    color: string

    @ApiProperty()
    @IsMongoId()
    category: string
}
