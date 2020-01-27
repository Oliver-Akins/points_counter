//
// admin_unlink.ts
//
// Written by: Tyler Akins (2019/12/13 - 2020/01/10)
//


import { LOAD_LINKS, UPDATE_LINKS } from "../utils/links";
import { PERM, TEST_CHANNEL } from "../constants";
import { REGISTER_COMMAND } from "../cmd_handler";


const ADMIN_UNLINK = (ctx: msg_data, args: string[]): string => {

    let data = LOAD_LINKS();
    delete data[args[0]];
    UPDATE_LINKS(data);

    return `Removed the link for channel \`${args[0]}\`.`;
};


REGISTER_COMMAND({
    description: "This command unlinks the channel from whatever it is linking to. The argument to this must be the response from the 'admin get channel' command of the channel you would like to unlink.",
    requires_confirm: false,
    case_sensitive: true,
    executable: ADMIN_UNLINK,
    opt_args: 0,
    args: [
        "<Channel: Channel>"
    ],
    group: "admin",
    name: "unlink",
    level: PERM.ADMIN,
    arg_info: [
        "The symlink to delete."
    ]
});



//---------------------------------------------------------------------------//
// Tests:


import { PREFIX, tests, SEND_INVALID_PERM } from "../utils/tests";


tests.push(
    {
        id: `admin_unlink:01`,
        links: {},
        datafile_should_exist: `IGNORES`,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}admin unlink Discord:${TEST_CHANNEL}`,
            level: PERM.ADMIN
        },
        expected_return: `Removed the link for channel \`Discord:${TEST_CHANNEL}\`.`
    },
    {
        id: `admin_unlink:02`,
        links: {},
        datafile_should_exist: `IGNORES`,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}admin unlink Discord:${TEST_CHANNEL}`,
            level: PERM.MOD
        },
        expected_return: (
            SEND_INVALID_PERM
            ? `Invalid Permissions, you must be at least level ${PERM.ADMIN}, you are level ${PERM.MOD}.`
            : null
        )
    },
    {
        id: `admin_unlink:03`,
        links: {},
        datafile_should_exist: `IGNORES`,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}admin unlink Discord:${TEST_CHANNEL}`,
            level: PERM.ALL
        },
        expected_return: (
            SEND_INVALID_PERM
            ? `Invalid Permissions, you must be at least level ${PERM.ADMIN}, you are level ${PERM.ALL}.`
            : null
        )
    },
);