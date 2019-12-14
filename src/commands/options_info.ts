//
// options_info.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/12/06 - 2019/12/13)
//


import { RESOLVE_CHANNEL } from "../utils/metadata";
import { REGISTER_COMMAND } from "../cmd_handler";
import { PERM } from "../constants";
import { LOAD } from "../utils/db";


const OPTIONS_INFO = (ctx: msg_data, args: string[]): string => {

    let channel = RESOLVE_CHANNEL(ctx);
    let data = LOAD(channel);
    let name = args[0];


    if (!data) {
        return "Cannot load data for this channel. Make sure it's been initialized.";
    };


    for (var option of data) {

        if (option.aliases.includes(name)) {

            // Change amount of data given based on the source of command
            switch (ctx.source) {
                case "Discord":
                    return `Option Information for: ${option.name}\n` +
                        `    Total Points: ${option.total}\n` +
                        `    Total Contributors: ${Object.keys(option.points).length}\n` +
                        `    Data Version: ${option.data_version}\n` +
                        `    Aliases: ${option.aliases.join(", ")}`;
                case "Twitch":
                    return `${option.name} data: ` +
                        `${option.total} points, ` +
                        `${option.aliases.length} aliases.`;
                default:
                    return `${option.name} data: ` +
                        `Points: ${option.total}`;
            };
        };
    };

    return `Cannot find option with name: \`${name}\``;
};



const metadata: cmd_metadata = {
    description: "Gives detailed information about an option. Depending on what service you run this on, it will give you different information.",
    requires_confirm: false,
    case_sensitive: false,
    executable: OPTIONS_INFO,
    opt_args: 0,
    args: [
        "<Option: String>"
    ],
    group: "options",
    name: "info",
    level: PERM.ALL
};
REGISTER_COMMAND(metadata);