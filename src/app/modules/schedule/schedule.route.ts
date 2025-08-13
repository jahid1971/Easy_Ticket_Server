import { Router } from "express";
import { scheduleController } from "./schedule.controller";

const router = Router();

// Public: search schedules (available buses for a route/date)
router.get("/", scheduleController.getSchedules);

export const scheduleRoutes = router;
