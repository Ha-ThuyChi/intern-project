import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsOptional, IsString } from "class-validator";
import { Status } from "src/server/enum";

export class UserDTO {
    @ApiProperty()
    @IsString()
    firstName: string;

    @ApiProperty()
    @IsString()
    lastName: string;

    @ApiProperty()
    @IsString()
    email: string;

    @ApiProperty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsString()
    city: string;

    @ApiProperty()
    @IsString()
    country: string;

    @ApiProperty()
    @IsDate()
    @IsOptional()
    dob: Date;

    @ApiProperty()
    @IsString()
    @IsOptional()
    image: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    phone: string;

    @ApiProperty({enum: [Status.ACTIVE, Status.DISABLE, Status.PENDING]})
    status: string;

    

    @ApiProperty()
    @IsOptional()
    secret: string;
}