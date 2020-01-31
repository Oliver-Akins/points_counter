//
// alias_add.ts
//
// Written by: Tyler Akins (2019/12/12 - 2020/01/31)
//


import { RESOLVE_CHANNEL } from "../utils/metadata";
import { REGISTER_COMMAND } from "../cmd_handler";
import { LOAD, WRITE } from "../utils/db";
import { PERM } from "../constants";


const ALIAS_ADD = (ctx: msg_data, args: string[]): string => {

    let channel = RESOLVE_CHANNEL(ctx);
    let data = LOAD(channel);
    let target = args[0];
    let new_alias = args[1].toLowerCase();
    let all_aliases: string[] = [];
    let target_data: option;


    for (var option of data) {
        if (option.aliases.includes(target)) {
            target_data = option;
        };
        all_aliases.push(...option.aliases);
    };

    if (all_aliases.includes(new_alias)) {
        return `That alias is already in use.`;
    };


    target_data.aliases.push(new_alias);
    WRITE(channel, data);
    return `Added \`${new_alias}\` to ${target_data.name}.`;
};


REGISTER_COMMAND({
    description: "Adds the given alias to the option specified. Alias must be unique across all options.",
    requires_confirm: false,
    case_sensitive: false,
    executable: ALIAS_ADD,
    opt_args: 0,
    args: [
        "<Option: String>",
        "<Alias: String>"
    ],
    group: "alias",
    name: "add",
    level: PERM.MOD,
    arg_info: [
        "The option to add the alias to.",
        "The alias to add. This must be unique across all options in order for the command to work."
    ],
    flags: {}
});



//---------------------------------------------------------------------------//
// Tests:


import { PREFIX, tests, SEND_INVALID_PERM } from "../utils/tests";


tests.push(
    {
        id: `alias_add:01`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}alias add potato spam`,
            level: PERM.ALL
        },
        expected_return: SEND_INVALID_PERM ? `Invalid Permissions, you must be at least level ${PERM.MOD}, you are level ${PERM.ALL}.` : null
    },
    {
        id: `alias_add:02`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}alias add potato spam`,
            level: PERM.ALL
        },
        expected_return: SEND_INVALID_PERM ? `Invalid Permissions, you must be at least level ${PERM.MOD}, you are level ${PERM.ALL}.` : null
    },
    {
        id: `alias_add:03`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}alias add potato spam`,
            level: PERM.MOD
        },
        expected_return: `Added \`spam\` to Potato.`
    },
    {
        id: `alias_add:04`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}alias add potato salad`,
            level: PERM.ADMIN
        },
        expected_return: `That alias is already in use.`
    },
    {
        id: `alias_add:05`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}alias add potato foo`,
            level: PERM.MOD
        },
        expected_return: `That alias is already in use.`
    },
    {
        id: `alias_add:06`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}alias add foo bar`,
            level: PERM.MOD
        },
        expected_return: `Added \`bar\` to Foo.`
    },
    {
        id: `alias_add:07`,
        links: {},
        datafile_should_exist: `IGNORES`,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}alias add`,
            level: PERM.MOD
        },
        expected_return: `Not enough arguments, missing argument: \`<Option: String>\``
    },
    {
        id: `alias_add:08`,
        links: {},
        datafile_should_exist: `IGNORES`,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}alias add potato`,
            level: PERM.MOD
        },
        expected_return: `Not enough arguments, missing argument: \`<Alias: String>\``
    }
);