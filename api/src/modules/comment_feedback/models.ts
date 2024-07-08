export interface CommentFeedbackModel {
    id: number;
    content: string;
    create_at: Date;
    update_at: Date;
    userId: string;
    postId: number;
    commentId: number;
}


export type CreateCommentFeedback = Omit<CommentFeedbackModel, "id" | "create_at" | "update_at">
export type UpdateCommentFeedback = Pick<CommentFeedbackModel, "id" | "userId" | "content" | "update_at">
export type DeleteCommentFeedback = Pick<CommentFeedbackModel, "id" | "userId">