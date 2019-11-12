import * as tmi from "tmi.js";
import {LOAD_CONFIG} from "./utils/Config";
import { HANDLE_MESSAGE } from "./cmd_handler";
import { perm } from "./constants";

/*

tmi.js DOCS: https://github.com/tmijs/docs/blob/gh-pages/_posts/v1.4.2/2019-03-03-Events.md

*/


var last_ran: number;




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

        // SECTION: Context checking

        // NOTE: Ensure not self
        if (self) { return; }


        // NOTE: Ensure message starts with prefix
        else if (message.slice(0, config.bot.PREFIX.length) !== config.bot.PREFIX) { return; }


        // NOTE: Service command cooldown
        else if (config.bot.COOLDOWN_TYPE === "SERVICE") {
            if (last_ran) {
                if (Date.now() - last_ran < config.bot.CMD_COOLDOWN * 1000) {
                    return;
                };
            };
            last_ran = Date.now()
        }
        // !SECTION: Context checking


        // SECTION: Context parsing
        let is_admin = config.twitch.ADMIN.includes(context.username);
        let is_mod = (
            context.mod ||
            context.badges ? context.badges.broadcaster === "1" : false ||
            is_admin
        )

        var level = perm.all;
        if (is_mod) { level = perm.mod; };
        if (is_admin) {level = perm.admin; };
        // !SECTION: Context parsing


        // NOTE: Get response
        let response: string|void = HANDLE_MESSAGE({
            message: message,
            channel: channel,
            level: level,
            source: "Twitch",
            user: context.username
        })


        // NOTE: Ensure response isn't null
        if (response) {
            client.say(
                channel,
                response as string
            );
        };
    });
    // !SECTION


    // A user is cheering us on!
    /*client.on("cheer", (channel: string, context: tmi.Userstate, message: string) => {
        // Do your stuff.
        let bit_count: number = context.bits;
    });

    client.on("disconnected", (reason: string) => {
        // Do your stuff.
    });*/
    client.on("connected", (addr: string, port: number) => {
        console.log(`* Connected to ${addr}:${port}`);
    });

    client.connect().catch((err) => {throw err})
};