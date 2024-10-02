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
    @IsOptional()
    city: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
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
    @IsString()
    startDate: string;

    @ApiProperty()
    @IsString()
    endDate: string;

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
    @IsOptional()
    platform: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    link: string;

    @ApiProperty({enum: [Theme.GREEN, Theme.YELLOW, Theme.PINK, Theme.BLACK, Theme.WHITE, Theme.RED]})
    theme: Theme;
}