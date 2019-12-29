//
// admin_unlink.ts
//
// Written by: Tyler Akins (2019/12/13 - 2019/12/23)
//


import { LOAD_LINKS, UPDATE_LINKS } from "../utils/links";
import { REGISTER_COMMAND } from "../cmd_handler";
import { PERM } from "../constants";


const ADMIN_UNLINK = (ctx: msg_data, args: string[]): string => {

    let data = LOAD_LINKS();
    delete data[args[0]];
    UPDATE_LINKS(data);

    return `Removed the link for channel \`${args[0]}\`.`;
};


const metadata: cmd_metadata = {
    description: "This command unlinks the channel from whatever it is linking to. The argument to this must be the response from the 'admin get channel' command of the channel you would like to unlink.",
    requires_confirm: false,
    case_sensitive: true,
    executable: ADMIN_UNLINK,
    opt_args: 0,
    args: [
        "<Channel: Channel>"
    ],
    group: "admin",
    name: "unlink",
    level: PERM.ADMIN,
    arg_info: [
        "The symlink to delete."
    ]
};
REGISTER_COMMAND(metadata);