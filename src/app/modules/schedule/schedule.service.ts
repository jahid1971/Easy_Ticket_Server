import { prisma } from "../../services/prisma.service";
import { TQueryObject } from "../../types/common";
import getAllItems from "../../utils/getAllItems";
import { Schedule } from "../../types";

const getSchedules = async (query: TQueryObject) => {
    // Optional source/destination => filter by route
    if (query.source || query.destination) {
        const routeWhere: Record<string, unknown> = {};

        if (query.source) routeWhere.source = String(query.source).trim();
        if (query.destination) routeWhere.destination = String(query.destination).trim();

        const routes = await prisma.route.findMany({ where: routeWhere as any, select: { id: true } });
        const routeIds = routes.map((r) => r.id);

        if (routeIds.length === 0) {
            return {
                data: [],
                meta: {
                    page: Number(query.page) || 1,
                    limit: Number(query.limit) || 10,
                    total: 0,
                    totalPages: 0,
                },
            };
        }

        query.routeId = { in: routeIds } 
    }
    const result = await getAllItems<Schedule>(prisma.schedule , query , {
        filterableFields: ["routeId", "busId"],
        include: { bus: true, route: true } as any,
        orderBy: { date: (query?.sortOrder as any) || "asc" },
        isDeletedCondition: false,
    });

    return result;
};

export const scheduleService = {
    getSchedules,
};

export default scheduleService;
