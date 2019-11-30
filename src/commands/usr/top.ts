//
// top.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/11/29)
//

import { REGISTER_COMMAND } from "../../cmd_handler";
import { SORT_OPTIONS } from "../../utils/Options";
import { PERM } from "../../constants";
import { LOAD } from "../../utils/db";


const TOP_COMMAND = (context: msg_data, args: string[]): string => {
    let data: option[] = LOAD(context.channel.replace("#", "").replace(" ", ""));
    let sorted: option[] = SORT_OPTIONS(data);

    let top_x: number = args[0] ? parseInt(args[0]) : 3
    let top: string[] = [];

    // Ensure message doesn't get too long
    if (top_x > 10) {
        return `I can't display more than 10 of the top options.`;
    };


    // Get the top x option strings
    for (var i: number = 0; i < top_x; i++) {
        if (sorted[i] == null) { break; };
        top.push(`${sorted[i].name} (${sorted[i].total})`);
    };

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
        "<Top: Integer>"
    ],
    level: PERM.ALL
};
REGISTER_COMMAND(metadata)