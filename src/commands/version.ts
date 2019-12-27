//
// version.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/11/23 - 2019/12/23)
//

import { REGISTER_COMMAND } from "../cmd_handler";
import { PERM, VERSION } from "../constants";


const VERSION_COMMAND = (context: msg_data, args: string[]): string => {
    return `Bot version: ${VERSION}`;
};


const metadata: cmd_metadata = {
    description: "Tells you the version of the bot you have.",
    executable: VERSION_COMMAND,
    requires_confirm: false,
    case_sensitive: false,
    name: "version",
    opt_args: 0,
    args: [],
    level: PERM.ALL,
    arg_info: []
};
REGISTER_COMMAND(metadata)