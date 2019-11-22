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
    let channel = ctx.channel.replace(/\#/, "");
    channel = channel.replace(" ", "_");


    switch (CREATE(channel)) {
        case "SUCCESS":
            return `Created data file for channel: ${channel}`;
        case "EXISTS":
            return `A datafile for a channel with name "${channel}" already exists.`;
        case "ERROR":
            return `Something went wrong while creating datafile with name: "${channel}"`;
    };
};



const metadata: cmd_metadata = {
    description: "Initializes a data file for the channel the command is ran in.",
    executable: INIT_DATAFILE,
    requires_confirm: false,
    case_sensitive: false,
    opt_args: 0,
    args: [],
    syntax: "{pre}admin init",
    group: "admin",
    name: "init",
    level: perm.admin
};
REGISTER_COMMAND(metadata)