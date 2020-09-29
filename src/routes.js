import express from "express";

import UserController from "./controller/UserController.js";
import SessionController from "./controller/SessionController.js";
import RegiterController from "./controller/RegiterController.js";

// import authMiddeware from "./middlewares/auth";

const route = express.Router();

route.post("/users", UserController.create);
route.post("/session", SessionController.create);

// route.use(authMiddeware);

route.post("/register", RegiterController.create);
route.get("/register", RegiterController.index);

export default route;
