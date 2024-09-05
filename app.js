import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";

import userRouter from "./router/user.route.js";
import eventRouter from "./router/event.route.js"
import bookinRouter from "./router/booking.route.js"

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/event", eventRouter);
app.use("/api/booking", eventRouter);


export default app;
