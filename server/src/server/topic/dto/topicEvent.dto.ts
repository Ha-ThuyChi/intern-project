import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class TopicEventDTO {
    @ApiProperty()
    @IsNumber()
    topicId: number;

    @ApiProperty()
    @IsNumber()
    eventId: number;
}