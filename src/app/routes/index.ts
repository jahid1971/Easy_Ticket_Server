import { Router } from 'express';
import { userRoutes } from "../modules/user/user.route";
import { authRoutes } from "../modules/auth/auth.route";
import { busRoutes } from "../modules/bus/bus.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/buses", busRoutes);

export default router;
