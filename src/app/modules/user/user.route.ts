import { Router } from "express";

import { userController } from "./user.controller";
import validateRequest from "../../middleWares/validateRequest";
import { userValidationSchema } from "./user.validation";
import { handleImageUpload } from "../../middleWares/handleImageUpload";


const router = Router();

router.post(
	"/register",
	handleImageUpload,
	validateRequest(userValidationSchema.registerValidationSchema),
	userController.registerUser
);

export const userRoutes = router;
