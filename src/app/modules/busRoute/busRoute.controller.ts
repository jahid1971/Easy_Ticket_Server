import catchAsync from "../../utils/catchAsync";
import sendSuccessResponse from "../../utils/sendSuccessResponse";
import { busRouteService } from "./busRoute.service";

const createBusRoute = catchAsync(async (req, res) => {
    const result = await busRouteService.createBusRoute(req.body);
    sendSuccessResponse(res, result, "Route created", 201);
});

const listBusRoutes = catchAsync(async (req, res) => {
    const result = await busRouteService.getBusRoutes();
    sendSuccessResponse(res, result, "Routes fetched");
});

const getBusRoute = catchAsync(async (req, res) => {
    const result = await busRouteService.getBusRouteById(req.params.id);
    sendSuccessResponse(res, result, "Route fetched");
});

const updateBusRoute = catchAsync(async (req, res) => {
    const result = await busRouteService.updateBusRoute(req.params.id, req.body);
    sendSuccessResponse(res, result, "Route updated");
});

const removeBusRoute = catchAsync(async (req, res) => {
    await busRouteService.deleteBusRoute(req.params.id);
    sendSuccessResponse(res, null, "Route deleted");
});

export const busRouteController = {
    createBusRoute,
    listBusRoutes,
    getBusRoute,
    updateBusRoute,
    removeBusRoute,
};
