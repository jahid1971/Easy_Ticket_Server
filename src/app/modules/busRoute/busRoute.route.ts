import { Router } from "express";
import validateRequest from "../../middleWares/validateRequest";
import { busRouteValidationSchema } from "./busRoute.validation";
import { busRouteController } from "./busRoute.controller";

const router = Router();

router.post("/", validateRequest(busRouteValidationSchema.createBusRouteSchema), busRouteController.createBusRoute);
router.get("/", busRouteController.listBusRoutes);
router.get("/:id", busRouteController.getBusRoute);
router.patch("/:id", validateRequest(busRouteValidationSchema.updateBusRouteSchema), busRouteController.updateBusRoute);
router.delete("/:id", busRouteController.removeBusRoute);

export const busRouteRoutes = router;
