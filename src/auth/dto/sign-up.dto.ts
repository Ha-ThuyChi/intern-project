import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString } from "class-validator";

export enum Status {
    ACTIVE = 'ACTIVE',
    DISABLE = 'DISABLE',
    PENDING = 'PENDING'
}

export class SignUpDTO {
    @IsString()
    @ApiProperty()
    name: string;

    @IsString()
    @ApiProperty()
    email: string;

    @IsString()
    @ApiProperty()
    password: string;

    @IsString()
    @ApiProperty()
    address: string;

    @IsString()
    @ApiProperty()
    dob: string;

    @IsString()
    @ApiProperty()
    phone: string;

    @ApiProperty({enum: ["ACTIVE", "DISABLE", "PENDING"]})
    status: Status;
}
