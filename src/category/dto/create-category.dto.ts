import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty()
    @IsString()
    name: string

    @ApiProperty()
    @IsString()
    photo: string
}
