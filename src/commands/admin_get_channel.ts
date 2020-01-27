//
// admin_get_channel.ts
//
// Written by: Tyler Akins (2019/12/13 - 2020/01/10)
//


import { RESOLVE_CHANNEL } from "../utils/metadata";
import { REGISTER_COMMAND } from "../cmd_handler";
import { PERM, TEST_CHANNEL } from "../constants";


const ADMIN_GET_CHANNEL = (ctx: msg_data): string => {
    return RESOLVE_CHANNEL(ctx, 0);
};


REGISTER_COMMAND({
    description: "Returns the resolved channel name for the channel being ran in, this is used for linking multiple channels together.",
    requires_confirm: false,
    case_sensitive: false,
    executable: ADMIN_GET_CHANNEL,
    opt_args: 0,
    args: [],
    group: "admin",
    name: "get channel",
    level: PERM.ADMIN,
    arg_info: []
});



//---------------------------------------------------------------------------//
// Tests:


import { PREFIX, tests, SEND_INVALID_PERM } from "../utils/tests";


tests.push(
    {
        id: `get_channel:01`,
        links: {},
        datafile_should_exist: `IGNORES`,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}admin get channel`,
            level: PERM.ADMIN
        },
        expected_return: TEST_CHANNEL
    },
    {
        id: `get_channel:02`,
        links: {},
        datafile_should_exist: `IGNORES`,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}admin get channel`,
            level: PERM.MOD
        },
        expected_return: (
            SEND_INVALID_PERM
            ? `Invalid Permissions, you must be at least level ${PERM.ADMIN}, you are level ${PERM.MOD}.`
            : null
        )
    },
    {
        id: `get_channel:03`,
        links: {},
        datafile_should_exist: `IGNORES`,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}admin get channel`,
            level: PERM.ALL
        },
        expected_return: (
            SEND_INVALID_PERM
            ? `Invalid Permissions, you must be at least level ${PERM.ADMIN}, you are level ${PERM.ALL}.`
            : null
        )
    }
);