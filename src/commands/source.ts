//
// source.ts
//
// Written by: Tyler Akins (2019/12/29)
//


import { REGISTER_COMMAND } from "../cmd_handler";
import { PERM, REPO } from "../constants";


const SOURCE = (ctx: msg_data, args: string[]): string => {
    switch (ctx.source) {
        case "Discord":
            return `The source code for the bot is available at: <${REPO}>`;
        default:
            return `The source code for the bot is available at: ${REPO}`;
    };
};


const metadata: cmd_metadata = {
    description: "Sends you the link to the source code.",
    executable: SOURCE,
    requires_confirm: false,
    case_sensitive: false,
    name: "source",
    opt_args: 0,
    args: [],
    level: PERM.ALL,
    arg_info: []
};
REGISTER_COMMAND(metadata)