import { Router } from "express";
import { busController } from "./bus.controller";
import validateRequest from "../../middleWares/validateRequest";
import { busValidationSchema } from "./bus.validation";

const router = Router();

// Public: search buses
router.get("/", busController.getBuses);

// Admin: create bus
router.post(
    "/",
    validateRequest(busValidationSchema.createBusSchema),
    busController.createBus
);

export const busRoutes = router;
