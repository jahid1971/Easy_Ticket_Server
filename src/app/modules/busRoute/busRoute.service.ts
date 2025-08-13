import AppError from "../../errors/AppError";
import { prisma } from "../../services/prisma.service";

const createBusRoute = async (data: { source: string; destination: string; distance: number }) => {
    const existing = await prisma.route.findFirst({
        where: { source: data.source, destination: data.destination },
    });

    if (existing) throw new AppError(400, "Route already exists");

    const route = await prisma.route.create({ data });
    return route;
};

const getBusRoutes = async () => {
    const routes = await prisma.route.findMany();
    return routes;
};

const getBusRouteById = async (id: string) => {
    const route = await prisma.route.findUnique({ where: { id } });
    if (!route) throw new AppError(404, "Route not found");
    return route;
};

const updateBusRoute = async (id: string, data: Partial<{ source: string; destination: string; distance: number }>) => {
    const route = await prisma.route.update({ where: { id }, data });
    return route;
};

const deleteBusRoute = async (id: string) => {
    await prisma.route.delete({ where: { id } });
    return true;
};

export const busRouteService = {
    createBusRoute,
    getBusRoutes,
    getBusRouteById,
    updateBusRoute,
    deleteBusRoute,
};
