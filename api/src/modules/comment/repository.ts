import { PrismaClient } from "@prisma/client";
import { CommentModel, CreateComment, DeleteComment, UpdateComment } from "./models";

class CommentRepository {

    constructor(protected db: PrismaClient) { }



    async getAllByPostId(postId: number): Promise<CommentModel[]> {
        return await this.db.comment.findMany({
            where: { postId: postId },
            include: {
                users: {
                    select: {
                        id: true,
                        username: true
                    }
                },
                comment_feedback: {
                    include: {
                        users: {
                            select: {
                                id: true,
                                username: true
                            }
                        }
                    }
                }
            }
        })
    }


    async create(data: CreateComment): Promise<CommentModel> {
        return await this.db.comment.create({
            data: data,
            include: {
                users: {
                    select: {
                        id: true,
                        username: true
                    }
                },
                comment_feedback: {
                    include: {
                        users: {
                            select: {
                                id: true,
                                username: true
                            }
                        }
                    }
                }
            }
        })
    }

    async edit(data: UpdateComment): Promise<CommentModel> {
        return await this.db.comment.update({
            where: {
                id: data.id,
                userId: data.userId
            },
            data: {
                content: data.content,
                update_at: data.update_at
            },
            include: {
                users: {
                    select: {
                        id: true,
                        username: true
                    }
                },
                comment_feedback: {
                    include: {
                        users: {
                            select: {
                                id: true,
                                username: true
                            }
                        }
                    }
                }
            }
        })
    }


    async delete(data: DeleteComment): Promise<CommentModel> {
        return await this.db.comment.delete({
            where: { id: data.id, userId: data.userId },
            include: {
                users: {
                    select: {
                        id: true,
                        username: true
                    }
                },
                comment_feedback: {
                    include: {
                        users: {
                            select: {
                                id: true,
                                username: true
                            }
                        }
                    }
                }
            }
        })
    }
}


export default CommentRepository;