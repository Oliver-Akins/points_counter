//
// add.js
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/09/17)
//

import { SAVE, LOAD } from "../db";
import * as config from "../../config.json";


var toggle = false,
    last_ran = null;


export function ADD_COMMAND (client: any, target: string, args: string[]) {


    if (!config.bot.GLOBAL_CMD_COOLDOWN) {
        if (last_ran != null) {
            if (Date.now() - last_ran < config.bot.CMD_COOLDOWN * 1000) {
                return;
            };
        };
        last_ran = Date.now();
    };


    let buffer = "";
    let data = LOAD();

    // Ensure Twitch doesn't delete our message due to duplication
    if (toggle) { buffer = " "; toggle = false; } else { toggle = true; }


    // Check argument count
    if (args.length < 2) {
        client.say(target, `Error${buffer}: Not enough arguments.`)
        return;
    };


    // Parse arguments
    let points: number = parseInt(args[0]);
    // @ts-ignore
    let date_target: string = args[1];
    let donator: string = "%anonymous%";
    // @ts-ignore
    if (args.length >= 3) { donator = args[2]; };


    // Find the target date
    for (var IGP of data) {


        if (IGP.names.includes(date_target)) {


            // Check if we can increment or set
            if (Object.keys(IGP.points).indexOf(donator) != -1) {
                IGP.points[donator] += points
            } else {
                IGP.points[donator] = points
            };


            client.say(
                target,
                `${donator} has added ${points} to ${IGP.full_name}${buffer}.`
            );
            break;
        };
    };

    SAVE(data);
}