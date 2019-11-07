//
// cmd_handler.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/11/06 - 2019/11/06)
//


/* Imports */
import { Command } from "./utils/Command";


var commands: Command[] = [];


export const REGISTER_COMMAND = (metadata: cmdMetadata): boolean => {

    // Ensure command get's added correctly
    try {
        commands.push(new Command(metadata));
        return true
    } catch (error) {
        return false
    }
};



export const HANDLE_MESSAGE = (message: string): boolean => {
    return true
}