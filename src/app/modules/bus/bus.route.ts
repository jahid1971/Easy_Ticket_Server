import { Router } from "express";
import { busController } from "./bus.controller";
import validateRequest from "../../middleWares/validateRequest";
import { busValidationSchema } from "./bus.validation";
import checkAuth from "../../middleWares/checkAuth";
import { handleImageUpload } from "../../middleWares/handleImageUpload";

const router = Router();

// Admin/Operator: list/manage buses (public schedule search moved to /schedules)
router.get("/", checkAuth("ADMIN", "OPERATOR"), busController.getBuses);

// Admin: create bus
router.post(
    "/",
    checkAuth("ADMIN", "OPERATOR"),
    handleImageUpload,
    validateRequest(busValidationSchema.createBusSchema),
    busController.createBus
);

// Admin: update bus's route assignment
router.patch(
    "/:id/route",
    checkAuth("ADMIN", "OPERATOR"),
    validateRequest(busValidationSchema.updateRouteSchema),
    busController.updateBusRoute
);

// Admin: update bus details
router.patch(
    "/:id",
    checkAuth("ADMIN", "OPERATOR"),
    handleImageUpload,
    validateRequest(busValidationSchema.updateBusSchema),
    busController.updateBus
);

export const busRoutes = router;
