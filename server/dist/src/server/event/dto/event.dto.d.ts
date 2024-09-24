import { Status } from "src/server/auth/dto/sign-up.dto";
import { LocationType } from "src/server/enum";
export declare class EventDTO {
    name: string;
    location: string;
    locationType: LocationType;
    image: string;
    description: string;
    startDate: Date;
    endDate: Date;
    status: Status;
    organizationId: number;
}
