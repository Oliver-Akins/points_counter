//
// alias_list.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/12/12 - 2019/12/13)
//


import { RESOLVE_CHANNEL } from "../utils/metadata";
import { REGISTER_COMMAND } from "../cmd_handler";
import { PERM } from "../constants";
import { LOAD } from "../utils/db";



const ALIAS_LIST = (ctx: msg_data, args: string[]): string => {

    let data = LOAD(RESOLVE_CHANNEL(ctx));
    let target = args[0];


    // Find option
    for (var option of data) {
        if (option.aliases.includes(target)) {
            return `You can refer to ${option.name} by using: ${option.aliases.join(", ")}`;
        };
    };

    return `Could not find an option by alias \`${target}\``;
};


const metadata: cmd_metadata = {
    description: "Lists all the aliases associated with a specific option in the channel.",
    requires_confirm: false,
    case_sensitive: false,
    executable: ALIAS_LIST,
    opt_args: 0,
    args: [
        "<Option: String>"
    ],
    group: "alias",
    name: "list",
    level: PERM.ALL
};
REGISTER_COMMAND(metadata);