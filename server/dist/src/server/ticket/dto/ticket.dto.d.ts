import { TicketType } from "src/server/enum";
export declare class TicketDTO {
    ticketType: TicketType;
    name: string;
    price: number;
    quantity: number;
    isVisible: boolean;
    startDate: Date;
    endDate: Date;
}
