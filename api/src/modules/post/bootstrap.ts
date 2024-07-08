import { PrismaClient } from "@prisma/client";
import PostRepository from "./repository";
import PostController from "./controllers";

const db = new PrismaClient()
const postRepository = new PostRepository(db);
const postController = new PostController(postRepository);

export default postController;