//
// ping.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/11/06 - 2019/11/06)
//


import { REGISTER_COMMAND } from "../../cmd_handler";


const PING_COMMAND = (): string => {
    return "Pong!";
};


REGISTER_COMMAND({
    description: "Allows you to test to make sure the bot is online",
    executable: PING_COMMAND,
    arg_count: 0,
    case_sensitive: false,
    syntax: "{pre}ping",
    name: "ping",
    level: perms.mod
})