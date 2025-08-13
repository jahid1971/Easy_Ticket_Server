import { Router } from "express";
import validateRequest from "../../middleWares/validateRequest";
import { routeValidationSchema } from "./route.validation";
import { routeController } from "./route.controller";

const router = Router();

router.post("/", validateRequest(routeValidationSchema.createRouteSchema), routeController.createRoute);
router.get("/", routeController.listRoutes);
router.get("/:id", routeController.getRoute);
router.patch("/:id", validateRequest(routeValidationSchema.updateRouteSchema), routeController.updateRoute);
router.delete("/:id", routeController.removeRoute);

export const routeRoutes = router;
