//
// links.ts
//
// Written by: Tyler Akins (2019/12/13 - 2020/01/10)
//


import { TEST_LINKS, LINK_FILE } from "../constants";
import { readFileSync, writeFileSync } from "fs";
import { LOAD_CONFIG } from "./Config";
import { resolve } from "path";


let config = LOAD_CONFIG();


export const LOAD_LINKS = (test?: boolean): {[key: string]: string} => {

    let links = readFileSync(
        resolve(`${config.DATA_DIR}/${test ? TEST_LINKS : LINK_FILE}.json`)
    );

    // @ts-ignore
    return JSON.parse(links)
};



export const UPDATE_LINKS = (data: {[key: string]: string}, test?: boolean): void => {
    writeFileSync(
        resolve(`${config.DATA_DIR}/${test ? TEST_LINKS : LINK_FILE}.json`),
        JSON.stringify(data)
    );
};