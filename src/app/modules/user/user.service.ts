import bcrypt from "bcryptjs";
import AppError from "../../errors/AppError";
import { prisma } from "../../services/prisma.service";
import { UserRole } from "@prisma/client";

const registerUser = async (data: {
    name: string;
    email?: string;
    phone?: string;
    password: string;
    role?: string;
}) => {
    const { name, email, phone, password, role = "user" } = data;

    if (!email && !phone) {
        throw new AppError(400, "Either email or phone is required");
    }


    const orConditions = [];
    if (email) orConditions.push({ email });

    if (phone) orConditions.push({ phone });

    const existingUser = await prisma.user.findFirst({
        where: {
            OR: orConditions,
        },
    });

    if (existingUser?.email && existingUser.email === email) {
        throw new AppError(400, "Email already registered");
    }
    
    if (existingUser?.phone && existingUser.phone === phone) {
        throw new AppError(400, "Phone already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name,
            email: email || "",
            phone: phone || "",
            password: hashedPassword,
            role: (role?.toUpperCase() as unknown as UserRole) || UserRole.USER,
        },
    });

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
    };
}

export const userService = {
    registerUser,
};
