import express from "express";
import Routes from "./routes.js";

const app = express();

app.use(express.json());
app.use(Routes);

app.listen(process.env.PORT || 3333);
