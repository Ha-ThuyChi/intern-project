import { Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { TopicRepository } from "../repository/topic.repository";
import { EventRepository } from "../repository/event.repository";
import { TopicDTO } from "./dto/topic.dto";

@Injectable() 
export class TopicService {
    constructor(
        private topicRepository: TopicRepository,
        private eventRepository: EventRepository
    ) {};

    async create(data: TopicDTO) {
        const foundTopic = await this.topicRepository.findByName(data.name);
        if (foundTopic) {
            throw new NotAcceptableException(`Topic ${foundTopic.name} exist.`)
        }
        const createdTopic = await this.topicRepository.create(data.name, data.numberOfEvents);
        if (createdTopic) {
            return {success: true, message: "Topic is created."}
        } else {
            return {success: false, message: "Topic is not created."}
        }
    };

    async getAll(start: number, limit: number) {
        const topics = await this.topicRepository.getAll(start, limit);
        if (!topics) {
            return {success: false, message: "No topic to display."}
        }
        return {success: true, message: topics}
    };

    async addTopicToEvent(topicId: number, eventId: number) {
        const foundTopic = await this.topicRepository.findByTopicId(topicId);
        if (!foundTopic) {
            throw new NotFoundException("Topic does not exist.")
        };

        const foundEvent = await this.eventRepository.findOne(eventId);
        if (!foundEvent) {
            throw new NotFoundException("Event does not exist.")
        };

        const foundTopicEvent = await this.topicRepository.findTopicOfEvent(topicId, eventId);
        if (foundTopicEvent) {
            throw new NotAcceptableException(`Topic ${foundTopic.name} is already added to event ${foundEvent.name}.`)
        }
        const addedTopic = await this.topicRepository.addTopicToEvent(topicId, eventId);
        if (!addedTopic) {
            return {success: false, message: `Cannot add topic ${foundTopic.name} to event ${foundEvent.name}.`}
        };
        return {success: true, message: `Topic ${foundTopic.name} is added to event ${foundEvent.name}.`}
    };

    async addFavouriteTopic(userId: number, topicId: number) {
        const foundTopic = this.topicRepository.findByTopicId(topicId);
        if (!foundTopic) {
            throw new NotFoundException("Topic not found.")
        }
        const addedTopic = this.topicRepository.addFavouriteTopic(userId, topicId);
        if (!addedTopic) {
            return {success: false, message: "Cannot choose this topic."}
        }
        return {success: true, message: "Topic is chosen."}
    }
}