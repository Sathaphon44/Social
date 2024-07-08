import { Router } from "express";
import { UserAuth } from "../../utils/auth";
import postController from "./bootstrap";

const route = Router();

route.get("/", postController.getAll.bind(postController));
route.get("/for-user", UserAuth, postController.getAllByUserId.bind(postController));
route.post("/", UserAuth, postController.create.bind(postController));
route.put("/", UserAuth, postController.update.bind(postController));
route.delete("/", UserAuth, postController.delete.bind(postController));

export default route;