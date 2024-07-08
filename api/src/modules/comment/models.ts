export interface CommentModel {
    id: number;
    content: string;
    create_at: Date;
    update_at: Date;
    userId: string;
    users: User;
    postId: number;
    comment_feedback: CommentFeedbackModel[];
}


interface CommentFeedbackModel {
    id: number;
    content: string;
    create_at: Date;
    update_at: Date;
    userId: string;
    users: User;
    postId: number;
    commentId: number;
}



interface User {
    id: string;
    username: string;
}

export type CreateComment = Omit<CommentModel, "id" | "users" | "comment_feedback">;
export type UpdateComment = Omit<CommentModel, "create_at" | "postId" | "users" | "comment_feedback">;
export type DeleteComment = Pick<CommentModel, "id" | "userId">;