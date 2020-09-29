import express from "express";

import UserController from "./controller/UserController";
import SessionController from "./controller/SessionController";
import RegiterController from "./controller/RegiterController";

import authMiddeware from "./middlewares/auth";

const route = express.Router();

route.post("/users", UserController.create);
route.post("/session", SessionController.create);

// route.use(authMiddeware);

route.post("/register", RegiterController.create);
route.get("/register", RegiterController.index);

export default route;
