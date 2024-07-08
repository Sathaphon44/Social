export interface UserModel {
    id: string;
    username: string;
    email: string;
    password: string;
}


export type SignInModel = Omit<UserModel, "id" | "username">
export type SignUpModel = Omit<UserModel, "id">