//
// remove.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/09/17)
//

import * as config from "../../config.json";
import { SAVE, LOAD } from "../../utils/db";


var toggle = false,
    last_ran = null;


export function REMOVE_COMMAND (args: string[]): string|void  {


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


    let response: string|void = null;
    let data: select[] = LOAD();
    let buffer: string = "";


    // Ensure Twitch doesn't delete our message due to duplication
    if (toggle) { buffer = " "; toggle = false; } else { toggle = true; };


    // Check argument count
    if (args.length < 2) {
        return `Error${buffer}: Not enough arguments.`;
    };


    // Parse arguments
    let points: number = parseInt(args[0]);
    let donator: string = "%anonymous%";
    let target: string = args[1];

    // Optional arguments
    if (args.length >= 3) { donator = args[2]; };


    // Find right character
    for (var option of data) {

        // Ensure option exists
        if (option.aliases.includes(target)) {

            option.total -= points;

            // Check if user has data on character
            if (Object.keys(option.points).indexOf(donator) != -1) {

                // Make sure we don't go into the negatives
                if (option.points[donator] - points < 0) {
                    option.points[donator] = 0;
                    response = `${donator} has removed ${points} from ${option.proper_alias}${buffer}.`;
                }
                else {
                    option.points[donator] -= points;
                    response = `${donator} has removed ${points} from ${option.proper_alias}${buffer}.`;
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