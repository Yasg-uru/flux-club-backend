import { Router } from "express";
import {bookEvent,cancelBooking} from "../controller/booking.controller.js"
import {
  authorization,
  isAuthenticated,
} from "../middleware/auth.middleware.js";
const bookingRouter = Router();
bookingRouter.post("/",isAuthenticated,authorization('user'),bookEvent)
bookingRouter.post("/",isAuthenticated,authorization('user'),cancelBooking)
export default bookingRouter;
