//
// options_list.ts
//
// Written by: Tyler Akins (2019/11/11 - 2020/01/31)
//


import { LIMIT, PERM, FLAG_INDICATOR } from "../constants";
import { RESOLVE_CHANNEL } from "../utils/metadata";
import { REGISTER_COMMAND } from "../cmd_handler";
import { LOAD } from "../utils/db";


const LIST_OPTIONS = (ctx: msg_data, args: string[]): string => {

    let channel = RESOLVE_CHANNEL(ctx);
    let data = LOAD(channel);


    // Ensure data
    if (data.length === 0) {
        return "No data for this channel, make there are options added.";
    };

    let names: string[] = [];


    // Make list of names
    for (var option of data) {
        if (!option.hidden || (option.hidden && ctx.flags.includes("a"))) {
            names.push(option.name);
        };
    };


    let response = `Possible options: ${names.join(", ")}`

    switch (ctx.source) {
        case "Discord":
            if (response.length >= LIMIT.DISCORD) {
                return response.slice(0, LIMIT.DISCORD)
            };
            break;
        case "Twitch":
            if (response.length >= LIMIT.TWITCH) {
                return response.slice(0, LIMIT.TWITCH)
            };
            break;
    };

    return response;
};



REGISTER_COMMAND({
    description: "Lists all of the options that exist for the channel. This command will only display as many options as possible within the allowed amount of characters on the service. So if you have too many options, not all of them will be displayed.",
    requires_confirm: false,
    case_sensitive: false,
    executable: LIST_OPTIONS,
    opt_args: 0,
    args: [],
    group: "options",
    name: "list",
    level: PERM.ALL,
    arg_info: [],
    flags: {
        "a": "Includes hidden options in the output"
    }
});



//---------------------------------------------------------------------------//
// Tests:

import { PREFIX, tests } from "../utils/tests";

tests.push(
    {
        id: `option_list:1`,
        links: {},
        datafile_should_exist: `NOT_EXISTS`,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}options list`,
            level: PERM.ALL
        },
        expected_return: `No data for this channel, make there are options added.`
    },
    {
        id: `option_list:2`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}options list`,
            level: PERM.ALL
        },
        expected_return: `Possible options: Potato, Foo`
    },
    {
        id: `option_list:3`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}options list ${FLAG_INDICATOR}A`,
            level: PERM.ALL
        },
        expected_return: `Possible options: Potato, Foo, Option3`
    }
);