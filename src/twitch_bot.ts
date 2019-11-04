//
// chat.js
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/09/17)
//


import * as tmi from "tmi.js"


// Importing bot modules
/* Misc */
import { COMMAND_HANDLER } from "./cmd_handler";
import * as config from "./config.json";
import { PUSH } from "./utils/webhook";


// Define configuration options
const opts = {
    identity: {
        username: config.twitch.USERNAME,
        password: config.twitch.OAUTH_TOKEN
    },
    channels: config.twitch.CHANNELS
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
        let cmd = msg.trim();


        // SECTION: Exit conditions

        // NOTE: Ignore self
        if (self) { return; } // Ignore messages from the bot


        // NOTE: Ignore non-prefixed
        else if (cmd.slice(0, config.bot.PREFIX.length) !== config.bot.PREFIX) { return; }


        // NOTE: Global command cooldown
        else if (config.bot.GLOBAL_CMD_COOLDOWN) {
            if (last_ran != null) {
                if (Date.now() - last_ran < config.bot.CMD_COOLDOWN * 1000) {
                    return;
                };
            };
            last_ran = Date.now();
        }
        // !SECTION: Exit conditions



        // SECTION: Message parsing
        let args = cmd.slice(config.bot.PREFIX.length).split(" ");
        cmd = args[0].toLowerCase();
        args.splice(0, 1);
        // !SECTION: Message parsing

        var is_mod = context.mod || context.badges.broadcaster == 1
        var is_admin = config.twitch.ADMIN.includes(context.username)


        var response = COMMAND_HANDLER(
            cmd,
            args,
            {
                "channel": target,
                "is_admin": is_admin,
                "is_mod": is_mod,
                "platform": "Twitch",
                "username": context.username
            }
        );

        // NOTE: Ensure response isn't null
        if (response !== null) {
            // NOTE: Reply with string
            client.say(
                target,
                response
            );
        };
    }

    // SECTION: Error Handling
    catch (error) {
        PUSH({
            "embeds": [
                {
                    "title": `${error.name}`,
                    "color": 13238272,
                    "description": `**Error Message:**\n\`\`\`\n${error.message}\n\`\`\``,
                    "fields": [
                        {
                            "name": "**Message Context:**",
                            "value": `\`\`\`json\n${JSON.stringify(context, null, 2)}\n\`\`\``
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
                            "name": "**Is Admin:**",
                            "value": `\`${is_admin}\``,
                            "inline": true
                        },
                        {
                            "name": "**Channel:**",
                            "value": `\`${target}\``,
                            "inline": true
                        },
                        {
                            "name": "Source",
                            "value": "Twitch",
                            "inline": true
                        }
                    ]
                }
            ]
        });
    };
    // !SECTION: Error Handling
};



// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr:string, port:string) {
    console.log(`* Connected to ${addr}:${port}`);
    PUSH({"content": `\`* Connected to ${addr}:${port}\``});
}