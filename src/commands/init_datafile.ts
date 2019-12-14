//
// init_datafile.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/11/11 - 2019/11/23)
//


import { REGISTER_COMMAND } from "../cmd_handler";
import { CREATE } from "../utils/db";
import { PERM } from "../constants";



const INIT_DATAFILE = (ctx: msg_data, args: string[]): string => {
    let channel = ctx.channel.replace(/\#/, "");
    channel = channel.replace(" ", "_");


    switch (CREATE(channel)) {
        case "SUCCESS":
            return `Created data file for channel: ${channel}`;
        case "EXISTS":
            return `A datafile for a channel with name "${channel}" already exists.`;
        case "ERROR":
            return `Something went wrong while creating datafile with name: "${channel}"`;
        default:
            return "Something unknown happened. Open an issue with error code: 00001"'
    };
};



const metadata: cmd_metadata = {
    description: "Initializes a data file for the channel the command is ran in.",
    executable: INIT_DATAFILE,
    requires_confirm: false,
    case_sensitive: false,
    opt_args: 0,
    args: [],
    group: "data",
    name: "init",
    level: PERM.ADMIN
};
REGISTER_COMMAND(metadata)