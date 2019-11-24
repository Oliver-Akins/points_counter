import * as tmi from "tmi.js";
import { HANDLE_MESSAGE } from "../cmd_handler";
import { LOAD_CONFIG } from "../utils/Config";
import { log_error } from "../utils/webhook";
import { perm } from "../constants";

/*

tmi.js DOCS: https://github.com/tmijs/docs/blob/gh-pages/_posts/v1.4.2/2019-03-03-Events.md

*/



export const run_twitch = () => {

    let config: config = LOAD_CONFIG();


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


            // NOTE: Ensure message starts with prefix
            else if (message.slice(0, config.bot.PREFIX.length) !== config.bot.PREFIX) { return; }
            // !SECTION: Context checking


            // SECTION: Context parsing
            var is_admin = config.twitch.ADMIN.includes(context.username);
            var is_mod = (
                context.mod ||
                context.badges ? context.badges.broadcaster === "1" : false ||
                is_admin
            )

            var level = perm.all;
            if (is_mod) { level = perm.mod; };
            if (is_admin) { level = perm.admin; };
            // !SECTION: Context parsing


            // NOTE: Get response
            let response: string|void = HANDLE_MESSAGE({
                message: message,
                channel: channel,
                level: level,
                source: "Twitch",
                user: context.username,
                test: false
            });


            // NOTE: Ensure response isn't null
            if (response) {
                client.say(
                    channel,
                    response as string
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


    // A user is cheering us on!
    // client.on("cheer", (channel: string, context: tmi.Userstate, message: string) => {
    //     // Do your stuff.
    //     let bit_count: number = context.bits;
    // });

    client.on("disconnected", (reason: string) => {
        console.log(`* Disconnected from Twitch`);
    });

    client.on("connected", (addr: string, port: number) => {
        console.log(`* Connected to ${addr}:${port}`);
        // client.say("#alkali_metal", "Connected to chat. I'm now active.");
    });

    client.connect().catch((err) => {throw err})
};