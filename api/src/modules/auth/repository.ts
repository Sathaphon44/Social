import { PrismaClient } from "@prisma/client";
import { UserModel } from "./models";

class AuthRepository {

    constructor(protected db: PrismaClient) { }

    async createUser(data: UserModel) {
        return await this.db.users.create({
            data: data
        })
    }


    async getUserByEmail(email: string): Promise<UserModel | null> {
        const user = await this.db.users.findUnique({
            where: { email: email }
        })
        return user;
    }


}


export default AuthRepository;