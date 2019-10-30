//
// remove.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/09/17)
//

import * as config from "../config.json";
import { SAVE, LOAD } from "../db";


var toggle = false,
    last_ran = null;


export function REMOVE_COMMAND (args: string[]): string|void  {


    if (!config.bot.GLOBAL_CMD_COOLDOWN) {
        if (last_ran != null) {
            if (Date.now() - last_ran < config.bot.CMD_COOLDOWN * 1000) {
                return null;
            };
        };
        last_ran = Date.now();
    };


    let buffer = "";
    let data = LOAD();
    let response: string|void = null;


    // Ensure Twitch doesn't delete our message due to duplication
    if (toggle) { buffer = " "; toggle = false; } else { toggle = true; }


    // Check argument count
    if (args.length < 2) {
        return `Error${buffer}: Not enough arguments.`;
    };


    // Parse arguments
    let points: number = parseInt(args[0]);
    // @ts-ignore
    let date_target: string = args[1];
    let donator: string = "%anonymous%";
    // @ts-ignore
    if (args.length >= 3) { donator = args[2]; };


    // Find right character
    for (var IGP of data) {

        if (IGP.names.includes(date_target)) {


            // Check if user has data on character
            if (Object.keys(IGP.points).indexOf(donator) != -1) {

                // Make sure we don't go into the negatives
                if (IGP.points[donator] - points < 0) {
                    IGP.points[donator] = 0
                    response = `${donator} has removed ${points} from ${IGP.full_name}${buffer}.`;
                }
                else {
                    IGP.points[donator] -= points
                    response = `${donator} has removed ${points} from ${IGP.full_name}${buffer}.`;
                };
            }

            // User wasn't found; error
            else {
                response = `Error${buffer}: That user doesn't have any points on that IGP.`;
            };
        };
    };

    SAVE(data);
    return response;
}