//
// help.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/11/23 - 2019/12/23)
//


import { REGISTER_COMMAND } from "../cmd_handler";
import { LOAD_CONFIG } from "../utils/Config";
import { PERM } from "../constants";


const config: config = LOAD_CONFIG();


const HELP_COMMAND = (ctx: msg_data, args: string[]): string => {

    let response = `Help page: ${config.WEBSITE}`;

    if (args.length !== 0) {
        response += `/command/${args.join("_")}`;
    };
    return response;
};


const metadata: cmd_metadata = {
    description: "Takes you to the help page for the bot or a specific command.",
    executable: HELP_COMMAND,
    requires_confirm: false,
    case_sensitive: false,
    name: "help",
    opt_args: 1,
    args: [
        "[Command: String]"
    ],
    level: PERM.ALL,
    arg_info: [
        "The command you are wanting help with."
    ]
};
REGISTER_COMMAND(metadata)