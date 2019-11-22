//
// list.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/11/11)
//


import { DISCORD_CHAR_LIMIT, TWITCH_CHAR_LIMIT } from "../../constants";
import { LOAD } from "../../utils/db";


const LIST_OPTIONS = (ctx: msg_data, args: string[]): string|void => {
    let channel = ctx.channel.replace(/\#/, "").replace(" ", "_");

    let data = LOAD(channel);

    let names: string[] = [];

    for (var option of data) {
        names.push(option.name);
    };

    let response = `Possible options: `;

    switch (ctx.source) {
        case "Discord":
            // Run through each name
            for (var name of names) {

                // Ensure we don't surpass the character limit
                if (response.length + name.length <= DISCORD_CHAR_LIMIT) {
                    response += `${name}, `;
                };
            };
            break;

        case "Twitch":
            // Run through each name
            for (var name of names) {

                // Ensure we don't surpass the character limit
                if (response.length + name.length <= TWITCH_CHAR_LIMIT) {
                    response += `${name}, `;
                };
            };
            break;

        default:
            break;
    };

    return response.slice(0, -2);
};