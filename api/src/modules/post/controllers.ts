import { Request, Response } from "express";
import PostRepository from "./repository";
import { CreatePost, DeletePost, PostModel, UpdatePost } from "./models";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

class PostController {

    constructor(protected postRepository: PostRepository) { }



    async getAll(req: Request, res: Response) {
        try {
            const posts = await this.postRepository.getAll();
            return res.status(200).json(posts)
        } catch (error) {
            return res.status(500).json("server error.")
        }
    }

    async getAllByUserId(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const posts = await this.postRepository.getAllByUserId(id);
            return res.status(200).json(posts)
        } catch (error) {
            return res.status(500).json("server error.")
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { content } = req.body;
            const { id } = req.params;

            if (!content) {
                return res.status(400).send("data is required.")
            }
            console.log(id)
            const createPost: CreatePost = {
                content,
                userId: id,
                create_at: new Date(),
                update_at: new Date(),
            }

            const post = await this.postRepository.create(createPost);
            return res.status(200).json(post)

        } catch (error: any) {
            console.log(error)
            return res.status(500).json("server error.")
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id, content } = req.body;
            if (!id || !content) {
                return res.status(400).send("data is required.")
            }
            const data: UpdatePost = {
                id: parseInt(id),
                content,
                update_at: new Date(),
                userId: req.params.id
            }
            const postUpdated = await this.postRepository.update(data)
            return res.status(200).json(postUpdated)
        } catch (error: any) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2025") {
                    return res.status(400).json("post not found.")
                }
            }
            console.log(error)
            return res.status(500).json("server error.")
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.body;
            if (!id) {
                return res.status(400).send("data is required.")
            }
            const deletePost: DeletePost = {
                userId: req.params.id,
                id: parseInt(id)
            }
            const postDeleted = await this.postRepository.delete(deletePost)
            return res.status(200).json(postDeleted)
        } catch (error: any) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2025") {
                    return res.status(400).json("post not found.")
                }
            }
            console.log(error)
            return res.status(500).json("server error.")
        }
    }
}


export default PostController;