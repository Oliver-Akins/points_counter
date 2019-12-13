//
// twitch_handler.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/12/10)
//

import * as tmi from "tmi.js";
import { HANDLE_MESSAGE } from "../cmd_handler";
import { LOAD_CONFIG } from "../utils/Config";
import { log_error, log } from "../utils/webhook";
import { PERM } from "../constants";
import { LOAD } from "../utils/db";

/*

tmi.js DOCS: https://github.com/tmijs/docs/blob/gh-pages/_posts/v1.4.2/2019-03-03-Events.md

*/



export const run_twitch = () => {

    const config: config = LOAD_CONFIG();


    // Init Client
    const client = tmi.Client({
        options: {
            debug: config.DEV,
            clientId: config.twitch.CLIENT_ID
        },
        connection: {
            secure: true,
            reconnect: true
        },
        identity: {
            username: config.twitch.USERNAME,
            password: config.twitch.OAUTH_TOKEN
        },
        channels: config.twitch.CHANNELS
    });



    // SECTION: Handle messages
    client.on("message", (channel: string, context: tmi.Userstate, message: string, self: boolean) => {
        try {

            // SECTION: Context checking

            // NOTE: Ensure not self
            if (self) { return; }

            // NOTE: Ensure text channel, not whisper or anything else weird.
            else if (context["message-type"] !== "chat") { return; }

            // NOTE: Ensure message starts with prefix
            else if (message.trim().slice(0, config.bot.PREFIX.length) !== config.bot.PREFIX) { return; }
            // !SECTION: Context checking


            // SECTION: Context parsing
            var is_admin = config.twitch.ADMIN.includes(context.username);
            var is_mod = (
                context.mod ||
                context.badges ? context.badges.moderator === "1" : false ||
                context.badges ? context.badges.broadcaster === "1" : false ||
                is_admin
            )

            var level = PERM.ALL;
            if (is_mod) { level = PERM.MOD; };
            if (is_admin) { level = PERM.ADMIN; };
            // !SECTION: Context parsing


            // NOTE: Get response
            let response: string = HANDLE_MESSAGE({
                message: message,
                channel: channel,
                level: level,
                source: "Twitch",
                user: context.username,
                cooldown: true,
                test: false
            });


            // NOTE: Ensure response isn't null
            if (response) {
                client.say(
                    channel,
                    response.replace(/`/g, `"`)
                );
            };
        } catch (error) {
            log_error({
                "embeds": [
                    {
                        "title": `${error.name}`,
                        "color": 13238272,
                        "description": `**Error Message:**\n\`\`\`\n${error.message}\n\`\`\``,
                        "fields": [
                            {
                                "name": "**Message Context:**",
                                "value": `\`\`\`\n${JSON.stringify(context, null, 2)}\n\`\`\``
                            },
                            {
                                "name": "**Message Content:**",
                                "value": `\`\`\`json\n${message}\`\`\``
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
                                "value": `\`${channel}\``,
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
        }
    });
    // !SECTION


    // SECTION: Auto bit addition
    client.on("cheer", (channel: string, context: tmi.Userstate, message: string) => {

        let bit_total: number = parseInt(context.bits);
        let data: option[] = LOAD(channel.replace(/#/g, ""));
        let aliases: string[] = [];


        // Condense aliases
        for (var opt of data) { aliases.push(...opt.aliases); };


        // Iterate through message
        for (var word of message.split(" ")) {

            // Punctuation cleanup
            word = word.toLowerCase().replace(/\W/g, "")

            // Ensure valid option
            if (aliases.includes(word)) {

                // Trigger addition
                let response = HANDLE_MESSAGE({
                    message: `${config.bot.PREFIX}points add ${bit_total} ${word} ${context.username}`,
                    source: "Twitch",
                    channel: channel,
                    level: PERM.MOD,
                    user: context.username,
                    cooldown: false,
                    test: false
                });

                // Reply if possible
                if (response && config.twitch.REPLY_TO_AUTO_ADD) {
                    client.say(channel, response);
                };
                return;
            };
        };
    });
    // !SECTION


    client.on("disconnected", (reason: string) => {
        log({ msg: `* Disconnected from Twitch` });
    });


    client.on("connected", (addr: string, port: number) => {
        log({ msg: `* Disconnected from Twitch` });
    });

    client.connect().catch((_) => {})
};