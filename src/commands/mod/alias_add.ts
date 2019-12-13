//
// alias_add.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/12/12)
//


import { LOAD } from "../../utils/db";


const ALIAS_ADD = (ctx: msg_data, args: string[]): string => {

    let data = LOAD(
        ctx.channel.replace(/#/g, "").replace(/ /g, "_")
    );

    let target = args[0];
    let target_data: option;
    let new_alias = args[1];
    let all_aliases: string[] = [];

    // TODO: Check to make sure that the new_alias is completely unique
    // TODO: Add the new alias to the data

    for (var option of data) {
        if (option.aliases.includes(target)) {
            target_data = option;
        };
        all_aliases.push(...option.aliases)
    }
}