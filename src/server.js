import express from "express";
import Routes from "./routes.js";

import Cors from "cors";

const app = express();

app.use(Cors());
app.use(express.json());
app.use(Routes);

app.listen(process.env.PORT || 3333);
