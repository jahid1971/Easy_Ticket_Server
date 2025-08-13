import { Response } from "express";

export type TMetaData = {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};

const sendSuccessResponse = <T>(
    res: Response,
    data: T | { data: T; meta?: TMetaData },
    message: string,
    statusCode: number = 200,
    meta?: TMetaData
) => {
    const isWrapped = (d: unknown): d is { data: unknown; meta?: TMetaData } =>
        typeof d === "object" && d !== null && "data" in (d as any);

    const responseData = {
        success: true,
        statusCode: statusCode,
        message: message,
        data: isWrapped(data) ? data.data : data,
        meta: isWrapped(data) ? data.meta || meta : meta || undefined,
    };
    console.log(message);
    return res.status(statusCode).json(responseData);
};

export default sendSuccessResponse;
