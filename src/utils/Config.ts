//
// Config.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/11/07 - 2019/11/07)
//

import { readFileSync, writeFile } from "fs"



export const LOAD_CONFIG = (): config => {
    let config = require.resolve("../../config.json");

    let data = readFileSync(config);

    // @ts-ignore
    return JSON.parse(data);
};



export const UPDATE_CONFIG = (data: config): void => {
    writeFile(
        require.resolve("../../config.json"),
        JSON.stringify(data, null, 2),
        () => {
            console.log("* [Config] Config written to.");
        }
    )
};