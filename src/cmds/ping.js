//
// ping.js
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/09/17)
//

export function PING_COMMAND(client, target) {
    
    let buffer = "", toggle = false;

    if (toggle) { buffer = "!"; toggle = false; } else { toggle = true; }

    client.say(target, `pong${_buffer}!`);
};