import { PrismaClient } from "@prisma/client";
import AuthRepository from "./repository";
import AuthController from "./controllers";

const db = new PrismaClient()
const authRepository = new AuthRepository(db);
const authController = new AuthController(authRepository);

export default authController;