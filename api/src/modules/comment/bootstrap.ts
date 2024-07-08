import { PrismaClient } from "@prisma/client";
import CommentRepository from "./repository";
import CommentController from "./controllers";

const db = new PrismaClient()
const commentRepository = new CommentRepository(db);
const commentController = new CommentController(commentRepository);

export default commentController;