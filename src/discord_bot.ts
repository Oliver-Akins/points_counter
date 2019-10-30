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
import { PUSH } from "./webhook";

const Eris = require("eris");


var bot = new Eris(config.discord.OAUTH_TOKEN);


bot.on("ready", () => {
    console.log("Ready!");
});


// Message handler
bot.on("messageCreate", (msg: any) => {
    try {

        // SECTION: Message parsing
        let args = msg.content.split(" ");
        let cmd = args[0];
        args.splice(0, 1);
        // !SECTION: Message parsing


        // SECTION: Exit conditions

        // NOTE: Ensure not a system message
        if (msg.type !== 0) { return; }

        // NOTE: Ensure channel type is GUILD_TEXT
        else if (msg.channel.type !== 0) { return; }

        // NOTE: Ensure prefixed
        else if (cmd.slice(0, config.bot.PREFIX.length) !== config.bot.PREFIX) { return; }

        // !SECTION: Exit conditions


        // SECTION: Context parsing
        var is_mod: boolean = msg.member.roles.filter((value: string) => config.discord.MOD_ROLES.includes(value)).length >= 1;
        var datetime = new Date();
        var date = `${datetime.getFullYear()}-${datetime.getMonth()}-${datetime.getDate()}`;
        var log_message = `* [${date}][c:${msg.channel.name}][m:${is_mod}][u:${msg.author.username}][s:Discord] - Running command: ${cmd}`;
        // !SECTION: Context parsing


        // NOTE: Removing prefix from the command name
        cmd = cmd.slice(config.bot.PREFIX.length, cmd.length);

        let response: string | void = COMMAND_HANDLER(cmd, args, is_mod);

        // NOTE: Ensure response isn't null
        if (response !== null) {

            // NOTE: Reply with string
            bot.createMessage(msg.channel.id, response)
            console.log(log_message);
            PUSH({"content": `\`${log_message}\``});
        };

    }

    // SECTION: Error Handling
    catch (error) {
        PUSH({
            "embeds": [
                {
                    "title": `${error.name} @ ${error.fileName} ${error.lineNumber}`,
                    "color": 13238272,
                    "description": `**Error Message:**\n\`\`\`\n${error.message}\n\`\`\``,
                    "fields": [
                        {
                            "name": "**Message Context:**",
                            "value": `\`\`\`\n${JSON.stringify(msg, null, 2)}\n\`\`\``
                        },
                        {
                            "name": "**Message Content:**",
                            "value": `\`\`\`\n${msg.content}\`\`\``
                        },
                        {
                            "name": "**Is Mod:**",
                            "value": `\`${is_mod}\``,
                            "inline": true
                        },
                        {
                            "name": "**Channel:**",
                            "value": `\`${msg.channel.name}\``,
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