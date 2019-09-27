//
// db.js
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/09/17)
//

import { writeFile, readFileSync } from "fs";


const DB_ROUTE = require.resolve("../data/data.json");


export function LOAD () {
    let data = readFileSync(DB_ROUTE);
    // @ts-ignore
    return JSON.parse(data);
}


export function SAVE (data: any) {
    writeFile(DB_ROUTE, JSON.stringify(data, null, 2), () => {console.log("* [DB] Data updated")})
}