//
// help.js
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/09/17)
//

export function HELP_COMMAND (client, target) {
    var buffer = "", toggle = false;
    
    // Ensure messages don't get deleted by Twitch
    if (toggle) { buffer = "/"; toggle = false; } else { toggle = true; };

    client.say(
        target,
        `You can find a list of commands here: https://tyler.akins.me/twitch_bit_counter${buffer}`
    );
};