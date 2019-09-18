//
// chat.js
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/09/17)
//


const tmi = require('tmi.js')

// Importing all the commands
import {REMOVE_COMMAND} from "./cmds/remove.js"
import {PING_COMMAND} from "./cmds/ping.js"
import {HELP_COMMAND} from "./cmds/help.js"
import {LEAD_COMMAND} from "./cmds/lead.js"
import {ADD_COMMAND} from "./cmds/add.js"
import {
    OAUTH_TOKEN,
    USERNAME,
    CHANNELS,
    BOT_PREFIX as prefix
} from "./config.js"


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


function UNLOCK_BOT() {
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


    // USER COMMANDS:
    if      (cmd === "list") { LIST_COMMAND(client, target); }
    else if (cmd === "ping") { PING_COMMAND(client, target); }
    else if (cmd === "help") { HELP_COMMAND(client, target); }
    else if (cmd === "lead") { LEAD_COMMAND(client, target, data); }


    // MODERATOR COMMANDS:
    else if (is_mod) {
        if (cmd === "add") { bot_locked = true; ADD_COMMAND(client, target, ); }
        else if (cmd === "remove") { bot_locked = true; REMOVE_COMMAND(client, target); };
    };
};



// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}
