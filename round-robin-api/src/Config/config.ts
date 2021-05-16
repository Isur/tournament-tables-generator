import { Service } from "typedi";
import { ConnectionOptions } from "typeorm";

@Service()
export class Config {
    public port: number;
    constructor() {
        this.loadFromEnv();
    }

    private loadFromEnv() {
        this.port = parseInt(process.env.PORT, 10) || 3000;
    }
}