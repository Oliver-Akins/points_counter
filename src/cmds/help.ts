//
// help.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/09/17)
//


import * as config from "../config.json";


var toggle = false,
    last_ran = null;


export function HELP_COMMAND (client: any, target: string) {

    if (!config.bot.GLOBAL_CMD_COOLDOWN) {
        if (last_ran != null) {
            if (Date.now() - last_ran < config.bot.CMD_COOLDOWN * 1000) {
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