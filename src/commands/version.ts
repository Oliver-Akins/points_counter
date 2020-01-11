//
// version.ts
//
// Written by: Tyler Akins (2019/11/23 - 2020/01/10)
//

import { REGISTER_COMMAND } from "../cmd_handler";
import { PERM, VERSION } from "../constants";


const VERSION_COMMAND = (context: msg_data, args: string[]): string => {
    return `Bot version: ${VERSION}`;
};


REGISTER_COMMAND({
    description: "Tells you the version of the bot you have.",
    executable: VERSION_COMMAND,
    requires_confirm: false,
    case_sensitive: false,
    name: "version",
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
        id: `version:1`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}version`,
            level: PERM.ALL
        },
        expected_return: `Bot version: ${VERSION}`
    }
);