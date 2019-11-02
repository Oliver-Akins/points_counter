//
// list.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/09/17)
//

import * as config from "../../config.json";
import { LOAD } from "../../utils/db.js";



var toggle = false,
    last_ran = null;


export function LIST_COMMAND (): string|void {

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


    // Prevent Twitch from removing messages due to being a duplicate
    let buffer = "";
    if (toggle) { buffer = " "; toggle = false; } else { toggle = true; };


    let options: string[] = [];
    let data: select[] = LOAD();

    // Get every
    for (var option of data) {
        options.push(option.proper_alias);
    };

    return `You can vote for any of the following people in-game for Spring to marry${buffer}: ${options.join(', ')}`;
};