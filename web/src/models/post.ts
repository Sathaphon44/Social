

export interface PostModel {
    id: number;
    content: string;
    create_at: Date;
    update_at: Date;
    userId: string;
    users: Users;
    _count: Count;
    post_like: PostLike[];
}

export interface Count {
    post_like: number;
    comment: number;
    comment_feedback: number;
}

export interface Users {
    id: string;
    username: string;
}


export interface PostLike {
    id: number;
    userId: string;
    postId: number;
    create_at: Date;
}

export type CreateLike = Pick<PostLike, "postId">
export type DeleteLike = Pick<PostLike, "postId">

export interface CommentModel {
    id: number;
    content: string;
    userId: string;
    users: Users;
    postId: number;
    create_at: Date;
    update_at: Date;
    comment_feedback: CommentFeedbackModel[]
}

export type CreateComment = Pick<CommentModel, "content" | "postId">
export type DeleteComment = Pick<CommentModel, "id">
export type EditComment = Pick<CommentModel, "id" | "content">

export interface CommentFeedbackModel {
    id: number;
    content: string;
    userId: string;
    postId: number;
    commentId: number;
    create_at: Date;
    update_at: Date;
    users: Users
}

export type CreateCommentFeedback = Pick<CommentFeedbackModel, "content" | "commentId" | "postId" | "userId">
export type DeleteCommentFeedback = Pick<CommentFeedbackModel, "id">
export type EditCommentFeedback = Pick<CommentFeedbackModel, "id" | "content">