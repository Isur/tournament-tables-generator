import express, { Express } from "express";
import { LoggingMiddleware } from "./Middlewares";
import { getMetadataArgsStorage, useExpressServer } from "routing-controllers";
import { routingControllersToSpec } from "routing-controllers-openapi";
import swaggerUi from "swagger-ui-express";
import { Service } from "typedi";
import { TournamentController } from "./Controllers";
import { ContainerSetup } from "./Utils/DatabaseContainer";
import Logger from "./Utils/Logger";
import cors from "cors";

@Service()
class App {
    public express: Express;
    
    constructor() {
        Logger.Log("Web App Initialization");
        this.express = express();
        this.init();
        this.initRoutes();
        this.initSwagger();
        Logger.Log("Web App Initialized");
    }

    private init = () => {
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: true }));
        this.express.use(cors());
        ContainerSetup();
    }

    private initRoutes = () => {
        useExpressServer(this.express, {
            controllers: [TournamentController],
            middlewares: [LoggingMiddleware],
            routePrefix: "/api/v1",
        })
    }

    private initSwagger = () => {
        const storage = getMetadataArgsStorage();
        const spec = routingControllersToSpec(storage);
        this.express.use("/api/swagger", swaggerUi.serve);
        this.express.get("/api/swagger", swaggerUi.setup(spec));
    }
}

export default App;