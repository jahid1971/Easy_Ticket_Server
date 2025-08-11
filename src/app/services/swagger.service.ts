import { Application } from "express";
import path from "path";
import fs from "fs";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";

export const setupSwagger = (app: Application) => {
    const swaggerCandidates = [
        path.join(__dirname, "..", "..", "docs", "swagger.yaml"),
        path.join(process.cwd(), "EasyTicket_Server", "docs", "swagger.yaml"),
        path.join(process.cwd(), "docs", "swagger.yaml"),
        path.join(__dirname, "..", "docs", "swagger.yaml"),
    ];

    const swaggerPath = swaggerCandidates.find((p) => fs.existsSync(p));
    if (!swaggerPath) {
        // eslint-disable-next-line no-console
        console.warn("Swagger YAML not found. Checked:", swaggerCandidates);
        return;
    }

    let swaggerDocument: any;
    try {
        swaggerDocument = YAML.load(swaggerPath);
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error("Failed to load swagger yaml:", err);
        return;
    }

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    // eslint-disable-next-line no-console
    console.info("Swagger UI mounted at /api-docs (", swaggerPath, ")");
};
