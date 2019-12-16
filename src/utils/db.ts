//
// db.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/11/11 - 2019/12/15)
//


import { LOAD_CONFIG } from "./Config";
import * as path from "path";
import * as fs from "fs";

const config = LOAD_CONFIG();



export const LOAD = (channel: string): option[] => {

    let filepath: string = path.resolve(`${config.DATA_DIR}/${channel}.json`);

    // Ensure file exists
    if (!fs.existsSync(filepath)) {
        return [];
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
    fs.writeFileSync(
        filepath,
        JSON.stringify(data, null, 2)
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



export const DELETE = (channel: string): "ERROR"|"DELETED"|"NOT_EXIST" => {
    let filepath = path.resolve(`${config.DATA_DIR}`) + `/${channel}.json`;

    // Ensure file doesn't already exist
    if (!fs.existsSync(filepath)) {
        return "NOT_EXIST";
    };

    // Attempt to delete the file
    try {
        fs.unlinkSync(filepath);
        return "DELETED";
    } catch {
        return "ERROR";
    };
};