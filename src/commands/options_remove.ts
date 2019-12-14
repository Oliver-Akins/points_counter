//
// options_remove.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/12/06 - 2019/12/13)
//


import { RESOLVE_CHANNEL } from "../utils/metadata";
import { REGISTER_COMMAND } from "../cmd_handler";
import { LOAD, WRITE } from "../utils/db";
import { PERM } from "../constants";



const OPTIONS_REMOVE = (ctx: msg_data, args: string[]): string => {

    let channel = RESOLVE_CHANNEL(ctx);
    let data = LOAD(channel);
    let target = args[0];


    for (var i = 0; i < data.length; i++) {

        if (data[i].aliases.includes(target)) {

            // Update the data
            let old_option: option = data.splice(i, 1)[0];
            WRITE(channel, data);
            return `Removed option with name: \`${old_option.name}\``;
        };
    };

    return `Could not find an option with an alias of: \`${target}\``;
};



const metadata: cmd_metadata = {
    description: "Removes an option from the channel's options.",
    requires_confirm: false,
    case_sensitive: false,
    executable: OPTIONS_REMOVE,
    opt_args: 0,
    args: [
        "<Option: String>"
    ],
    group: "options",
    name: "remove",
    level: PERM.MOD
};
REGISTER_COMMAND(metadata);