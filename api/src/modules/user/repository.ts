import { PrismaClient } from "@prisma/client";
import { UserModel } from "./models";

class UserRepository {
    
    constructor( protected db: PrismaClient ) {}


    async getUserById(id: string) {
        return await this.db.users.findUnique({
            where: { id: id }
        })
    }


}


export default UserRepository;