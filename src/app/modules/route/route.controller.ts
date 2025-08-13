import catchAsync from "../../utils/catchAsync";
import sendSuccessResponse from "../../utils/sendSuccessResponse";
import { routeService } from "./route.service";

const createRoute = catchAsync(async (req, res) => {
    const result = await routeService.createRoute(req.body);
    sendSuccessResponse(res, result, "Route created", 201);
});

const listRoutes = catchAsync(async (req, res) => {
    const result = await routeService.getRoutes();
    sendSuccessResponse(res, result, "Routes fetched");
});

const getRoute = catchAsync(async (req, res) => {
    const result = await routeService.getRouteById(req.params.id);
    sendSuccessResponse(res, result, "Route fetched");
});

const updateRoute = catchAsync(async (req, res) => {
    const result = await routeService.updateRoute(req.params.id, req.body);
    sendSuccessResponse(res, result, "Route updated");
});

const removeRoute = catchAsync(async (req, res) => {
    await routeService.deleteRoute(req.params.id);
    sendSuccessResponse(res, null, "Route deleted");
});

export const routeController = {
    createRoute,
    listRoutes,
    getRoute,
    updateRoute,
    removeRoute,
};
