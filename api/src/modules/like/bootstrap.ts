import { PrismaClient } from "@prisma/client";
import LikeRepository from "./repository";
import LikeController from "./controllers";

const db = new PrismaClient()
const likeRepository = new LikeRepository(db);
const likeController = new LikeController(likeRepository);

export default likeController;