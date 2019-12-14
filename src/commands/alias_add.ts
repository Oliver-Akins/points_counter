//
// alias_add.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/12/12 2019/13/13)
//


import { RESOLVE_CHANNEL } from "../utils/metadata";
import { REGISTER_COMMAND } from "../cmd_handler";
import { LOAD, WRITE } from "../utils/db";
import { PERM } from "../constants";


const ALIAS_ADD = (ctx: msg_data, args: string[]): string => {

    let channel = RESOLVE_CHANNEL(ctx);
    let data = LOAD(channel);
    let target = args[0];
    let new_alias = args[1];
    let all_aliases: string[] = [];
    let target_data: option;


    for (var option of data) {
        if (option.aliases.includes(target)) {
            target_data = option;
        };
        all_aliases.push(...option.aliases);
    };

    if (all_aliases.includes(new_alias)) {
        return `That alias is already in use.`;
    };


    target_data.aliases.push(new_alias);
    WRITE(channel, data);
    return `Added \`${new_alias}\` to ${target_data.name}.`;
};


const metadata: cmd_metadata = {
    description: "Adds the given alias to the option specified. Alias must be unique across all options.",
    requires_confirm: false,
    case_sensitive: false,
    executable: ALIAS_ADD,
    opt_args: 0,
    args: [
        "<Option: String>",
        "<Alias: String>"
    ],
    group: "alias",
    name: "add",
    level: PERM.MOD
};
REGISTER_COMMAND(metadata);