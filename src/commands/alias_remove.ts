//
// alias_remove.ts
//
// Written by: Tyler Akins (2019/12/12 - 2019/12/23)
//


import { RESOLVE_CHANNEL } from "../utils/metadata";
import { REGISTER_COMMAND } from "../cmd_handler";
import { LOAD, WRITE } from "../utils/db";
import { PERM } from "../constants";



const ALIAS_REMOVE = (ctx: msg_data, args: string[]) => {

    let channel = RESOLVE_CHANNEL(ctx)

    let data = LOAD(channel);
    let target = args[0];

    // Find data
    for (var option of data) {
        if (option.aliases.includes(target)) {

            // Ensure not removing last alias
            if (option.aliases.length - 1 < 1) {
                return `Cannot remove the last aliases from an option.`;
            };

            // Remove alias
            option.aliases.splice(option.aliases.indexOf(target));
            WRITE(channel, data);
            return `Removed alias \`${target}\` from option ${option.name}`;
        };
    };

    return `Could not find an option with alias \`${target}\``;
};



const metadata: cmd_metadata = {
    description: "Removes the given alias from the option that contains it. This cannot remove the last alias from an option.",
    requires_confirm: false,
    case_sensitive: false,
    executable: ALIAS_REMOVE,
    opt_args: 0,
    args: [
        "<Alias: String>"
    ],
    group: "alias",
    name: "remove",
    level: PERM.MOD,
    arg_info: [
        "The alias to remove from whatever option has it. This cannot remove the last alias from an option."
    ]
};
REGISTER_COMMAND(metadata);