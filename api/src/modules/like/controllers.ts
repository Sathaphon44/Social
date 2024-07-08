import { Request, Response } from "express";
import LikeRepository from "./repository";
import { CreateLike, DeleteLike } from "./models";

export default class LikeController {

    constructor(protected likeRepository: LikeRepository) { }


    getAllByPostId = async (req: Request, res: Response) => {
        try {
            const { postId } = req.params;
            if (!postId) {
                return res.status(400).send("data is required.");
            }
            const likes = await this.likeRepository.getAllByPostId(parseInt(postId));
            return res.status(200).json(likes);
        } catch (error: any) {
            return res.status(500).json("server error.");
        }
    }

    createLike = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { postId } = req.body;
            if (!postId) {
                return res.status(400).send("data is required.");
            }
            const checkerLikeOfUser = await this.likeRepository.getByUserIdAndPostId(id, parseInt(postId));
            if (checkerLikeOfUser.length > 0) {
                return res.status(200).send("you already like this post.");
            }
            const data: CreateLike = {
                postId: parseInt(postId),
                userId: id,
                create_at: new Date(),
            }
            const like = await this.likeRepository.create(data);
            return res.status(201).json(like);
        } catch (error: any) {
            return res.status(500).json("server error.");
        }
    }

    deleteLike = async (req: Request, res: Response) => {
        try {
            const { postId } = req.body;
            const { id } = req.params;
            if (!postId) {
                return res.status(400).send("data is required.");
            }
            const data: DeleteLike = {
                postId: parseInt(postId),
                userId: id
            }
            const like = await this.likeRepository.delete(data);
            return res.status(200).json(like);
        } catch (error: any) {
            return res.status(500).json("server error.");
        }
    }

}

