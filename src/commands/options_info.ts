//
// options_info.ts
//
// Written by: Tyler Akins (2019/12/06 - 2020/01/31)
//


import { PERM, FLAG_INDICATOR } from "../constants";
import { RESOLVE_CHANNEL } from "../utils/metadata";
import { REGISTER_COMMAND } from "../cmd_handler";
import { LOAD } from "../utils/db";


const OPTIONS_INFO = (ctx: msg_data, args: string[]): string => {

    let channel = RESOLVE_CHANNEL(ctx);
    let data = LOAD(channel);
    let name = args[0];


    if (data.length === 0) {
        return "No data for this channel, make there are options added.";
    };


    // Find option
    for (var option of data) {
        if (option.aliases.includes(name)) {


            // Ensure not hidden, or that we showing all hidden
            if (option.hidden && !ctx.flags.includes("a")) { break; };


            // Change amount of data given based on the source of command
            switch (ctx.source) {
                case "Discord":
                    return `Option Information for: ${option.name}\n` +
                        `    Total Points: ${option.total}\n` +
                        `    Total Contributors: ${Object.keys(option.points).length}\n` +
                        `    Data Version: ${option.data_version}\n` +
                        `    Aliases: ${option.aliases.join(", ")}`;
                case "Twitch":
                    return `${option.name} data: ` +
                        `${option.total} points, ` +
                        `${option.aliases.length} aliases.`;
                default:
                    return `${option.name} data: ` +
                        `Points: ${option.total}`;
            };
        };
    };

    return `Cannot find option with name: \`${name}\``;
};



REGISTER_COMMAND({
    description: "Gives detailed information about an option. Depending on what service you run this on, it will give you different information.",
    requires_confirm: false,
    case_sensitive: false,
    executable: OPTIONS_INFO,
    opt_args: 0,
    args: [
        "<Option: String>"
    ],
    group: "options",
    name: "info",
    level: PERM.ALL,
    arg_info: [
        "The option to get information for."
    ],
    flags: {
        "a": "Will allow viewing data for a hidden option"
    }
});


//---------------------------------------------------------------------------//
// Tests:

import { PREFIX, tests } from "../utils/tests";

tests.push(
    {
        id: `option_info:1`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Discord`,
            message: `${PREFIX}options info Foo`,
            level: PERM.MOD
        },
        expected_return: `Option Information for: Foo\n` +
        `    Total Points: 55\n` +
        `    Total Contributors: 2\n` +
        `    Data Version: 3.0\n` +
        `    Aliases: foo`
    },
    {
        id: `option_info:2`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}options info Potato`,
            level: PERM.ALL
        },
        expected_return: `Potato data: 0 points, 2 aliases.`
    },
    {
        id: `option_info:3`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}options info spam`,
            level: PERM.MOD
        },
        expected_return: `Cannot find option with name: \`spam\``
    },
    {
        id: `option_info:4`,
        links: {},
        datafile_should_exist: `NOT_EXISTS`,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}options info Potato`,
            level: PERM.MOD
        },
        expected_return: `No data for this channel, make there are options added.`
    },
    {
        id: `option_info:5`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}options info Option3 ${FLAG_INDICATOR}A`,
            level: PERM.MOD
        },
        expected_return: `Option3 data: 300 points, 2 aliases.`
    },
    {
        id: `option_info:6`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}options info Option3`,
            level: PERM.MOD
        },
        expected_return: `Cannot find option with name: \`option3\``
    }
);