//
// help.ts
//
// Written by: Tyler Akins (2019/11/23 - 2020/01/31)
//


import { REGISTER_COMMAND } from "../cmd_handler";
import { LOAD_CONFIG } from "../utils/Config";
import { PERM } from "../constants";


const config: config = LOAD_CONFIG();


const HELP_COMMAND = (ctx: msg_data, args: string[]): string => {

    let response = `Help page: ${config.WEBSITE}`;

    if (args.length !== 0) {
        response += `/command/${args.join("_")}`;
    };
    return response;
};


REGISTER_COMMAND({
    description: "Takes you to the help page for the bot or a specific command.",
    executable: HELP_COMMAND,
    requires_confirm: false,
    case_sensitive: false,
    name: "help",
    opt_args: 1,
    args: [
        "[Command: String]"
    ],
    level: PERM.ALL,
    arg_info: [
        "The command you are wanting help with."
    ],
    flags: {}
});



//---------------------------------------------------------------------------//
// Tests:

import { tests } from "../utils/tests";


tests.push(
    {
        id: `help:1`,
        links: {},
        datafile_should_exist: `IGNORES`,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}help`,
            level: PERM.ALL
        },
        expected_return: `Help page: ${config.WEBSITE}`
    },
    {
        id: `help:2`,
        links: {},
        datafile_should_exist: `IGNORES`,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}help points add`,
            level: PERM.ALL
        },
        expected_return: `Help page: ${config.WEBSITE}/command/points_add`
    },
    {
        id: `help:3`,
        links: {},
        datafile_should_exist: `IGNORES`,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}help points_remove`,
            level: PERM.ALL
        },
        expected_return: `Help page: ${config.WEBSITE}/command/points_remove`
    },
);