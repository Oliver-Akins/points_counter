//
// options_add.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/11/29 - 2019/12/23)
//


import { RESOLVE_CHANNEL } from "../utils/metadata";
import { REGISTER_COMMAND } from "../cmd_handler";
import { LOAD, WRITE } from "../utils/db";
import { PERM } from "../constants";



const OPTIONS_ADD_COMMAND = (ctx: msg_data, args: string[]): string => {

    let channel = RESOLVE_CHANNEL(ctx);
    let data = LOAD(channel);
    let name = args[0];

    for (var option of data) {
        if (option.aliases.includes(name.toLowerCase())) {
            return `An option already exists with name: \`${name}\``;
        };
    };

    data.push({
        "aliases": [name.toLowerCase()],
        "name": name,
        "points": {
            "%anonymous%": 0
        },
        "total": 0,
        "data_version": "3.0"
    });

    WRITE(channel, data);

    return `Option created with name: \`${name}\``;
};



const metadata: cmd_metadata = {
    description: "Adds an option to the channel's point system.",
    requires_confirm: false,
    case_sensitive: true,
    executable: OPTIONS_ADD_COMMAND,
    opt_args: 0,
    args: [
        "<Name: string>"
    ],
    group: "options",
    name: "add",
    level: PERM.MOD,
    arg_info: []
};
REGISTER_COMMAND(metadata);