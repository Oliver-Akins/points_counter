//
// chat.js
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/09/17)
//


import * as tmi from "tmi.js"

// Importing all the commands
import { REMOVE_COMMAND } from "./cmds/remove";
import { PING_COMMAND } from "./cmds/ping";
import { HELP_COMMAND } from "./cmds/help";
import { LEAD_COMMAND } from "./cmds/lead";
import { LIST_COMMAND } from "./cmds/list";
import { TOP3_COMMAND } from "./cmds/top";
import { ADD_COMMAND } from "./cmds/add";
import {
    BOT_PREFIX as prefix,
    OAUTH_TOKEN,
    USERNAME,
    CHANNELS
} from "./config"


// Define configuration options
const opts = {
    identity: {
        username: USERNAME,
        password: OAUTH_TOKEN
    },
    channels: CHANNELS
};



// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();


var bot_locked = false


export function UNLOCK_BOT() {
    bot_locked = false;
}


// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {

    let cmd = msg.trim().toLowerCase();


    if (self) { return; } // Ignore messages from the bot
    else if (bot_locked) { return; }
    else if (cmd.slice(0, prefix.length) !== prefix) { return; } // Ensure prefix start


    // Parse message accordingly
    let args = cmd.slice(1).split(" ")
    cmd = args[0]
    args.splice(0, 1)


    let is_mod = context.mod || context.badges.broadcaster == 1
    let log_message = `* [${target}][mod:${is_mod}] Running command: ${cmd}`


    // USER COMMANDS:
    if      (cmd === "list") { LIST_COMMAND(client, target); console.log(log_message); }
    else if (cmd === "ping") { PING_COMMAND(client, target); console.log(log_message); }
    else if (cmd === "help") { HELP_COMMAND(client, target); console.log(log_message); }
    else if (cmd === "lead") { LEAD_COMMAND(client, target); console.log(log_message); }
    else if (cmd === "top")  { TOP3_COMMAND(client, target); console.log(log_message); }

    // MODERATOR COMMANDS:
    else if (is_mod) {
        if (cmd === "add") {
            bot_locked = true;
            ADD_COMMAND(client, target, args );
            console.log(log_message); }
        else if (cmd === "remove") {
            bot_locked = true;
            REMOVE_COMMAND(client, target, args);
            console.log(log_message);
        };
    };
};



// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}