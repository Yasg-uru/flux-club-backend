import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";

import userRouter from "./router/user.route.js";
import eventRouter from "./router/event.route.js";

import bookingRouter from "./router/booking.route.js";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();
app.use(
  cors({
    origin: ["https://clubflux.netlify.app", "http://localhost:5173","https://flux-frontend.vercel.app"],
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/event", eventRouter);
app.use("/api/booking", bookingRouter);
app.use(errorMiddleware);

export default app;
