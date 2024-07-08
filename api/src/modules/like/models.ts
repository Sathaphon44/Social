export interface LikeModel {
    id: number;
    postId: number;
    userId: string;
    create_at: Date;
};


export type CreateLike = Omit<LikeModel, "id">;
export type DeleteLike = Omit<LikeModel, "id" | "create_at">;