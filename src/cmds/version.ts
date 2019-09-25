//
// version.js
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/09/24)
//


import {
    GLOBAL_CMD_COOLDOWN,
    CMD_COOLDOWN,
    BOT_VERSION
} from "../config";


var toggle = false,
    last_ran = null;


export function VERSION_COMMAND (client: any, target: string) {

    if (!GLOBAL_CMD_COOLDOWN) {
        if (last_ran != null) {
            if (Date.now() - last_ran < CMD_COOLDOWN * 1000) {
                return;
            };
        };
        last_ran = Date.now();
    };


    let buffer: string = "";
    if (toggle) { buffer = " "; toggle = false; } else { toggle = true; }

    client.say(target, `Bot Version${buffer}: ${BOT_VERSION}`)
};