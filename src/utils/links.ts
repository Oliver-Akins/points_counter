//
// links.ts
//
// Written by: Tyler Akins (2019/12/13 - 2020/01/04)
//


import { readFileSync, writeFileSync } from "fs";
import { LOAD_CONFIG } from "./Config";
import { resolve } from "path";


let config = LOAD_CONFIG();


export const LOAD_LINKS = (test?: boolean): {[key: string]: string} => {

    let links = readFileSync(
        resolve(`${config.DATA_DIR}/${test ? "#test_links#" : "#links#"}.json`)
    );

    // @ts-ignore
    return JSON.parse(links)
};



export const UPDATE_LINKS = (data: {[key: string]: string}, test?: boolean): void => {
    writeFileSync(
        resolve(`${config.DATA_DIR}/${test ? "#test_links#" : "#links#"}.json`),
        JSON.stringify(data)
    );
};