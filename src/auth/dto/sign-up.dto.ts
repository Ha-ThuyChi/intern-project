import { IsEnum, IsString } from "class-validator";

export enum Status {
    ACTIVE = 'ACTIVE',
    DISABLE = 'DISABLE',
    PENDING = 'PENDING'
}

export class SignUpDTO {
    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsString()
    address: string;

    @IsString()
    dob: string;

    @IsString()
    phone: string;

    @IsEnum(Status)
    status: Status;
}
