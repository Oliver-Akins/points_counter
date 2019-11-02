//
// top.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/09/19)
//

import * as config from "../../config.json";
import { LOAD } from "../../utils/db";
import { SORT_SELECT } from "../../utils/points";


var toggle = false,
    last_ran = null;



export function TOP3_COMMAND () {

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


    let data: select[] = LOAD();
    let top_data = SORT_SELECT(data)


    let buffer: string = "";
    if (toggle) { buffer = " "; toggle = false; } else { toggle = true; }


    return `The top 3 characters for Spring are${buffer} --` +
        ` ${top_data[0].proper_alias}: ${top_data[0].total},` +
        ` ${top_data[1].proper_alias}: ${top_data[1].total},` +
        ` ${top_data[2].proper_alias}: ${top_data[2].total}`
};