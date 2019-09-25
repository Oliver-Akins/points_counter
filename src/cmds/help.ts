//
// help.js
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


export function HELP_COMMAND (client: any, target: string) {

    if (!GLOBAL_CMD_COOLDOWN) {
        if (last_ran != null) {
            if (Date.now() - last_ran < CMD_COOLDOWN * 1000) {
                return;
            };
        };
        last_ran = Date.now();
    };


    // Ensure messages don't get deleted by Twitch
    var buffer = "";
    if (toggle) { buffer = "/"; toggle = false; } else { toggle = true; };


    client.say(
        target,
        `You can find a list of commands here: https://tyler.akins.me/twitch_bit_counter${buffer}`
    );
};