//
// admin_get_channel.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/12/13)
//


import { RESOLVE_CHANNEL } from "../utils/metadata";
import { REGISTER_COMMAND } from "../cmd_handler";
import { PERM } from "../constants";


const ADMIN_GET_CHANNEL = (ctx: msg_data): string => {
    return RESOLVE_CHANNEL(ctx, 0);
};


const metadata: cmd_metadata = {
    description: "Returns the resolved channel name for the channel being ran in, this is used for linking multiple channels together.",
    requires_confirm: false,
    case_sensitive: false,
    executable: ADMIN_GET_CHANNEL,
    opt_args: 0,
    args: [],
    group: "admin",
    name: "get channel",
    level: PERM.ADMIN
};
REGISTER_COMMAND(metadata);