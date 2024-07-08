import { Request, Response } from "express";
import UserRepository from "./repository";
import { CreateUser, UserModel } from "./models";

class UserController {

    constructor(protected userRepository: UserRepository) { }


    async getUserById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).send("id is required.")
            }
            const user = await this.userRepository.getUserById(id)
            if (!user) {
                return res.status(200).json(user)
            }
            const { password, ...newData } = user;
            return res.status(200).json(newData)
        } catch (error: any) {
            return res.status(500).json("server error.")
        }
    }




}


export default UserController;