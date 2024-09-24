import { ApiProperty } from "@nestjs/swagger";
import { TicketType } from "src/server/enum";
import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";

export class TicketDTO {
    @ApiProperty({enum: [TicketType.DONATION, TicketType.FREE, TicketType.PAID]})
    ticketType: TicketType;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNumber()
    price: number;
    
    @ApiProperty()
    @IsNumber()
    quantity: number;

    @ApiProperty()
    @IsBoolean()
    isVisible: boolean;

    @ApiProperty()
    @IsDate()
    startDate: Date;

    @ApiProperty()
    @IsDate()
    endDate: Date;
}