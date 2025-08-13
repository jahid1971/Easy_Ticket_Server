import { z } from "zod";
import { prisma } from '../../services/prisma.service';

// Seat id like A1, B12
const seatId = z.string().regex(/^[A-Z]\d+$/i, "Invalid seat id");

// seatMap schema: layout
const seatMapSchema = z
    .object({
        layout: z.array(z.array(seatId)).min(1),
    })
    .superRefine((val, ctx) => {
        const rowLength = val.layout[0]?.length || 0;

        for (let i = 0; i < val.layout.length; i++) {
            if (
                !Array.isArray(val.layout[i]) ||
                val.layout[i].length !== rowLength
            ) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `All rows in layout must have the same number of columns`,
                });
                break;
            }
        }
    });

// Optional columnPosition: 1-based visual column indices per side
const columnPositionSchema = z
    .object({
        leftSide: z.array(z.number().int().positive()).min(1),
        rightSide: z.array(z.number().int().positive()).min(1),
    })
    .superRefine((val, ctx) => {
        const all = [...val.leftSide, ...val.rightSide];
        const set = new Set(all);
        if (set.size !== all.length) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message:
                    "column indices must be unique across leftSide and rightSide",
            });
        }
    });

// Create bus schema with cross-field checks
const createBusSchema = z
    .object({
        name: z.string().min(1),
        operator: z.string().min(1),
        registrationNumber: z.string().min(1),
        seatMap: seatMapSchema,
        columnPosition: columnPositionSchema.optional(),
    })
    .superRefine((val, ctx) => {
        if (val.columnPosition) {
            const cols = val.seatMap.layout[0]?.length || 0;
            const all = [
                ...val.columnPosition.leftSide,
                ...val.columnPosition.rightSide,
            ];

            for (const idx of all) {
                if (idx < 1 || idx > cols) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: `columnPosition index ${idx} out of range 1..${cols}`,
                    });
                    break;
                }
            }
        }
    });

// Schema for updating any bus fields
const updateBusSchema = z
    .object({
        name: z.string().min(1).optional(),
        operator: z.string().min(1).optional(),
        registrationNumber: z.string().min(1).optional(),
        seatMap: seatMapSchema.optional(),
        routeId: z.string().uuid().optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
        message: "At least one field must be provided",
    })
    .superRefine(async (data, ctx) => {
        // route existence check
        if (data.routeId) {
            const route = await prisma.route.findUnique({
                where: { id: data.routeId },
            });
            if (!route)
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Route not found",
                });
        }
    });

export const busValidationSchema = {
    seatMapSchema,
    columnPositionSchema,
    createBusSchema,
    updateRouteSchema: z.object({ routeId: z.string().uuid() }),
    updateBusSchema,
};

export type SeatMap = z.infer<typeof seatMapSchema>;
