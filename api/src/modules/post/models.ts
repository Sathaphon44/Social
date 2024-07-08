import { UserModel } from "../user/models";


export type UserInPost = Pick<UserModel, "id" | "username">;

export interface PostModel {
    id: number;
    content: string;
    create_at: Date;
    update_at: Date;
    userId: string;
    users: UserInPost;
    _count: Count;
    post_like?: PostLike[];
};

interface Count {
    comment: number;
    comment_feedback: number;
    post_like: number;
}

interface PostLike {
    id: number;
    create_at: Date;
    userId: string;
    postId: number;
};

export type CreatePost = Omit<PostModel, "id" | "users" | "_count" | "post_like">;

export type UpdatePost = Omit<PostModel, "create_at" | "users" | "_count" | "post_like">;

export type DeletePost = Pick<PostModel, "userId" | "id">;