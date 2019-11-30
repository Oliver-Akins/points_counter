//
// options_add.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/11/29)
//


import { REGISTER_COMMAND } from "../../cmd_handler";

// !options add <Name: string>
const OPTIONS_ADD_COMMAND = (metadata: msg_data, args: string[]): string|void => {};



const OPTIONS_ADD_CONFIRMATION = (type: CONFIRM_TYPE, data: string): string|void => {}



const metadata: cmd_metadata = {
    description: "Adds an option to the channel's point system.",
    requires_confirm: false,
    case_sensitive: true,
    executable: OPTIONS_ADD_COMMAND,
    opt_args: 0,
    args: [
        ""
    ],
    group: null,
    name: "",
    level: 0
};
REGISTER_COMMAND(metadata);