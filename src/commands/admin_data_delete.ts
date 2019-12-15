//
// delete_datafile.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/12/06 - 2019/12/15)
//


import { REGISTER_COMMAND, confirms } from "../cmd_handler";
import { PERM, CONFIRM_TIMEOUT } from "../constants";
import { RESOLVE_CHANNEL } from "../utils/metadata";
import { Confirmation } from "../utils/Command";
import { LOAD_CONFIG } from "../utils/Config";
import { DELETE } from "../utils/db";



const DELETE_DATAFILE = (ctx: msg_data, args: string[]): string => {


    // Resolve the channel without following any symlinks
    let channel = RESOLVE_CHANNEL(ctx, 0);


    confirms.push(new Confirmation(
        ctx.user,
        ctx.channel,
        CONFIRM_TIMEOUT * 1000,
        DELETE_DATAFILE_CONFIRM,
        channel
    ));


    const PRE: string = LOAD_CONFIG().bot.PREFIX;

    return `Please confirm that you would like to delete all data for channel ` +
    `\`${channel}\`. Type \`${PRE}yes\` or \`${PRE}no\` in the next` +
    ` ${CONFIRM_TIMEOUT} seconds.`
};




const DELETE_DATAFILE_CONFIRM = (type: CONFIRM_TYPE, data: string): string => {

    // Check what type of confirmation we received
    switch (type) {

        case "deny":
            return `Did not delete data for channel: \`${data}\``


        case "confirm":

            // Attempt to delete the data file
            switch (DELETE(data)) {

                // Success
                case "DELETED":
                    return `Data deleted for channel: \`${data}\``;

                // Sadness
                case "ERROR":
                    return `Something went wrong while deleting data for channel \`${data}\`.`;

                // Meh
                case "NOT_EXIST":
                    return `Cannot delete data for channel \`${data}\` because it doesn't exist.`;

                // Oh shit. This shouldn't happen
                default:
                    return `Something very very bad happened. Open an issue with error code: 00002`;
            };


        // Let the confirm type fall through
        default:
            return null;

    };
};



const metadata: cmd_metadata = {
    description: "Deletes the data for the current channel. Does not follow symlinks to other channel files.",
    requires_confirm: true,
    case_sensitive: false,
    executable: DELETE_DATAFILE,
    opt_args: 0,
    args: [],
    group: "admin",
    name: "data delete",
    level: PERM.ADMIN
};
REGISTER_COMMAND(metadata);