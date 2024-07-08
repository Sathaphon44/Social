import { Request, Response } from "express";
import { CommentModel, CreateComment, DeleteComment, UpdateComment } from "./models";
import CommentRepository from "./repository";

export default class CommentController {

    constructor(protected commentRepository: CommentRepository) { }

    async getAllByPostId(req: Request, res: Response) {
        try {
            const { postId } = req.params;
            const comments: CommentModel[] = await this.commentRepository.getAllByPostId(parseInt(postId))
            return res.status(200).json(comments)
        } catch (error: any) {
            return res.status(500).json("server error.")
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { postId, content } = req.body;
            const { id } = req.params;
            if (!postId || !content) {
                return res.status(400).send("data is required.")
            }
            const createComment: CreateComment = {
                postId: parseInt(postId),
                content,
                userId: id,
                create_at: new Date(),
                update_at: new Date(),
            }
            const comment = await this.commentRepository.create(createComment);
            return res.status(200).json(comment)
        } catch (error: any) {
            return res.status(500).json("server error.")
        }
    }

    async edit(req: Request, res: Response) {
        try {
            const { id, content } = req.body;
            const user = req.params;
            if (!id || !content) {
                return res.status(400).send("data is required.")
            }
            const data: UpdateComment = {
                id: parseInt(id),
                content,
                update_at: new Date(),
                userId: user.id
            }
            const commentUpdated = await this.commentRepository.edit(data)
            return res.status(200).json(commentUpdated)
        } catch (error: any) {
            return res.status(500).json("server error.")
        }
    }


    async delete(req: Request, res: Response) {
        try {
            const { id } = req.body;
            const user = req.params;
            if (!id) {
                return res.status(400).send("data is required.")
            }
            const data: DeleteComment = {
                id: parseInt(id),
                userId: user.id
            }
            const commentDeleted = await this.commentRepository.delete(data)
            return res.status(200).json(commentDeleted)
        } catch (error: any) {
            return res.status(500).json("server error.")
        }
    }
}

