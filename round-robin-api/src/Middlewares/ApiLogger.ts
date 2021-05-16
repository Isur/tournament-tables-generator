import express from "express";
import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import { Service } from "typedi";
import Logger from "../Utils/Logger";

@Service()
@Middleware({ type: 'before' })
export class LoggingMiddleware implements ExpressMiddlewareInterface {
    use(req: express.Request, res: express.Response, next: express.NextFunction) {
        Logger.Log(`${req.method}:${req.path}`);
        Logger.Log({ body: req.body });
        next();
    }
}