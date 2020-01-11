//
// source.ts
//
// Written by: Tyler Akins (2019/12/29)
//


import { REGISTER_COMMAND } from "../cmd_handler";
import { PERM, REPO } from "../constants";


const SOURCE = (ctx: msg_data, args: string[]): string => {
    switch (ctx.source) {
        case "Discord":
            return `The source code for the bot is available at: <${REPO}>`;
        default:
            return `The source code for the bot is available at: ${REPO}`;
    };
};


REGISTER_COMMAND({
    description: "Sends you the link to the source code.",
    executable: SOURCE,
    requires_confirm: false,
    case_sensitive: false,
    name: "source",
    opt_args: 0,
    args: [],
    level: PERM.ALL,
    arg_info: []
});


//---------------------------------------------------------------------------//
// Tests:

import { PREFIX, tests } from "../utils/tests";

tests.push(
    {
        id: `source:1`,
        links: {},
        datafile_should_exist: `IGNORES`,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}source`,
            level: PERM.ALL
        },
        expected_return: `The source code for the bot is available at: ${REPO}`
    },
    {
        id: `source:2`,
        links: {},
        datafile_should_exist: `IGNORES`,
        msg_meta: {
            source: `Discord`,
            message: `${PREFIX}source`,
            level: PERM.ADMIN
        },
        expected_return: `The source code for the bot is available at: <${REPO}>`
    }
);