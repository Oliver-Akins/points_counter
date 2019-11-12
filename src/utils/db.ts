//
// db.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/11/11)
//


import * as fs from "fs";
import { LOAD_CONFIG } from "./Config";


export const LOAD = (channel: string): option[] => {
    // TODO: Write loading code
    // NOTE: Should also check the the links.json file for if the channel is linked to a different file
};



export const WRITE = (channel: string, data: option[]) => {
    // TODO: Write writing code
    // NOTE: should also check links.json to ensure we write the right file
};



export const CREATE = (channel: string): boolean => {
    let config = LOAD_CONFIG()

    // Ensure file doesn't already exist
    if (!fs.existsSync(`../${config.DATA_DIR}/${channel}.json`)) {
        console.log()
    };

    // TODO: Figure out how to create a file
};



export const DELETE = (channel: string): boolean => {
    // TODO: Figure out how to delete a file
};