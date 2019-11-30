//
// version.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/11/23)
//

import { REGISTER_COMMAND } from "../../cmd_handler";
import { LOAD_CONFIG } from "../../utils/Config";
import { PERM } from "../../constants";


const VERSION_COMMAND = (context: msg_data, args: string[]): string => {
    let config: config = LOAD_CONFIG();
    return `Bot version: ${config.bot.VERSION}`;
};


const metadata: cmd_metadata = {
    description: "Tells you the version of the bot you have.",
    executable: VERSION_COMMAND,
    requires_confirm: false,
    case_sensitive: false,
    name: "version",
    opt_args: 0,
    args: [],
    level: PERM.ALL
};
REGISTER_COMMAND(metadata)