//
// links.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/12/13)
//


import { readFileSync, writeFileSync } from "fs";
import { LOAD_CONFIG } from "./Config";
import { resolve } from "path";


let config = LOAD_CONFIG();


export const LOAD_LINKS = (): {[key: string]: string} => {

    let links = readFileSync(resolve(`${config.DATA_DIR}/#links#.json`));

    // @ts-ignore
    return JSON.parse(links)
};



export const UPDATE_LINKS = (data: {[key: string]: string}): void => {
    writeFileSync(
        resolve(`${config.DATA_DIR}/#links#.json`),
        JSON.stringify(data)
    );
};