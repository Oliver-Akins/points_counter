//
// ping.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/11/06 - 2019/11/12)
//

import { REGISTER_COMMAND, confirms } from "../../cmd_handler";
import { perm } from "../../constants";


const PING_COMMAND = (context: msg_data, args: string[]): string|void => {
    return "Pong!"
};


const ping_metadata: cmd_metadata = {
    description: "Allows you to test to make sure the bot is online",
    executable: PING_COMMAND,
    requires_confirm: false,
    case_sensitive: false,
    syntax: "{pre}ping",
    name: "ping",
    opt_args: 0,
    args: [],
    level: perm.all
};
REGISTER_COMMAND(ping_metadata)