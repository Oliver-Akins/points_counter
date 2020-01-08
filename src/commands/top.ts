//
// top.ts
//
// Written by: Tyler Akins (2019/11/29 - 2020/01/04)
//


import { RESOLVE_CHANNEL } from "../utils/metadata";
import { REGISTER_COMMAND } from "../cmd_handler";
import { SORT_OPTIONS } from "../utils/sorting";
import { PERM } from "../constants";
import { LOAD } from "../utils/db";


const TOP_COMMAND = (ctx: msg_data, args: string[]): string => {

    let top_x: number = parseInt(args[0]) || 3
    let top: string[] = [];


    // Ensure message doesn't get too long
    if (top_x > 10) {
        return `I can't display more than 10 of the top options.`;
    } else if (top_x < 0) {
        return `I can't display less than 0 of the top results.`;
    };


    let data: option[] = LOAD(RESOLVE_CHANNEL(ctx));
    let sorted: option[] = SORT_OPTIONS(data);


    // Get the top x option strings
    let i = 0;
    let temp_x = top_x;
    while (i < temp_x) {

        // Ensure not out of bounds of array
        if (!sorted[i]) { i++; break; };

        // Ensure not hidden
        if (sorted[i].hidden && !ctx.flags["A"]) {
            temp_x++; i++;
            continue;
        };

        top.push(`${sorted[i].name} (${sorted[i].total})`);
        i++;
    }

    return `The top ${top_x} options are: ${top.join(", ")}`;
};


const metadata: cmd_metadata = {
    description: "Tells you the top options in the channel and their point values.",
    executable: TOP_COMMAND,
    requires_confirm: false,
    case_sensitive: false,
    name: "top",
    opt_args: 1,
    args: [
        "[Amount: Integer]"
    ],
    level: PERM.ALL,
    arg_info: [
        "The number of top positions to show. This defaults to 3 if not specified."
    ]
};
REGISTER_COMMAND(metadata)