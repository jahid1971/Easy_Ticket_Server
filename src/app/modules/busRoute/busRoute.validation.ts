import { z } from "zod";

const createBusRouteSchema = z.object({
    source: z.string().min(1, "Source is required"),
    destination: z.string().min(1, "Destination is required"),
    distance: z.number().positive("Distance must be positive"),
});

const updateBusRouteSchema = createBusRouteSchema.partial();

export const busRouteValidationSchema = {
    createBusRouteSchema,
    updateBusRouteSchema,
};
