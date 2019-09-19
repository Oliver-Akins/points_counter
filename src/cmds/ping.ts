//
// ping.js
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/09/17)
//


var toggle = false;

export function PING_COMMAND(client: any, target: string) {
    
    let buffer = "";

    if (toggle) { buffer = "!"; toggle = false; } else { toggle = true; }

    client.say(target, `pong${buffer}!`);
};