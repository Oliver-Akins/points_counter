//
// all.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/10/30)
//

import * as config from "../../config.json";
import { LOAD } from "../../utils/db";


var toggle = false,
    last_ran = null;


export function ALL_COMMAND(): string|void {

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

    // Ensure services don't delete our message due to direct duplication
    if (toggle) { buffer = " "; toggle = false; } else { toggle = true; }


    let data: select[] = LOAD();
    let response = `Characters with points${buffer}: `;
    let chars_w_points: string[] = [];

    // Iterate through each character
    for (var option of data) {

        if (option.total !== 0) {
            chars_w_points.push(`${option.proper_alias} (${option.total} points)`)
        };
    };

    response += chars_w_points.join(", ");
    return response;
}