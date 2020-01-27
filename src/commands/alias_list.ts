//
// alias_list.ts
//
// Written by: Tyler Akins (2019/12/12 - 2020/01/10)
//


import { RESOLVE_CHANNEL } from "../utils/metadata";
import { REGISTER_COMMAND } from "../cmd_handler";
import { PERM } from "../constants";
import { LOAD } from "../utils/db";



const ALIAS_LIST = (ctx: msg_data, args: string[]): string => {

    let data = LOAD(RESOLVE_CHANNEL(ctx));
    let target = args[0];


    // Find option
    for (var option of data) {
        if (option.aliases.includes(target)) {
            return `You can refer to ${option.name} by using: ${option.aliases.join(", ")}`;
        };
    };

    return `Could not find an option by alias \`${target}\``;
};


REGISTER_COMMAND({
    description: "Lists all the aliases associated with a specific option in the channel.",
    requires_confirm: false,
    case_sensitive: false,
    executable: ALIAS_LIST,
    opt_args: 0,
    args: [
        "<Option: String>"
    ],
    group: "alias",
    name: "list",
    level: PERM.ALL,
    arg_info: [
        "The option to list aliases for."
    ]
});


REGISTER_COMMAND({
    description: "Lists all the aliases associated with a specific option in the channel. This is an alias for alias_list",
    requires_confirm: false,
    case_sensitive: false,
    executable: ALIAS_LIST,
    opt_args: 0,
    args: [
        "<Option: String>"
    ],
    group: null,
    name: "aliases",
    level: PERM.ALL,
    arg_info: [
        "The option to list aliases for."
    ]
});


//---------------------------------------------------------------------------//
// Tests:


import { PREFIX, tests } from "../utils/tests";


tests.push(
    {
        id: `alias_list:01`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}alias list potato`,
            level: PERM.ALL
        },
        expected_return: `You can refer to Potato by using: potato, salad`
    },
    {
        id: `alias_list:02`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}alias list spam`,
            level: PERM.ALL
        },
        expected_return: `Could not find an option by alias \`spam\``
    },
    {
        id: `alias_list:03`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}aliases spam`,
            level: PERM.ALL
        },
        expected_return: `Could not find an option by alias \`spam\``
    },
    {
        id: `alias_list:04`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}alias list potato`,
            level: PERM.ALL
        },
        expected_return: `You can refer to Potato by using: potato, salad`
    }
);