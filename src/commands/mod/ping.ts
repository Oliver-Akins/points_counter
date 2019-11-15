//
// ping.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/11/06 - 2019/11/12)
//

import { REGISTER_COMMAND, confirms } from "../../cmd_handler";
import { perm } from "../../constants";
import { Confirmation } from "../../utils/Command";


const PING_COMMAND = (context: msg_data, args: string[]): string|void => {
    confirms.push(new Confirmation(
        context.user,
        context.channel,
        10,
        PING_CONFIRM_CALLBACK
    ));
    return "Please confirm your action by using `!yes` or `!no` in 10 seconds."
};


const PING_CONFIRM_CALLBACK = (type: CONFIRM_TYPE, args: string[]): string|void => {
    switch (type) {
        case "confirm": {
            return "Pong! (Confirmed)";
        };
        case "deny": {
            return "Pong! (Denied)";
        };
        case "expired": {
            return "Pong! (Expired)";
        }
        case "invalid": {
            return "Pong! (Invalid)"
        }
    };
}


const ping_metadata: cmd_metadata = {
    description: "Allows you to test to make sure the bot is online",
    executable: PING_COMMAND,
    requires_confirm: true,
    case_sensitive: false,
    syntax: "{pre}ping",
    name: "ping",
    opt_args: 0,
    args: [],
    level: perm.all
};
REGISTER_COMMAND(ping_metadata)