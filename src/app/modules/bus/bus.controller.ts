import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendSuccessResponse from "../../utils/sendSuccessResponse";
import BusService from "./bus.service";
import { TQueryObject } from "../../types/common";

const createBus = catchAsync(async (req: Request, res: Response) => {
    
    const bus = await BusService.createBus(
        req.body as any,
        req.file as Express.Multer.File | undefined
    );
    sendSuccessResponse(res, bus, "Bus created successfully", 201);
});

const getBuses = catchAsync(async (req: Request, res: Response) => {
    const query = req.query as unknown as TQueryObject;
    const result = await BusService.getBuses(query);
    sendSuccessResponse(res, result, "Buses fetched successfully");
});

// Update bus route
const updateBusRoute = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { routeId } = req.body as { routeId: string };
    const updated = await BusService.updateBusRoute(id, routeId);
    sendSuccessResponse(res, updated, "Bus route updated successfully");
});


const updateBus = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body as Partial<Record<string, unknown>>;
    const updated = await BusService.updateBus(
        id,
        data as any,
        req.file as Express.Multer.File | undefined
    );
    sendSuccessResponse(res, updated, "Bus updated successfully");
});

export const busController = {
    createBus,
    getBuses,
    updateBusRoute,
    updateBus,
};
