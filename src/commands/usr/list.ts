//
// list.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/11/11)
//


import { DISCORD_CHAR_LIMIT, TWITCH_CHAR_LIMIT, perm } from "../../constants";
import { REGISTER_COMMAND } from "../../cmd_handler";
import { LOAD } from "../../utils/db";


const LIST_OPTIONS = (ctx: msg_data, args: string[]): string|void => {
    let channel = ctx.channel.replace(/\#/, "").replace(" ", "_");

    let data = LOAD(channel);

    if (!data) {
        return "Cannot load data for this channel. Make sure it's been initialized.";
    };

    let names: string[] = [];


    // Make list of names
    for (var option of data) {
        names.push(option.name);
    };

    // Check if there are any options to begin with
    if (names.length == 0) {
        return "No options in this channel.";
    };


    let response = "Possible options: ";

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



const metadata: cmd_metadata = {
    description: "Lists all of the options that exist for the channel",
    requires_confirm: false,
    case_sensitive: false,
    executable: LIST_OPTIONS,
    opt_args: 0,
    args: [],
    syntax: "{pre}options",
    group: null,
    name: "options",
    level: perm.all,
};
REGISTER_COMMAND(metadata);