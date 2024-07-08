import { Router } from "express";
import { UserAuth } from "../../utils/auth";
import likeController from "./bootstrap";


const route = Router();


route.get("/:postId", UserAuth, likeController.getAllByPostId.bind(likeController));
route.post("/", UserAuth, likeController.createLike.bind(likeController));
route.delete("/", UserAuth, likeController.deleteLike.bind(likeController));


export default route;