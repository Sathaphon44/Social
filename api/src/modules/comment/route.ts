import { Router } from "express";
import { UserAuth } from "../../utils/auth";
import commentController from "./bootstrap";

const route = Router();

route.get("/:postId", commentController.getAllByPostId.bind(commentController));
route.post("/", UserAuth, commentController.create.bind(commentController));
route.put("/", UserAuth, commentController.edit.bind(commentController));
route.delete("/", UserAuth, commentController.delete.bind(commentController));

export default route;