import { z } from "zod";

const createRouteSchema = z.object({
    routeName: z.string(),
    source: z.string().min(1, "Source is required"),
    destination: z.string().min(1, "Destination is required"),
    distance: z.number().positive("Distance must be positive"),
});

const updateRouteSchema = createRouteSchema.partial();

export const routeValidationSchema = {
    createRouteSchema,
    updateRouteSchema,
};
