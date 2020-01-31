//
// lead.ts
//
// Written by: Tyler Akins (2019/12/03 - 2020/01/31)
//


import { PERM, FLAG_INDICATOR } from "../constants";
import { RESOLVE_CHANNEL } from "../utils/metadata";
import { REGISTER_COMMAND } from "../cmd_handler";
import { LOAD } from "../utils/db";


const LEAD_COMMAND = (ctx: msg_data, args: string[]): string => {

    let leader: [string, string, number] = ["Nothing", "is in the lead", 0];

    let data = LOAD(RESOLVE_CHANNEL(ctx));

    // Assert data
    if (data.length === 0) {
        return "No options for this channel, meaning that no one can be in the lead.";
    };


    // Compare all options
    for (var option of data) {


        // Check to see if we're including hidden options
        if (option.hidden && !ctx.flags.includes("a")) {
            continue;
        };

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



REGISTER_COMMAND({
    description: "Tells you what characters are in the lead in a nice, English format.",
    requires_confirm: false,
    case_sensitive: false,
    executable: LEAD_COMMAND,
    opt_args: 0,
    args: [],
    group: null,
    name: "lead",
    level: PERM.ALL,
    arg_info: [],
    flags: {
        "a": "Displays hidden options as well."
    }
});


//---------------------------------------------------------------------------//
// Tests:

import { PREFIX, tests } from "../utils/tests";


tests.push(
    {
        id: `lead:1`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: false,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}lead`,
            level: PERM.ALL
        },
        expected_return: `No options for this channel, meaning that no one can be in the lead.`
    },
    {
        id: `lead:2`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}lead`,
            level: PERM.ALL
        },
        expected_return: `Foo is in the lead with 55 points.`
    },
    {
        id: `lead:3`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}lead ${FLAG_INDICATOR}A`,
            level: PERM.ALL
        },
        expected_return: `Option3 is in the lead with 300 points.`
    }
);