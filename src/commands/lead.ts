//
// lead.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/12/03 - 2019/12/06)
//


import { REGISTER_COMMAND } from "../cmd_handler";
import { PERM } from "../constants";
import { LOAD } from "../utils/db";


const LEAD_COMMAND = (ctx: msg_data, args: string[]): string => {

    let leader: [string, string, number] = ["Nothing", "is in the lead", -1];

    let data = LOAD(
        ctx.channel.replace(/#/g, "").replace(/ /g, "_")
    );

    // Assert data
    if (data.length === 0) {
        return "No options for this channel, meaning that no one can be in the lead.";
    };


    // Compare all options
    for (var option of data) {

        // Taking the lead
        if (option.total > leader[2]) {
            leader = [option.name, "is in the lead", option.total];
        }

        // Tieing for first
        else if (option.total === leader[2]) {
            leader[0] += ` and ${option.name}`;
            leader[1] = "are tied for first"
        };
    };

    return `${leader[0]} ${leader[1]} with ${leader[2]} points.`;
};



const metadata: cmd_metadata = {
    description: "Tells you what characters are in the lead in a nice, English format.",
    requires_confirm: false,
    case_sensitive: false,
    executable: LEAD_COMMAND,
    opt_args: 0,
    args: [],
    group: null,
    name: "lead",
    level: PERM.ALL
};
REGISTER_COMMAND(metadata);