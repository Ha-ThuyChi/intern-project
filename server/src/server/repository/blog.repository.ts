import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class BlogRepository {
    constructor(private prismaService: PrismaService) {}

    async createBlog(
        content: string,
        title: string,
        authorId: number
    ) {
        const createdBlog = await this.prismaService.blog.create({
            data: {
                authorId: authorId,
                title: title,
                content: content
            }
        });
        return createdBlog;
    };

    async findOne(blogId: number) {
        const foundBlog = await this.prismaService.blog.findUnique({
            where: {
                id: blogId
            }
        })
        return foundBlog;
    }

    async findManyByUserId(userId: number, start: number, limit: number) {
        const skip = (start - 1)*limit;
        const [blogs, total] = await Promise.all([
            await this.prismaService.blog.findMany({
                where: {
                    authorId: userId
                },
                orderBy: {
                    createdAt: "desc"
                },
                skip: skip,
                take: limit,
            }),
            await this.prismaService.blog.count({
                where: {
                    authorId: userId
                }
            })
        ])
        return {
            list: blogs,
            total: total,
            limit: limit,
            page: start,
            maxPage: Math.ceil(Number(total) / Number(limit)),
        };
    };

    async updateBlog(
        blogId: number, 
        content: string,
        title: string
    ) {
        const updatedBlog = await this.prismaService.blog.update({
            data: {
                content: content,
                title: title,
            },
            where: {
                id: blogId
            }
        });
        return updatedBlog;
    };
    
    async deleteBlog(blogId: number) {
        const deletedBlog = await this.prismaService.blog.delete({
            where: {
                id: blogId
            }
        });
        return deletedBlog;
    };
}