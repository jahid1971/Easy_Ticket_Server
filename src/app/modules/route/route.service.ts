import AppError from "../../errors/AppError";
import { prisma } from "../../services/prisma.service";

const createRoute = async (data: { source: string; destination: string; distance: number }) => {
    const existing = await prisma.route.findFirst({
        where: { source: data.source, destination: data.destination },
    });

    if (existing) throw new AppError(400, "Route already exists");

    const route = await prisma.route.create({ data });
    return route;
};

const getRoutes = async () => {
    const routes = await prisma.route.findMany();
    return routes;
};

const getRouteById = async (id: string) => {
    const route = await prisma.route.findUnique({ where: { id } });
    if (!route) throw new AppError(404, "Route not found");
    return route;
};

const updateRoute = async (id: string, data: Partial<{ source: string; destination: string; distance: number }>) => {
    const route = await prisma.route.update({ where: { id }, data });
    return route;
};

const deleteRoute = async (id: string) => {
    await prisma.route.delete({ where: { id } });
    return true;
};

export const routeService = {
    createRoute,
    getRoutes,
    getRouteById,
    updateRoute,
    deleteRoute,
};
