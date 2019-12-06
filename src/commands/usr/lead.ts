//
// lead.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/12/03)
//


import { REGISTER_COMMAND } from "../../cmd_handler";
import { LOAD } from "../../utils/db";


const LEAD_COMMAND = (ctx: msg_data, args: string[]): string => {

    let leader: [string, number] = ["Nothing", -1];
    let state: string = "is in the lead";

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
        if (option.total > leader[1]) {
            leader = [option.name, option.total];
            state = "is in the lead";
        }

        // Tieing for first
        else if (option.total === leader[1]) {
            leader[0] += ` and ${option.name}`;
            state = "are tied for first"
        };
    };

    return `${leader[0]} ${state} with ${leader[1]} points.`
};



const metadata: cmd_metadata = {
    description: "Tells you what characters are in the lead in a nice, English format.",
    requires_confirm: false,
    case_sensitive: false,
    executable: null,
    opt_args: 0,
    args: [],
    group: null,
    name: "lead",
    level: 0
};
REGISTER_COMMAND(metadata);