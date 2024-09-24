import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { BlogService } from "./blog.service";
import { BlogDTO } from "./dto/blog.dto";
import { PaginationDTO } from "../pagination.dto";

@Controller("blogs")
export class BlogController {
    constructor(private blogService: BlogService) {} 

    @Post("blog/:userId")
    createBlog(
        @Param("userId") userId: number,
        @Body() data: BlogDTO
    ) {
        return this.blogService.createBlog(Number(userId), data);
    };

    @Get("blog/:blogId")
    getBlogByBlogId(
        @Param("blogId") blogId: number,
    ) {
        return this.blogService.findOne(Number(blogId));
    };

    @Get(":userId")
    getBlogsByUserId(
        @Param("userId") userId: number,
        @Query() data: PaginationDTO
    ) {
        return this.blogService.findManyByUserId(Number(userId), Number(data.page), Number(data.limit));
    };

    @Patch("blog/:blogId")
    updateBlog(
        @Param("blogId") blogId: number,
        @Body() data: BlogDTO
    ) {
        return this.blogService.updateBlog(Number(blogId), data);
    };

    @Delete("blog/:blogId")
    deleteBlog(
        @Param("blogId") blogId: number
    ) {
        return this.blogService.deleteBlog(Number(blogId));
    };
}