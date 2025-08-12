import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendSuccessResponse from "../../utils/sendSuccessResponse";
import BusService from "./bus.service";


const createBus = catchAsync(async (req: Request, res: Response) => {
    const bus = await BusService.createBus(req.body);
    sendSuccessResponse(res, bus, "Bus created successfully", 201);
});

const getBuses = catchAsync(async (req: Request, res: Response) => {
    const result = await BusService.getBuses (req.query as any);
    sendSuccessResponse(res, result, "Buses fetched successfully");
});

export const busController = {
    createBus,
    getBuses,
};
