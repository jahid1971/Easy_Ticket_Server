import { Router } from 'express';
import { userRoutes } from "../modules/user/user.route";
import { authRoutes } from "../modules/auth/auth.route";
import { busRoutes } from "../modules/bus/bus.route";
import { scheduleRoutes } from "../modules/schedule/schedule.route";
import { busRouteRoutes } from "../modules/busRoute/busRoute.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/buses", busRoutes);
router.use("/schedules", scheduleRoutes);
router.use("/routes", busRouteRoutes);

export default router;
