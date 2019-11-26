//
// discord_handler.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/11/23)
//

import { HANDLE_MESSAGE } from "../cmd_handler";
import { LOAD_CONFIG } from "../utils/Config";
import { DISCORD_MOD } from "../utils/Perms";
import { log_error } from "../utils/webhook";
import { perm } from "../constants";
const Eris = require("eris");


// CHANNEL SYNTAX: Guild_name

export const run_discord = () => {

    const config: config = LOAD_CONFIG();

    var bot = new Eris(config.discord.DEV_TOKEN);


    bot.on("ready", () => {
        console.log(`* Connected to Discord gateways`);
        // TODO: Maybe send connection message to Discord Webhook
    });


    // Message handler
    bot.on("messageCreate", (msg: any) => {
        try {

            // Ensure message to parse
            if (msg.content.length === 0) { return; };


            // SECTION: Exit conditions

            // NOTE: Ensure not a system message
            if (msg.type !== 0) { return; }

            // NOTE: Ensure channel type is GUILD_TEXT
            else if (msg.channel.type !== 0) { return; }

            // NOTE: Ensure not a webhook or Clyde
            else if (msg.author.discriminator === "0000") { return; }

            // NOTE: Ensure not a bot
            else if (msg.member.bot) { return; }

            // NOTE: Ensure prefixed
            else if (msg.content.slice(0, config.bot.PREFIX.length) !== config.bot.PREFIX) { return; }

            // !SECTION: Exit conditions


            var is_mod = DISCORD_MOD(msg.member.roles);
            var is_admin = config.discord.ADMIN.includes(msg.member.id);


            var level = perm.all;
            if (is_mod) { level = perm.mod; };
            if (is_admin) { level = perm.admin; };


            var response: string | void = HANDLE_MESSAGE({
                channel: msg.channel.name,
                level: level,
                message: msg.content.trim().replace(/\n/g, ""),
                source: "Discord",
                user: msg.author.username,
                cooldown: true
            });

            // NOTE: Ensure response isn't null
            if (response !== null) {

                // NOTE: Reply with string
                bot.createMessage(msg.channel.id, response)
            };

        }

        // SECTION: Error Handling
        catch (error) {
            log_error({
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
};