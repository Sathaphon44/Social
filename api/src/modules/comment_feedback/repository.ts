import { PrismaClient } from "@prisma/client";
import { CreateCommentFeedback, DeleteCommentFeedback, UpdateCommentFeedback } from "./models";

class CommentFeedbackRepository {

    constructor(protected db: PrismaClient) { }


    async create(data: CreateCommentFeedback) {
        return await this.db.comment_feedback.create(
            {
                data: data,
                include: {
                    users: {
                        select: {
                            id: true,
                            username: true
                        }
                    }
                }
            }
        )
    }

    async edit(data: UpdateCommentFeedback) {
        return await this.db.comment_feedback.update(
            {
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
                    }
                }
            }
        )
    }

    async delete(data: DeleteCommentFeedback) {
        return await this.db.comment_feedback.delete(
            {
                where: {
                    id: data.id,
                    userId: data.userId
                },
            }
        )
    }
}


export default CommentFeedbackRepository;