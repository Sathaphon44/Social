import { Router } from "express";
import commentFeedbackController from "./bootstrap";
import { UserAuth } from "../../utils/auth";

const route = Router();

route.post("/", UserAuth, commentFeedbackController.create.bind(commentFeedbackController))
route.put("/", UserAuth,  commentFeedbackController.edit.bind(commentFeedbackController))
route.delete("/", UserAuth,  commentFeedbackController.delete.bind(commentFeedbackController))
route.get("/", commentFeedbackController.getAll.bind(commentFeedbackController))

export default route;