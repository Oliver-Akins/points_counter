//
// db.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/11/11)
//


import * as fs from "fs";
import { LOAD_CONFIG } from "./Config";


export const LOAD = (channel: string): option[] => {};
export const WRITE = (channel: string, data: option[]) => {};


export const CREATE = (channel: string): boolean => {
    let config = LOAD_CONFIG()

    // Ensure file doesn't already exist
    if (!fs.existsSync(`../${config.data_dir}/${channel}.json`)) {
        console.log()
    }
};



export const DELETE = (channel: string): boolean => {};