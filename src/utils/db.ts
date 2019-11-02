//
// db.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/09/17)
//

import { writeFile, readFileSync } from "fs";


const DB_ROUTE = require.resolve("../../data/data.json");


export function LOAD (): select[] {
    let config = require("../config.json");
    let data_route = require.resolve(`../../data/${config.data_file}`);

    let data = readFileSync(data_route);

    // @ts-ignore
    return JSON.parse(data);
}


export function SAVE (data: select[]): void {

    let config = require("../config.json");
    let data_route = require.resolve(`../../data/${config.data_file}`);

    writeFile(data_route, JSON.stringify(data, null, 2), () => {console.log("* [DB] Data updated")})
}


export const UPDATE_CONFIG = (data: config): void => {
    writeFile(
        require.resolve("../config.json"),
        JSON.stringify(data, null, 2),
        () => {
            console.log("* [Config] Config written to.")
        }
    )
};