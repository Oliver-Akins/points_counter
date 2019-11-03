//
// data_file.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/10/31)
//


import { UPDATE_CONFIG } from "../../utils/db";


export const DATA_FILE_COMMAND = (new_data_file: string): string => {
    let old_data_file: string;

    let config: config = require("../config.json");

    old_data_file = config.data_file;

    // Ensure difference of files
    if (old_data_file === new_data_file) {
        return "The given database file is the same as the current database file.";
    };

    config.data_file = new_data_file;

    UPDATE_CONFIG(config)
    return `Changed database file from ${old_data_file} to ${new_data_file}.`
};