import AppError from "../../errors/AppError";
import { prisma } from "../../services/prisma.service";
import { TQueryObject } from "../../types/common";
import getAllItems from "../../utils/getAllItems";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";

import { SeatMap } from "../../types/seatMap";
import { Bus } from "../../types";

type CreateBusDto = {
    name: string;
    operator: string;
    registrationNumber: string;
    seatMap: SeatMap;
    routeId?: string; // optional route assignment
    coverImageUrl?: string; // optional bus photo URL
};

const createBus = async (data: CreateBusDto, file?: Express.Multer.File) => {
    const {
        name,
        operator,
        registrationNumber,
        seatMap,
        routeId,
        coverImageUrl,
    } = data as any;
    // `file` buffer may be provided by the middleware; process below

    const existing = await prisma.bus.findFirst({
        where: { registrationNumber },
    });

    if (existing)
        throw new AppError(
            400,
            "Bus with this registration number already exists"
        );

    // Validate route if provided
    if (routeId) {
        const routeExists = await prisma.route.findUnique({
            where: { id: routeId },
        });
        if (!routeExists) throw new AppError(400, "Route not found");
    }

    let savedImageUrl: string | undefined = coverImageUrl;

    // If file buffer provided, process and save locally
    if (file && (file as any).buffer) {
        const uploadsDir = path.join(
            __dirname,
            "..",
            "..",
            "..",
            "uploads",
            "buses"
        );
        if (!fs.existsSync(uploadsDir))
            fs.mkdirSync(uploadsDir, { recursive: true });

        const realFile: Express.Multer.File = file as any;
        const ext = realFile.mimetype.split("/")[1] || "jpg";
        const filename = `${uuidv4()}-${Date.now()}.${ext}`;
        const filepath = path.join(uploadsDir, filename);

        // Resize to reasonable width and save
        await sharp((realFile as any).buffer)
            .resize(1200, null, { withoutEnlargement: true })
            .toFile(filepath);

        // savedImageUrl should be the public path
        savedImageUrl = `/uploads/buses/${filename}`;
    }

    const bus = await prisma.bus.create({
        data: {
            name,
            operator,
            registrationNumber,
            seatMap,
            ...(routeId ? { routeId } : {}),
            ...(savedImageUrl ? { coverImageUrl: savedImageUrl } : {}),
        },
    });

    return bus;
};

// DTO for partial bus updates
type UpdateBusDto = {
    name?: string;
    operator?: string;
    registrationNumber?: string;
    seatMap?: SeatMap;
    routeId?: string;
};

// Update any bus fields
const updateBus = async (
    busId: string,
    data: UpdateBusDto,
    file?: Express.Multer.File
) => {
    // Ensure bus exists
    const existingBus = await prisma.bus.findUnique({ where: { id: busId } });
    if (!existingBus) throw new AppError(404, "Bus not found");


    if (
        data.registrationNumber &&
        data.registrationNumber !== existingBus.registrationNumber
    ) {
        const dup = await prisma.bus.findFirst({
            where: {
                registrationNumber: data.registrationNumber,
                NOT: { id: busId },
            },
        });
        if (dup) throw new AppError(400, "Registration number already in use");
    }

    // Validate route if provided
    if (data.routeId) {
        const routeExists = await prisma.route.findUnique({
            where: { id: data.routeId },
        });
        if (!routeExists) throw new AppError(400, "Route not found");
    }


    // If file provided, process image and set coverImageUrl
    if (file && file.buffer) {
        const uploadsDir = path.join(
            __dirname,
            "..",
            "..",
            "..",
            "uploads",
            "buses"
        );
        if (!fs.existsSync(uploadsDir))
            fs.mkdirSync(uploadsDir, { recursive: true });

        const ext = file.mimetype.split("/")[1] || "jpg";
        const filename = `${uuidv4()}-${Date.now()}.${ext}`;
        const filepath = path.join(uploadsDir, filename);

        await sharp(file.buffer)
            .resize(1200, null, { withoutEnlargement: true })
            .toFile(filepath);

        const savedImageUrl = `/uploads/buses/${filename}`;

        // Delete old image if exists
        if (
            existingBus.coverImageUrl &&
            existingBus.coverImageUrl.startsWith("/uploads/")
        ) {
            try {
                const oldPath = path.join(
                    __dirname,
                    "..",
                    "..",
                    "..",
                    existingBus.coverImageUrl.replace(/^\//, "")
                );
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            } catch (err) {
                console.warn("Failed to delete old bus image:", err);
            }
        }

        data = { ...data, coverImageUrl: savedImageUrl } as UpdateBusDto & {
            coverImageUrl?: string;
        };
    }

    const updatedBus = await prisma.bus.update({
        where: { id: busId },
        data,
        include: { route: true },
    });
    return updatedBus;
};

const getBuses = async (query: TQueryObject) => {
    const result = await getAllItems<Bus>(prisma.bus, query as any, {
        filterableFields: ["name", "operator", "registrationNumber"],
        include: { route: true }, // include route details
        orderBy: { name: query?.sortOrder || "asc" },
        isDeletedCondition: false,
    });

    return result;
};

// Update a bus's assigned route
const updateBusRoute = async (busId: string, routeId: string) => {
    // Ensure bus exists
    const busExists = await prisma.bus.findUnique({ where: { id: busId } });
    if (!busExists) throw new AppError(404, "Bus not found");
    // Ensure route exists
    const routeExists = await prisma.route.findUnique({
        where: { id: routeId },
    });
    if (!routeExists) throw new AppError(404, "Route not found");
    // Update route assignment
    const updated = await prisma.bus.update({
        where: { id: busId },
        data: { routeId },
    });
    return updated;
};

export const BusService = {
    createBus,
    getBuses,
    updateBusRoute,
    updateBus,
};

export default BusService;
