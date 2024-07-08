import { PrismaClient } from "@prisma/client";
import UserRepository from "./repository";
import UserController from "./controllers";

const db = new PrismaClient()
const userRepository = new UserRepository(db);
const userController = new UserController(userRepository);

export default userController;