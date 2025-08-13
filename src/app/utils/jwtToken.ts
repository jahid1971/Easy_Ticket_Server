import * as jwt from "jsonwebtoken";
import AppError from "../errors/AppError";
import { UserRole } from "@prisma/client";

export type TJwtPayload = {
    id?: string;
    userId?: string;
    email?: string;
    role?: UserRole;
    iat?: number;
};

const createToken = (
    jwtPayload: TJwtPayload,
    secret: string,
    expireTime: string
) => {
    const options: jwt.SignOptions = {
        algorithm: "HS256",
        expiresIn: expireTime as jwt.SignOptions["expiresIn"],
    };

    return jwt.sign(jwtPayload, secret as jwt.Secret, options);
};

const verifyToken = (
    token: string,
    secret: string,
    tokenType = "Token"
): TJwtPayload => {
    let decoded;
    try {
        decoded = jwt.verify(token, secret as string);
    } catch (error: any) {
        console.log(
            error,
            `error in jwtVerifyToken....................: ${error?.name}`,
            error?.message
        );

        if (error.name === "TokenExpiredError") {
            throw new AppError(401, `${tokenType} has expired!!`, error);
        }
        throw new AppError(401, "Invalid token !", error);
    }
    return decoded as TJwtPayload;
};

export const jwtToken = {
    createToken,
    verifyToken,
};
