import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Status } from "src/server/auth/dto/sign-up.dto";
import { LocationType, Theme } from "src/server/enum";

export class EventDTO {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    city: string;

    @ApiProperty()
    @IsString()
    country: string;


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

    @ApiProperty()
    @IsBoolean()
    isPublic: boolean;

    @ApiProperty()
    @IsBoolean()
    isRequireApproval: boolean;

    @ApiProperty()
    @IsBoolean()
    isWaitlist: boolean;

    @ApiProperty()
    @IsString()
    timeZone: string;

    @ApiProperty({enum: [Theme.GREEN, Theme.YELLOW, Theme.PINK, Theme.BLACK, Theme.WHITE]})
    theme: Theme;
}