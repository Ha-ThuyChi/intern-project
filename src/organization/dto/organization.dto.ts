import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class OrganizationDTO {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsString()
    phone: string;

    @ApiProperty()
    @IsString()
    email: string;
}