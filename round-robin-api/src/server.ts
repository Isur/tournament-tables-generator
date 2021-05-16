import http from "http";
import "reflect-metadata";
import chalk from "chalk";
import Container from "typedi";
import dotenv from "dotenv";
import App from "./App";
import { Config } from "./Config";
import Logger from "./Utils/Logger";

dotenv.config();

const app = Container.get<App>(App);
const server = http.createServer(app.express);
const config = Container.get<Config>(Config);

server.listen(config.port, () => {
    Logger.Log(`Listening on port ${chalk.red(`${config.port}`)}`);
});

process.on("unhandledRejection", (reason: string, promise: Promise<unknown>) => {
    Logger.Error("unhandledRejection");
    Logger.Error(reason);
  });
  
process.on("uncaughtException", (error: Error) => {
  Logger.Error("uncaughtException");
  Logger.Error(error);
});