//
// ping.js
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/09/17)
//

import * as config from "../../config.json";


var toggle = false,
    last_ran = null;


export function PING_COMMAND(client: any, target: string) {

    if (!config.bot.GLOBAL_CMD_COOLDOWN) {
        if (last_ran != null) {
            if (Date.now() - last_ran < config.bot.CMD_COOLDOWN * 1000) {
                return;
            };
        };
        last_ran = Date.now();
    };


    let buffer = "";
    if (toggle) { buffer = "!"; toggle = false; } else { toggle = true; }

    client.say(target, `pong${buffer}!`);
};