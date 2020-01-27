//
// options_add.ts
//
// Written by: Tyler Akins (2019/11/29 - 2020/01/10)
//


import { PERM, FLAG_INDICATOR } from "../constants";
import { RESOLVE_CHANNEL } from "../utils/metadata";
import { REGISTER_COMMAND } from "../cmd_handler";
import { LOAD, WRITE } from "../utils/db";



const OPTIONS_ADD_COMMAND = (ctx: msg_data, args: string[]): string => {

    let channel = RESOLVE_CHANNEL(ctx);
    let data = LOAD(channel);
    let name = args[0];


    // Ensure an option doesn't exist with that name already
    for (var option of data) {
        if (option.aliases.includes(name.toLowerCase())) {
            return `An option already exists with name: \`${name}\``;
        };
    };


    data.push({
        "aliases": [name.toLowerCase()],
        "name": name,
        "points": {
            "%anonymous%": 0
        },
        "total": 0,
        "data_version": "3.0",
        "hidden": ctx.flags.includes("h")
    });


    WRITE(channel, data);
    return `Option created with name: \`${name}\``;
};



REGISTER_COMMAND({
    description: "Adds an option to the channel's point system.",
    requires_confirm: false,
    case_sensitive: true,
    executable: OPTIONS_ADD_COMMAND,
    opt_args: 0,
    args: [
        "<Name: string>"
    ],
    group: "options",
    name: "add",
    level: PERM.MOD,
    arg_info: [
        "The name of the option to add."
    ]
});


//---------------------------------------------------------------------------//
// Tests:

import { PREFIX, tests, SEND_INVALID_PERM } from "../utils/tests";

tests.push(
    {
        id: `options_add:1`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}options add Spam`,
            level: PERM.ALL
        },
        expected_return: (
            SEND_INVALID_PERM
            ? `Invalid Permissions, you must be at least level ${PERM.MOD}, you are level ${PERM.ALL}.`
            : null
        )
    },
    {
        id: `options_add:2`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}options add Spam`,
            level: PERM.MOD
        },
        expected_return: `Option created with name: \`Spam\``
    },
    {
        id: `options_add:3`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}options add Foo`,
            level: PERM.MOD
        },
        expected_return: `An option already exists with name: \`Foo\``
    },
    {
        id: `options_add:4`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}options add Option4 ${FLAG_INDICATOR}h`,
            level: PERM.MOD
        },
        expected_return: `Option created with name: \`Option4\``
    },
);