import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsString } from "class-validator";

export class SessionDTO {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsDate()
    startDate: Date;

    @ApiProperty()
    @IsDate()
    endDate: Date;

    @ApiProperty()
    @IsString()
    hostName: string;
}