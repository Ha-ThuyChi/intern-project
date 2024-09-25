import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { TopicService } from "./topic.service";
import { TopicDTO } from "./dto/topic.dto";
import { PaginationDTO } from "../pagination.dto";
import { TopicEventDTO } from "./dto/topicEvent.dto";

@Controller("topics")
export class TopicController {
    constructor(private topicService: TopicService) {};

    @Post("/topic")
    createTopic(
        @Body() data: TopicDTO
    ) {
        return this.topicService.create(data);
    };

    @Get("")
    getAll(
        @Query() data: PaginationDTO
    ) {
        return this.topicService.getAll(Number(data.page), Number(data.limit));
    };

    @Post("/topic-event")
    addTopic(
        @Query() data: TopicEventDTO
    ) {
        return this.topicService.addTopic(Number(data.topicId), Number(data.eventId));
    }
}