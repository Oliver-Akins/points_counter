//
// db.js
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/09/17)
//

import { writeFile, readFileSync } from "fs"
import { FILENAME } from "./config.js"
import { UNLOCK_BOT } from "./chat.js"



export function load () {
    let data = readFileSync(FILENAME);
    return JSON.parse(data);
}


export function save (data) {
    writeFile(FILENAME, JSON.stringify(data, null, 2), UNLOCK_BOT)
}