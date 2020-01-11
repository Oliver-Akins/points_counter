//
// all.ts
//
// Written by: Tyler Akins (2019/12/06 - 2020/01/10)
//


import { RESOLVE_CHANNEL } from "../utils/metadata";
import { REGISTER_COMMAND } from "../cmd_handler";
import { PERM, FLAG_INDICATOR } from "../constants";
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
        if (option.hidden && !ctx.flags.includes("A")) { continue; };

        // Ensure points
        if (option.total > 0) {
            responses.push(`${option.name} (${option.total})`);
        };
    };

    return `All options with points: ${responses.join(", ")}`;
};


REGISTER_COMMAND({
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
});



//---------------------------------------------------------------------------//
// Tests:


import { PREFIX, tests } from "../utils/tests";


tests.push(
    {
        id: `all:1`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: false,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}all`,
            level: PERM.ALL
        },
        expected_return: `No data for the channel.`
    },
    {
        id: `all:2`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}all`,
            level: PERM.ALL
        },
        expected_return: `All options with points: Foo (55)`
    },
    {
        id: `all:3`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}all ${FLAG_INDICATOR}A`,
            level: PERM.ALL
        },
        expected_return: `All options with points: Foo (55), Option3 (300)`
    },
);