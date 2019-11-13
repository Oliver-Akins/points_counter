//
// db.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/11/11)
//


import * as fs from "fs";
import { LOAD_CONFIG } from "./Config";

const config = LOAD_CONFIG();
const template_path = `../${config.DATA_DIR}/%data_template%.json`



export const LOAD = (channel: string): option[] => {
    // TODO: Write loading code
    // NOTE: Should also check the the links.json file for if the channel is linked to a different file
};



export const WRITE = (channel: string, data: option[]) => {
    // TODO: Write writing code
    // NOTE: should also check links.json to ensure we write the right file
};



export const CREATE = (channel: string): boolean => {
    let filepath =`../${config.DATA_DIR}/${channel}.json`

    // Ensure file doesn't already exist
    if (fs.existsSync(filepath)) {
        return false;
    };

    // Attempt to create the file
    try {
        fs.writeFileSync(filepath, "[]", "w");
        return true;
    } catch {
        return false;
    };
};



export const DELETE = (channel: string): boolean => {
    let filepath =`../${config.DATA_DIR}/${channel}.json`

    // Ensure file doesn't already exist
    if (!fs.existsSync(filepath)) {
        return false;
    };

    // Attempt to delete the file
    try {
        fs.unlinkSync(filepath);
        return true;
    } catch {
        return false;
    };
};