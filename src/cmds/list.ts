//
// list.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/09/17)
//

import * as config from "../config.json";


const dates = [
    "Abigail", "Haley", "Leah", "Maru", "Penny", "Emily",
    "Alex", "Elliot", "Harvey", "Sam", "Sebastian", "Shane"
];

var toggle = false,
    last_ran = null;


export function LIST_COMMAND (client: any, target: string) {

    if (!config.bot.GLOBAL_CMD_COOLDOWN) {
        if (last_ran != null) {
            if (Date.now() - last_ran < config.bot.CMD_COOLDOWN * 1000) {
                return;
            };
        };
        last_ran = Date.now();
    };


    let buffer = "";
    if (toggle) { buffer = " "; toggle = false; } else { toggle = true; }


    client.say(
        target,
        `You can vote for any of the following people in-game for Spring to marry${buffer}: ${dates.join(', ')}`
    );
};