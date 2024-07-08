import { PrismaClient } from "@prisma/client";
import { CreateLike, DeleteLike } from "./models";

export default class LikeRepository {

    constructor(protected db: PrismaClient) { }


    getAllByPostId = async (postId: number) => {
        return await this.db.post_like.findMany({
            where: { postId: postId }
        })
    }

    getByUserIdAndPostId = async (userId: string, postId: number) => {
        return await this.db.post_like.findMany({
            where: { userId: userId, postId: postId }
        })
    }


    create = async (data: CreateLike) => {
        return await this.db.post_like.create({
            data
        })
    }

    delete = async (data: DeleteLike) => {
        return await this.db.post_like.deleteMany({
            where: { userId: data.userId, postId: data.postId }
        })
    }

}
