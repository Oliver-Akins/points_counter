//
// chat.js
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/09/17)
//


import * as requests from "request-promise-native";
import * as tmi from "tmi.js"


// Importing all the commands
import { VERSION_COMMAND } from "./cmds/version";
import { REMOVE_COMMAND } from "./cmds/remove";
import { PING_COMMAND } from "./cmds/ping";
import { HELP_COMMAND } from "./cmds/help";
import { LEAD_COMMAND } from "./cmds/lead";
import { LIST_COMMAND } from "./cmds/list";
import { TOP3_COMMAND } from "./cmds/top";
import { ADD_COMMAND } from "./cmds/add";
import * as config from "../config.json";


// Define configuration options
const opts = {
    identity: {
        username: config.chat.USERNAME,
        password: config.chat.OAUTH_TOKEN
    },
    channels: config.chat.CHANNELS
};


// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();


var last_ran = null;


// Called every time a message comes in
function onMessageHandler (target:any, context:any, msg:string, self:boolean) {

    try {
        let cmd = msg.trim().toLowerCase();


        if (self) { return; } // Ignore messages from the bot

        else if (cmd.slice(0, config.bot.PREFIX.length) !== config.bot.PREFIX) { return; }

        else if (config.bot.GLOBAL_CMD_COOLDOWN) {
            if (last_ran != null) {
                if (Date.now() - last_ran < config.bot.CMD_COOLDOWN * 1000) {
                    return;
                };
            };
            last_ran = Date.now();
        }

        // Parse message accordingly
        let args = cmd.slice(1).split(" ");
        cmd = args[0];
        args.splice(0, 1);


        var is_mod = context.mod || context.badges.broadcaster == 1;
        let log_message = `* [c:${target}][m:${is_mod}][u:${context.username}] - Running command: ${cmd}`;

        // USER COMMANDS:
        if (cmd === "list") {
            LIST_COMMAND(client, target);
            console.log(log_message);
        }

        else if (cmd === "ping") {
            PING_COMMAND(client, target);
            console.log(log_message);
        }

        else if (cmd === "help") {
            HELP_COMMAND(client, target);
            console.log(log_message);
        }

        else if (cmd === "lead") {
            LEAD_COMMAND(client, target);
            console.log(log_message);
        }

        else if (cmd === "top")  {
            TOP3_COMMAND(client, target);
            console.log(log_message);
        }

        else if (cmd === "version") {
            VERSION_COMMAND(client, target);
            console.log(log_message);
        }

        // MODERATOR COMMANDS:
        else if (is_mod) {

            if (cmd === "add") {
                ADD_COMMAND(client, target, args );
                console.log(log_message);
            }

            else if (cmd === "remove") {
                REMOVE_COMMAND(client, target, args);
                console.log(log_message);
            }
        };
    } catch (error) {


        let options = {
            uri: config.ERROR_WEBHOOK,
            body: {
                "embeds": [
                    {
                        "title": `${error.name} @ ${error.fileName} ${error.lineNumber}`,
                        "color": 13238272,
                        "description": `**Error Message:**\n\`\`\`\n${error.message}\n\`\`\``,
                        "fields": [
                            {
                                "name": "**Message Context:**",
                                "value": `\`\`\`\n${JSON.stringify(context, null, 2)}\n\`\`\``
                            },
                            {
                                "name": "**Message Content:**",
                                "value": `\`\`\`\n${msg}\`\`\``
                            },
                            {
                                "name": "**Is Mod:**",
                                "value": `\`${is_mod}\``,
                                "inline": true
                            },
                            {
                                "name": "**Channel:**",
                                "value": `\`${target}\``,
                                "inline": true
                            }
                        ]
                    }
                ]
            },
            json: true
        };


        requests.post(options)
            .catch((error: any) => {
                console.error("OHNO, SHIT REALLY WENT WRONG");
            });
    };
};



// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr:string, port:string) {
    console.log(`* Connected to ${addr}:${port}`);
}