import { Router } from "express";
import userController from "./bootstrap";
import { UserAuth } from "../../utils/auth";

const route = Router();

route.get("/session", UserAuth, userController.getUserById.bind(userController));

export default route;