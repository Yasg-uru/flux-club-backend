import { Router } from "express";
import {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
} from "../controller/event.controller.js";
import {
  authorization,
  isAuthenticated,
} from "../middleware/auth.middleware.js";
const eventRouter = Router();
eventRouter.post("/", isAuthenticated, authorization("admin"), createEvent);
eventRouter.put("/", isAuthenticated, authorization("admin"), updateEvent);
eventRouter.get("/", getEvents);
eventRouter.delete("/", isAuthenticated, authorization("admin"), deleteEvent);
export default eventRouter;
