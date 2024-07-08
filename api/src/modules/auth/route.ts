import { Router } from "express";
import userController from "./bootstrap";

const route = Router();

route.post("/sign-in", userController.signIn.bind(userController));
route.post("/sign-up", userController.signUp.bind(userController));


export default route;