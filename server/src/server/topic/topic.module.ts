import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TopicService } from './topic.service';
import { TopicRepository } from '../repository/topic.repository';
import { TopicController } from './topic.controller';
import { EventRepository } from '../repository/event.repository';

@Module({
  imports: [PrismaModule],
  controllers: [TopicController],
  providers: [TopicService, TopicRepository, EventRepository],
})
export class TopicModule {}
