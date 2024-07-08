import { CreateUser, UserModel } from "./models";
import AuthRepository from "./repository";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import config from "../../config/config";
import jwt from "jsonwebtoken";


class AuthController {

    constructor(protected authRepository: AuthRepository) { }



    async signIn(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            if (!email && !password) {
                return res.status(400).send("data is required.");
            }
            const user: UserModel | null = await this.authRepository.getUserByEmail(email);
            if (!user) {
                return res.status(400).send("user not found.");
            }
            const passwordCompared = await bcrypt.compare(password, user.password);
            if (!passwordCompared) {
                return res.status(400).send("password not match.");
            }
            const token = jwt.sign({ id: user.id }, config.jwt_secret, { expiresIn: "1d" });
            return res.status(200).json({ token: token, message: "login success" });
        } catch (error: any) {
            return res.status(500).json("server error.");
        }
    }


    async signUp(req: Request, res: Response) {
        try {

            const { email, password, username }: CreateUser = req.body;
            if (!email || !password || !username) {
                return res.status(400).send("data is required.");
            }

            const hashPassword = await bcrypt.hash(password, 10);
            const createUser: UserModel = {
                id: uuidv4(),
                create_at: new Date(),
                update_at: new Date(),
                email: email,
                username: username,
                password: hashPassword
            }
            const result = await this.authRepository.createUser(createUser);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json("server error.");
        }
    }

}


export default AuthController;