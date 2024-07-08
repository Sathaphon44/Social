import { PrismaClient } from "@prisma/client";
import CommentFeedbackRepository from "./repository";
import CommentFeedbackController from "./controllers";

const db = new PrismaClient()
const commentFeedbackRepository = new CommentFeedbackRepository(db);
const commentFeedbackController = new CommentFeedbackController(commentFeedbackRepository);

export default commentFeedbackController;