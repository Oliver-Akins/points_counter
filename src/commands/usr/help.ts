//
// help.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/11/23)
//

import { REGISTER_COMMAND } from "../../cmd_handler";
import { LOAD_CONFIG } from "../../utils/Config";
import { PERM } from "../../constants";


const HELP_COMMAND = (context: msg_data, args: string[]): string|void => {
    let config: config = LOAD_CONFIG();

    let response = `Help page: ${config.WEBSITE}`;

    if (args.length !== 0) {
        response += `/command/${args[0]}`;
    };
    return response;
};


const metadata: cmd_metadata = {
    description: "Takes you to the help page for the bot or a specific command.",
    executable: HELP_COMMAND,
    requires_confirm: false,
    case_sensitive: false,
    name: "help",
    opt_args: 0,
    args: [],
    level: PERM.ALL
};
REGISTER_COMMAND(metadata)