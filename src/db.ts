//
// db.js
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/09/17)
//

import { writeFile, readFileSync } from "fs"
import { DB_ROUTE } from "./config";
import { UNLOCK_BOT } from "./main";



export function load () {
    let data = readFileSync(DB_ROUTE);
    // @ts-ignore
    return JSON.parse(data);
}


export function save (data) {
    writeFile(DB_ROUTE, JSON.stringify(data, null, 2), UNLOCK_BOT)
}