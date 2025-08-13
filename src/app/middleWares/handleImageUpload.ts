import { NextFunction, Request, Response } from "express";

import multer from "multer";

const storage = multer.memoryStorage();
export const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
    fileFilter: (req, file, cb) => {
        const allowed = ["image/jpeg", "image/png", "image/webp"];
        if (allowed.includes(file.mimetype)) cb(null, true);
        else cb(new Error("Unsupported file type"));
    },
});

export const handleImageUpload = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    //using multer memory storage to create a buffer of the image

    const uploadMiddleware = upload.single("file");

    uploadMiddleware(req, res, (err: any) => {
        if (err) {
            console.log(err, "error in handle image.......");
            return next(err);
        }

        if (typeof req.body.data === "string") {
            try {
                req.body = JSON.parse(req.body.data);
                // req.body.data = JSON.parse(req.body.data);
            } catch (parseError) {
                console.log(parseError, "parseError in handle image.......");
                return next(parseError);
            }
        }

        next();
    });
};
