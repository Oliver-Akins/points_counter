//
// lead.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/09/17)
//

import * as config from "../../config.json";
import { LOAD } from "../../utils/db";


var toggle = false,
    last_ran = null;


export function LEAD_COMMAND (): string|void  {

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


    let leader: [string, number] = ["Absolutely nobody", 0];
    let data: select[] = LOAD();
    let position = "is in the lead";


    // Prevent Twitch from removing messages due to being a duplicate
    let buffer = "";
    if (toggle) { buffer = "!"; toggle = false; } else { toggle = true; };


    // Compare all the IGPs to find the one with the greatest value
    for (var option of data) {

        // Directly greater
        if (option.total > leader[1]) {
            leader[0] = option.proper_alias;
            leader[1] = option.total;
            position = "is in the lead";
        }

        // Tie for first
        else if (option.total === leader[1] && leader[1] !== 0) {
            leader[0] += ` & ${option.proper_alias}`;
            position = "are tied for first";
        }
    };


    return `${leader[0]} ${position} with ${leader[1]} bits${buffer}!`;
};