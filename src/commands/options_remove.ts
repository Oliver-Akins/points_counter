//
// options_remove.ts
//
// Written by: Tyler Akins (2019/12/06 - 2020/01/31)
//


import { RESOLVE_CHANNEL } from "../utils/metadata";
import { REGISTER_COMMAND } from "../cmd_handler";
import { LOAD, WRITE } from "../utils/db";
import { PERM } from "../constants";



const OPTIONS_REMOVE = (ctx: msg_data, args: string[]): string => {

    let channel = RESOLVE_CHANNEL(ctx);
    let data = LOAD(channel);
    let target = args[0];


    for (var i = 0; i < data.length; i++) {

        if (data[i].aliases.includes(target)) {

            // Update the data
            let old_option: option = data.splice(i, 1)[0];
            WRITE(channel, data);
            return `Removed option with name: \`${old_option.name}\``;
        };
    };

    return `Could not find an option with an alias of: \`${target}\``;
};



REGISTER_COMMAND({
    description: "Removes an option from the channel's options.",
    requires_confirm: false,
    case_sensitive: false,
    executable: OPTIONS_REMOVE,
    opt_args: 0,
    args: [
        "<Option: String>"
    ],
    group: "options",
    name: "remove",
    level: PERM.MOD,
    arg_info: [
        "The option to remove from the dataset."
    ],
    flags: {}
});



//---------------------------------------------------------------------------//
// Tests:

import { PREFIX, tests, SEND_INVALID_PERM } from "../utils/tests";

tests.push(
    {
        id: `option_remove:1`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}options remove Potato`,
            level: PERM.MOD
        },
        expected_return: `Removed option with name: \`Potato\``
    },
    {
        id: `option_remove:2`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}options remove Spam`,
            level: PERM.MOD
        },
        expected_return: `Could not find an option with an alias of: \`spam\``
    },
    {
        id: `option_remove:3`,
        links: {},
        datafile_should_exist: `IGNORES`,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}options remove Spam`,
            level: PERM.ALL
        },
        expected_return: (
            SEND_INVALID_PERM
            ? `Invalid Permissions, you must be at least level ${PERM.MOD}, you are level ${PERM.ALL}.`
            : null
        )
    }
);