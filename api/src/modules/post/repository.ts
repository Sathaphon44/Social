import { PrismaClient } from "@prisma/client";
import { CreatePost, DeletePost, PostModel, UpdatePost } from "./models";

class PostRepository {
    
    constructor( protected db: PrismaClient ) {}


    async getAll(): Promise<PostModel[]> {
        const posts: PostModel[] = await this.db.post.findMany({
            select: {
                id: true,
                content: true,
                create_at: true,
                update_at: true,
                userId: true,
                users: {
                    select: {
                        id: true,
                        username: true,
                    }
                },
                _count: {
                    select: {
                        post_like: true,
                        comment: true,
                        comment_feedback: true,
                    }
                },
            },
            orderBy: { create_at: "desc" }
        })
        return posts;
    }

    async getAllByUserId(userId: string): Promise<PostModel[]> {
        const posts: PostModel[] = await this.db.post.findMany({
            select: {
                id: true,
                content: true,
                create_at: true,
                update_at: true,
                userId: true,
                users: {
                    select: {
                        id: true,
                        username: true,
                    }
                },
                _count: {
                    select: {
                        post_like: true,
                        comment: true,
                        comment_feedback: true,
                    }
                },
                post_like: {
                    where: {
                        userId: userId
                    },
                    select: {
                        id: true,
                        userId: true,
                        postId: true,
                        create_at: true
                    }
                }
            },
            orderBy: { create_at: "desc" }
        })
        return posts;
    }

    async create(data: CreatePost) {
        const post = await this.db.post.create({
            data: data,
        })
        return post;
    }

    async update(data: UpdatePost) {
        return await this.db.post.update({
            where: { id: data.id, userId: data.userId },
            data: {
                content: data.content,
                update_at: data.update_at
            }
        })
    }

    async delete(data: DeletePost) {
        return await this.db.post.delete({ where: { id: data.id, userId: data.userId } })
    }

}


export default PostRepository;