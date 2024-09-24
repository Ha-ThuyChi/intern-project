import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Status } from "src/server/auth/dto/sign-up.dto";
import { LocationType } from "src/server/enum";

export class EventDTO {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    location: string;

    @ApiProperty({enum: [LocationType.OFFLINE, LocationType.ONLINE]})
    locationType: LocationType;
    

    @ApiProperty()
    @IsString()
    image: string;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsDate()
    startDate: Date;

    @ApiProperty()
    @IsDate()
    endDate: Date;

    @ApiProperty({enum: ["ACTIVE", "DISABLE", "PENDING"]})
    status: Status;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    organizationId: number;


}