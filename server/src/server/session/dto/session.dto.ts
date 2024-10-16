import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsOptional, IsString } from "class-validator";

export class SessionDTO {
    @ApiProperty()
    @IsString()
    @IsOptional()
    name: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    description: string;

    @ApiProperty()
    @IsDate()
    startDate: Date;

    @ApiProperty()
    @IsDate()
    endDate: Date;

    @ApiProperty()
    @IsString()
    @IsOptional()
    hostName: string;
}