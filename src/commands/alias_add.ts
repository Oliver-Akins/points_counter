//
// alias_add.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/12/12)
//


import { LOAD, WRITE } from "../utils/db";
import { RESOLVE_CHANNEL } from "../utils/metadata";


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
        return `That alias is already in use.`
    };

    target_data.aliases.push(new_alias);
    WRITE(channel, data);
    return `Added \`${new_alias}\` to ${target_data.name}.`
}