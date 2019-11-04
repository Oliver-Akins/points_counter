//
// chat.js
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/10/29)
//

// Importing bot modules
/* Misc */
import { COMMAND_HANDLER } from "./cmd_handler";
import * as config from "./config.json";
import { PUSH } from "./utils/webhook";

const Eris = require("eris");


var bot = new Eris(config.discord.OAUTH_TOKEN);


bot.on("ready", () => {
    console.log(`* Connected to Discord gateways`);
    PUSH({"content": `\`* Connected to Discord gateways\``});
});


// Message handler
bot.on("messageCreate", (msg: any) => {
    try {

        // Ensure message to parse
        if (msg.content.length === 0) { return; };


        // SECTION: Message parsing
        let args = msg.content.trim().split(" ");
        let cmd = args[0].toLowerCase();
        args.splice(0, 1);
        // !SECTION: Message parsing


        // SECTION: Exit conditions

        // NOTE: Ensure not a system message
        if (msg.type !== 0) { return; }

        // NOTE: Ensure channel type is GUILD_TEXT
        else if (msg.channel.type !== 0) { return; }

        // NOTE: Ensure not a bot
        else if (msg.member.bot) { return; }

        // NOTE: Ensure prefixed
        else if (cmd.slice(0, config.bot.PREFIX.length) !== config.bot.PREFIX) { return; }

        // !SECTION: Exit conditions


        // NOTE: Removing prefix from the command name
        cmd = cmd.slice(config.bot.PREFIX.length, cmd.length);


        var is_mod = msg.member.roles.filter((value: string) => config.discord.MOD_ROLES.includes(value)).length >= 1;
        var is_admin = config.discord.ADMIN.includes(msg.member.id);


        var response: string | void = COMMAND_HANDLER(
            cmd,
            args,
            {
                "is_mod": is_mod,
                "is_admin": is_admin,
                "channel": msg.channel.name,
                "username": msg.author.username,
                "platform": "Discord"
            }
        );

        // NOTE: Ensure response isn't null
        if (response !== null) {

            // NOTE: Reply with string
            bot.createMessage(msg.channel.id, response)
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
                            "value": `\`\`\`\n${JSON.stringify(msg, null, 2)}\n\`\`\``
                        },
                        {
                            "name": "**Message Content:**",
                            "value": `\`\`\`json\n${msg.content}\`\`\``
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
                            "value": `\`${msg.channel.name}\``,
                            "inline": true
                        },
                        {
                            "name": "Source",
                            "value": "Discord",
                            "inline": true
                        }
                    ]
                }
            ]
        });
    };
    // !SECTION: Error Handling
});

bot.connect();