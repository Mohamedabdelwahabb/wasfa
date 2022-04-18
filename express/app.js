import express from "express";
import bodyParser from "body-parser";

import userRouter from "./routes/users.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRouter);
app.listen(3000);
