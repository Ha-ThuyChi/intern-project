import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEnum, IsOptional, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";

export enum Status {
    ACTIVE = 'ACTIVE',
    DISABLE = 'DISABLE',
    PENDING = 'PENDING'
}

export class SignUpDTO {
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
    @IsStrongPassword({
        minLength: 8,
        minSymbols: 1,
        minNumbers: 1,
        minUppercase: 1
    })
    @MaxLength(20)
    password: string;

    @ApiProperty()
    @IsString()
    city: string;

    @ApiProperty()
    @IsString()
<<<<<<< Updated upstream:src/auth/dto/sign-up.dto.ts
=======
    country: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
>>>>>>> Stashed changes:server/src/server/auth/dto/sign-up.dto.ts
    dob: string;

    @ApiProperty()
    @IsString()
<<<<<<< Updated upstream:src/auth/dto/sign-up.dto.ts
    phone: string;

    @IsEnum(Status)
    status: Status;
=======
    @IsOptional()
    image: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    phone: string;

    @ApiProperty({enum: [Status.ACTIVE, Status.DISABLE, Status.PENDING]})
    status: string;
>>>>>>> Stashed changes:server/src/server/auth/dto/sign-up.dto.ts
}
