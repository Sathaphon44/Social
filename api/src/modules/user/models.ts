export interface UserModel {
    id: string;
    email: string;
    username: string;
    password: string;
    create_at: Date;
    update_at: Date;
}


export type CreateUser = Omit<UserModel, "id" | "create_at" | "update_at"> 