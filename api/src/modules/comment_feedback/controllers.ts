import { Request, Response } from "express";
import CommentFeedbackRepository from "./repository";
import { CreateCommentFeedback } from "./models";

export default class CommentFeedbackController {

    constructor(protected commentFeedbackRepository: CommentFeedbackRepository) { }

    getAll(req: Request, res: Response) {
        return res.json("test")
    }

    async create(req: Request, res: Response) {
        try {
            const userId = req.params.id;
            const { content, postId, commentId } = req.body;

            if (!content || !postId || !commentId) {
                return res.status(400).json("data is require.")
            }

            let data: CreateCommentFeedback = {
                userId: userId,
                postId: postId,
                commentId: commentId,
                content: content,
            }
            const result = await this.commentFeedbackRepository.create(data);
            return res.status(201).json(result);
        } catch (error: any) {
            return res.status(500).json("internal error.")
        }
    }

    edit(req: Request, res: Response) {
        return res.json("test")
    }

    delete(req: Request, res: Response) {
        return res.json("test")
    }

}

