import { z } from "zod";

const loginValidationSchema = z
    .object({
        email: z.string().email("Invalid email address").optional(),
        phone: z.string().regex(/^\+?[0-9]{10,15}$/, "Invalid phone number").optional(),
        password: z.string().min(1, "Password is required"),
    })
    .refine((data) => !!data.email || !!data.phone, {
        message: "Either email or phone is required",
        path: ["email", "phone"],
    });

export const authValidationSchema = {
    loginValidationSchema,
};
