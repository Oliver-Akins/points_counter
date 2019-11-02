//
// add.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/09/17)
//

import { SAVE, LOAD } from "../../utils/db";
import * as config from "../../config.json";


var toggle = false,
    last_ran = null;


export const ADD_COMMAND = (args: string[]): string|void => {


    // Command cooldowns
    if (!config.bot.GLOBAL_CMD_COOLDOWN) {

        if (last_ran != null) {

            // Check if command cooldown duration has passed
            if (Date.now() - last_ran < config.bot.CMD_COOLDOWN * 1000) {
                return null;
            };
        };
        last_ran = Date.now();
    };


    let buffer = "";
    let data: select[] = LOAD();
    let response: string|void = null;


    // Ensure services don't delete our message due to direct duplication
    if (toggle) { buffer = " "; toggle = false; } else { toggle = true; }


    // Check argument count
    if (args.length < 2) {
        return `Error${buffer}: Not enough arguments.`;
    };


    // Parse arguments
    let points: number = parseInt(args[0]);
    let target: string = args[1];
    let donator: string = "%anonymous%";

    // Optional arguments
    if (args.length >= 3) { donator = args[2]; };



    // Find the target selection
    for (var option of data) {

        if (option.aliases.includes(target)) {

            option.total += points;

            // Check if we increment or set
            if (Object.keys(option.points).indexOf(donator) != -1) {
                option.points[donator] += points
            } else {
                option.points[donator] = points
            };

            response = `${donator} has added ${points} to ${option.proper_alias}${buffer}.`;
        };
    };

    SAVE(data);
    return response;
}