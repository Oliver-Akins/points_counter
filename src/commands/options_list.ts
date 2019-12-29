//
// options_list.ts
//
// Written by: Tyler Akins (2019/11/11 - 2019/12/23)
//


import { RESOLVE_CHANNEL } from "../utils/metadata";
import { REGISTER_COMMAND } from "../cmd_handler";
import { LIMIT, PERM } from "../constants";
import { LOAD } from "../utils/db";


const LIST_OPTIONS = (ctx: msg_data, args: string[]): string => {

    let channel = RESOLVE_CHANNEL(ctx);
    let data = LOAD(channel);

    if (data.length === 0) {
        return "No data for this channel, make there are options added.";
    };

    let names: string[] = [];

    // Make list of names
    for (var option of data) {
        names.push(option.name);
    };


    let response = "Possible options: ";

    switch (ctx.source) {
        case "Discord":
            // Run through each name
            for (var name of names) {

                // Ensure we don't surpass the character limit
                if ((response.length + name.length)-2 <= LIMIT.DISCORD) {
                    response += `${name}, `;
                };
            };
            break;

        case "Twitch":
            // Run through each name
            for (var name of names) {

                // Ensure we don't surpass the character limit
                if ((response.length + name.length)-2 <= LIMIT.TWITCH) {
                    response += `${name}, `;
                };
            };
            break;

        default:
            break;
    };

    return response.slice(0, -2);
};



REGISTER_COMMAND({
    description: "Lists all of the options that exist for the channel. This command will only display as many options as possible within the allowed amount of characters on the service. So if you have too many options, not all of them will be displayed.",
    requires_confirm: false,
    case_sensitive: false,
    executable: LIST_OPTIONS,
    opt_args: 0,
    args: [],
    group: "options",
    name: "list",
    level: PERM.ALL,
    arg_info: []
});