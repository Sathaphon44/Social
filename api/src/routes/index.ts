import { Router } from "express";
import UserRoute from "../modules/user";
import AuthRoute from "../modules/auth";
import PostRoute from "../modules/post";
import CommentRouter from "../modules/comment";
import LikeRouter from "../modules/like";
import CommentFeedbackRouter from "../modules/comment_feedback";

const routes = Router();

routes.use("/user", UserRoute);
routes.use("/auth", AuthRoute);
routes.use("/post", PostRoute);
routes.use("/comment", CommentRouter);
routes.use("/comment-feedback", CommentFeedbackRouter);
routes.use("/like", LikeRouter);

export default routes;