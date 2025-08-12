import AppError from "../../errors/AppError";
import { prisma } from "../../services/prisma.service";
import { TQueryObject } from "../../types/common";
import getAllItems from "../../utils/getAllItems";


type CreateBusDto = {
    name: string;
    operator: string;
    registrationNumber: string;
    seatMap: any;
};

const createBus = async (data: CreateBusDto) => {
    const { name, operator, registrationNumber, seatMap } = data;

    const existing = await prisma.bus.findFirst({
        where: { registrationNumber },
    });

    if (existing)
        throw new AppError(
            400,
            "Bus with this registration number already exists"
        );

    const bus = await prisma.bus.create({
        data: { name, operator, registrationNumber, seatMap },
    });

    return bus;
};

const getBuses = async (query: TQueryObject) => {

    // If source/destination provided, translate to routeId filter
    if (query.source || query.destination) {
        const routeWhere: any = {};

        if (query.source) routeWhere.source = String(query.source).trim();

        if (query.destination)
            routeWhere.destination = String(query.destination).trim();

        const routes = await prisma.route.findMany({
            where: routeWhere,
            select: { id: true },
        });
        
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

        query.routeId = { in: routeIds } as any;
    }

    // Use project helper to get paginated schedules with buses
    const result = await getAllItems<any>(prisma.schedule, query as any, {
        filterableFields: ["routeId", "busId"],
        include: { bus: true, route: true },
        orderBy: { date: (query?.sortOrder as any) || "asc" },
        isDeletedCondition: false,
    });

    return result;
};

export const BusService = {
    createBus,
    getBuses,
};

export default BusService;
