//
// ping.js
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/09/17)
//

import {
    GLOBAL_CMD_COOLDOWN,
    CMD_COOLDOWN
} from "../config";


var toggle = false,
    last_ran = null;


export function PING_COMMAND(client: any, target: string) {

    if (!GLOBAL_CMD_COOLDOWN) {
        if (last_ran != null) {
            if (Date.now() - last_ran < CMD_COOLDOWN * 1000) {
                return;
            };
        };
        last_ran = Date.now();
    };


    let buffer = "";
    if (toggle) { buffer = "!"; toggle = false; } else { toggle = true; }

    client.say(target, `pong${buffer}!`);
};