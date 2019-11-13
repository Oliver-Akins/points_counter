//
// init_datafile.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/11/11 - 2019/11/12)
//


import { REGISTER_COMMAND } from "../../cmd_handler";
import { CREATE } from "../../utils/db";
import { perm } from "../../constants";


const INIT_DATAFILE = (ctx: msg_data, args: string[]): string|void => {
    let success = CREATE(ctx.channel.split(":")[0]);

    if (success) {
        return `Created data file for channel: \`${ctx.channel}\``
    } else {
        return `Could not create data file for channel: \`${ctx.channel}\``
    };
};


const metadata: cmd_metadata = {
    description: "Initializes a data file for the channel the command is ran in.",
    case_sensitive: false,
    executable: INIT_DATAFILE,
    opt_args: 0,
    args: [],
    syntax: "{pre}admin init",
    group: "admin",
    name: "init",
    level: perm.admin
};
REGISTER_COMMAND(metadata)