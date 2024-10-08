import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsOptional, IsString } from "class-validator";
import { Status } from "src/server/enum";

export class UserDTO {
    @ApiProperty()
    @IsString()
    @IsOptional()
    firstName: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    lastName: string;

    @ApiProperty()
    @IsString()
    email: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    password: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    city: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
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