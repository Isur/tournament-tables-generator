import { ConnectionOptions } from "typeorm";
const config: ConnectionOptions = {
    name: "default",
    type: "postgres",
    database: process.env.DATABASE_NAME || "chess",
    host: process.env.DATABASE_HOST || "localhost",
    password: process.env.DATABASE_PASSWORD || "chess",
    username: process.env.DATABASE_USER || "chess",
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    entities: [
        "src/Entities/*.entity.ts",
    ],
    migrations: ["src/Migrations/*.ts"],
    cli: {
        migrationsDir: "src/Migrations"
    },
    logging: true,
    synchronize: false
}

export = config;