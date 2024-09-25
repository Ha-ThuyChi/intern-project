import { Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { SessionRepository } from "src/server/repository/session.repository";
import { BlogDTO } from "./dto/blog.dto";
import { BlogRepository } from "../repository/blog.repository";

@Injectable()
export class BlogService {
    constructor(private blogRepository: BlogRepository) {}

    async createBlog(userId: number, data: BlogDTO) {
        const createdBlog = await this.blogRepository.createBlog(
            data.content,
            data.title,
            userId,
        );

        if (!createdBlog) {
            throw new NotAcceptableException("Cannot create new blog.")
        };
        return {success: true, message: "Blog is created."}
    };

    async findOne(blogId: number) {
        const foundBlog = await this.blogRepository.findOne(blogId);

        if (!foundBlog) {
            throw new NotFoundException("Blog not found.")
        };
        return {success: true, message: foundBlog};
    };

    async findManyByUserId(userId: number, page: number, limit: number) {
        const foundBlog = await this.blogRepository.findManyByUserId(userId, page, limit)

        if (!foundBlog) {
            throw new NotFoundException("Blog not found.")
        };
        return {success: true, message: foundBlog};
    };

    async updateBlog(blogId: number, data: BlogDTO) {
        const updateBlog = await this.blogRepository.updateBlog(
            blogId,
            data.content,
            data.title
        );
        if (!updateBlog) {
            throw new NotFoundException("Cannot updated blog.")
        };
        return {success: true, message: updateBlog};
    };
    
    async deleteBlog(blogId: number) {
        const deletedBlog = await this.blogRepository.deleteBlog(blogId);
        if (!deletedBlog) {
            throw new NotFoundException("Cannot delete blog.")
        };
        return {success: true, message: deletedBlog};
    };
}