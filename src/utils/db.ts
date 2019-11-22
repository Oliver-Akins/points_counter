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

    let filepath: string = path.resolve(`${config.DATA_DIR}/${channel}.json`);

    // Ensure file exists
    if (!fs.existsSync(filepath)) {
        return null;
    };

    // @ts-ignore
    return JSON.parse(fs.readFileSync(filepath))
};



export const WRITE = (channel: string, data: option[]) => {

    // Load the links file
    let links = fs.readFileSync(
        path.resolve(`${config.DATA_DIR}/#links#.json`)
    );

    // Check if the channel is linked to a different channel.
    if (links[channel] != null) {
        channel = links[channel];
    };

    let filepath = path.resolve(`${config.DATA_DIR}/${channel}.json`)

    // load the appropriate file
    fs.writeFile(
        filepath,
        JSON.stringify(data, null, 2),
        () => {console.log("* [DB] Data updated")}
    );
};



export const CREATE = (channel: string): "SUCCESS"|"ERROR"|"EXISTS" => {
    let filepath = path.resolve(config.DATA_DIR) + `/${channel}.json`;

    // Ensure file doesn't already exist
    if (fs.existsSync(filepath)) {
        return "EXISTS";
    };

    // Attempt to create the file
    try {
        fs.writeFileSync(filepath, "[]");
        return "SUCCESS";
    } catch {
        return "ERROR";
    };
};



export const DELETE = (channel: string): boolean => {
    let filepath = path.resolve(`${config.DATA_DIR}`) + `/${channel}.json`;

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