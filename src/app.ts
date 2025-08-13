

import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./app/routes";
import globalErrorHandler from "./app/middleWares/globalErrorHandler";
import notFound from "./app/middleWares/notFound";
import { createServer } from "http";
import { setupSwagger } from "./app/services/swagger.service";

const app: Application = express();

app.use(
    cors({
        origin: [process.env.CLIENT_BASE_URL as string],
        credentials: true,
    })
);

export const httpServer = createServer(app);

// export const io = new Server(httpServer, {
//     cors: {
//         origin: process.env.CLIENT_URL,
//         methods: ["GET", "POST"],
//     },
// });
// configureSocket();

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup Swagger for API documentation
setupSwagger(app);

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
    res.send("server is running");
});

app.use(notFound);
app.use(globalErrorHandler);
    
export default app;
