import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class TopicEventDTO {
    @ApiProperty()
    topicId: number;

    @ApiProperty()  
    eventId: number;
}