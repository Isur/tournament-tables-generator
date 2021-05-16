import { useContainer as rcUseContainer } from "routing-controllers";
import { createConnection, useContainer as toUseContainer } from "typeorm";
import { Container } from "typeorm-typedi-extensions";

export const ContainerSetup = () => {
    rcUseContainer(Container);
    toUseContainer(Container);
    createConnection().then(con => {
        console.log('Connected to the database');
    }).catch(err => {
        console.log('Connection failed');
        console.log(err);
    });
}
