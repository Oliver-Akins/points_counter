//
// lead.js
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/09/17)
//

import * as Math from "mathjs";
import { LOAD } from "../db";
import {
    GLOBAL_CMD_COOLDOWN,
    CMD_COOLDOWN
} from "../config";


var toggle = false,
    last_ran = null;


export function LEAD_COMMAND (client: any, target: string) {

    if (!GLOBAL_CMD_COOLDOWN) {
        if (last_ran != null) {
            if (Date.now() - last_ran < CMD_COOLDOWN * 1000) {
                return;
            };
        };
        last_ran = Date.now();
    };


    let leader = ["Absolutely nobody", 0];
    let buffer = "";
    let data = LOAD();


    // Prevent Twitch from removing messages due to being a duplicate
    if (toggle) { buffer = "!"; toggle = false; } else { toggle = true; };


    // Compare all the IGPs to find the one with the greatest value
    for (var IGP of data) {
        let total_points = Math.sum(Object.values(IGP.points));

        if (total_points > leader[1]) {
            leader[0] = IGP.full_name;
            leader[1] = total_points;
        }
    };


    client.say(
        target,
        `${leader[0]} is in the lead with ${leader[1]} bits${buffer}!`
    );
};