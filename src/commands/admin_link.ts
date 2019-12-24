//
// admin_link.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/12/13 - 2019/12/23)
//


import { LOAD_LINKS, UPDATE_LINKS } from "../utils/links";
import { REGISTER_COMMAND } from "../cmd_handler";
import { PERM } from "../constants";


const ADMIN_LINK = (ctx: msg_data, args: string[]): string => {

    let data = LOAD_LINKS();
    data[args[0]] = args[1];
    UPDATE_LINKS(data);

    return `Linked channel \`${args[0]}\` to \`${args[1]}\``;
};


const metadata: cmd_metadata = {
    description: "This command links two channels together for the purposes of sharing data files across channels, or even services. The arguments given to this command must be the resolved channels from the 'admin get channel' command.",
    requires_confirm: false,
    case_sensitive: true,
    executable: ADMIN_LINK,
    opt_args: 0,
    args: [
        "<Channel: Channel>",
        "<Target_Channel: Channel>"
    ],
    group: "admin",
    name: "link",
    level: PERM.ADMIN,
    arg_info: [
        "The symlink to create pointing at Target_Channel",
        "The channel that will be resolved to. This can either be another symlink or a direct channel."
    ]
};
REGISTER_COMMAND(metadata);