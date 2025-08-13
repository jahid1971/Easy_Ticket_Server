import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendSuccessResponse from "../../utils/sendSuccessResponse";
import scheduleService from "./schedule.service";
import { TQueryObject } from "../../types/common";

const getSchedules = catchAsync(async (req: Request, res: Response) => {
    const query = req.query as unknown as TQueryObject;
    const result = await scheduleService.getSchedules(query);
    sendSuccessResponse(res, result, "Schedules fetched successfully");
});

export const scheduleController = {
    getSchedules,
};
