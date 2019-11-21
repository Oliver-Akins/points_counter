//
// db.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/11/11 - 2019/11/20)
//


import { LOAD_CONFIG } from "./Config";
import * as path from "path";
import * as fs from "fs";

const config = LOAD_CONFIG();



export const LOAD = (channel: string): option[] => {

    // Load the links file
    let links: object = fs.readFileSync(
        path.resolve(`${config.DATA_DIR}/#links#.json`)
    );

    // Check if the channel is linked to a different channel.
    if (links[channel]) {
        channel = links[channel]
};


    // load the appropriate file
    let data = fs.readFileSync(
        path.resolve(`${config.DATA_DIR}/${channel}.json`)
    );

    // @ts-ignore
    return JSON.parse(data)
};



export const WRITE = (channel: string, data: option[]) => {

    // Load the links file
    let links: object = fs.readFileSync(
        path.resolve(`${config.DATA_DIR}/#links#.json`)
    );

    // Check if the channel is linked to a different channel.
    if (links[channel]) {
        channel = links[channel]
    };


    // load the appropriate file
    fs.writeFile(
        path.resolve(`${config.DATA_DIR}/${channel}.json`),
        JSON.stringify(data, null, 2),
        () => {console.log(`[DB] Data updated for channel: ${channel}`)}
    );

    // @ts-ignore
    return JSON.parse(data)
};



export const CREATE = (channel: string): boolean => {
    let filepath = path.resolve(`../${config.DATA_DIR}`) + `/${channel}.json`;

    // Ensure file doesn't already exist
    if (fs.existsSync(filepath)) {
        return false;
    };

    // Attempt to create the file
    fs.writeFileSync(filepath, "[]");
    try {
        return true;
    } catch {
        return false;
    };
};



export const DELETE = (channel: string): boolean => {
    let filepath = path.resolve(`../${config.DATA_DIR}`) + `/${channel}.json`;

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