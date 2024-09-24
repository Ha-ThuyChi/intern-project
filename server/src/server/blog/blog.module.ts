import { Module } from "@nestjs/common";
import { BlogRepository } from "../repository/blog.repository";
import { BlogService } from "./blog.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { BlogController } from "./blog.controller";

@Module({
    imports: [PrismaModule],
    providers: [BlogRepository, BlogService],
    controllers: [BlogController]
})

export class BlogModule {};