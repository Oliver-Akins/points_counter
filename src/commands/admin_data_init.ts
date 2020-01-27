//
// init_datafile.ts
//
// Written by: Tyler Akins (2019/11/11 - 2020/01/10)
//


import { RESOLVE_CHANNEL } from "../utils/metadata";
import { PERM, TEST_CHANNEL } from "../constants";
import { REGISTER_COMMAND } from "../cmd_handler";
import { CREATE } from "../utils/db";



const INIT_DATAFILE = (ctx: msg_data, args: string[]): string => {
    let channel = RESOLVE_CHANNEL(ctx, 0);


    switch (CREATE(channel)) {
        case "SUCCESS":
            return `Created data file for channel: \`${channel}\``;
        case "EXISTS":
            return `A datafile for a channel with name \`${channel}\` already exists.`;
        case "ERROR":
            return `Something went wrong while creating datafile with name: \`${channel}\``;
        default:
            return "Something unknown happened. Open an issue with error code: 00001";
    };
};



REGISTER_COMMAND({
    description: "Initializes a data file for the channel the command is ran in.",
    executable: INIT_DATAFILE,
    requires_confirm: false,
    case_sensitive: false,
    opt_args: 0,
    args: [],
    group: "admin",
    name: "data init",
    level: PERM.ADMIN,
    arg_info: []
});



//---------------------------------------------------------------------------//
// Tests:


import { PREFIX, tests, SEND_INVALID_PERM } from "../utils/tests";



tests.push(
    {
        id: `data_init:001`,
        links: {},
        datafile_should_exist: `NOT_EXISTS`,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}admin data init`,
            level: PERM.MOD,
            channel: TEST_CHANNEL
        },
        expected_return: (
            SEND_INVALID_PERM
            ? `Invalid Permissions, you must be at least level ${PERM.ADMIN}, you are level ${PERM.MOD}.`
            : null
        )
    },
    {
        id: `data_init:002`,
        links: {},
        datafile_should_exist: `NOT_EXISTS`,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}admin data init`,
            level: PERM.ADMIN
        },
        expected_return: `Created data file for channel: \`${TEST_CHANNEL}\``
    },
    {
        id: `data_init:003`,
        links: {},
        datafile_should_exist: `EXISTS`,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}admin data init`,
            level: PERM.ADMIN
        },
        expected_return: `A datafile for a channel with name \`${TEST_CHANNEL}\` already exists.`
    },
    {
        id: `00008`,
        links: {},
        datafile_should_exist: `EXISTS`,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}admin data init`,
            level: PERM.ADMIN
        },
        expected_return: `A datafile for a channel with name \`${TEST_CHANNEL}\` already exists.`
    }
)