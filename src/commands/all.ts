//
// all.ts
//
// Written by: Tyler Akins (2019/12/06 - 2020/01/04)
//


import { RESOLVE_CHANNEL } from "../utils/metadata";
import { REGISTER_COMMAND } from "../cmd_handler";
import { PERM } from "../constants";
import { LOAD } from "../utils/db";



const ALL_OPTIONS_COMMAND = (ctx: msg_data, args: string[]): string => {


    let data = LOAD(RESOLVE_CHANNEL(ctx));
    let responses: string[] = [];


    // Ensure data
    if (data.length == 0) {
        return `No data for the channel.`;
    };


    for (var option of data) {

        // Ensure not hidden or showing hidden
        if (option.hidden && !ctx.flags.includes("A")) { break; };

        // Ensure points
        if (option.total > 0) {
            responses.push(`${option.name} (${option.total})`);
        };
    };

    return `All options with points: ${responses.join(", ")}`;
};


const metadata: cmd_metadata = {
    description: "Lists all the options with points for the given channel.",
    requires_confirm: false,
    case_sensitive: false,
    executable: ALL_OPTIONS_COMMAND,
    opt_args: 0,
    args: [],
    group: null,
    name: "all",
    level: PERM.ALL,
    arg_info: []
};
REGISTER_COMMAND(metadata);