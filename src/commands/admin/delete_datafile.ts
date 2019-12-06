//
// delete_datafile.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/12/06)
//


import { REGISTER_COMMAND, confirms } from "../../cmd_handler";
import { Confirmation } from "../../utils/Command";
import { LOAD_CONFIG } from "../../utils/Config";
import { DELETE } from "../../utils/db";
import { PERM } from "../../constants";



const CONFIRM_TIMEOUT_SECONDS = 5;




const DELETE_DATAFILE = (ctx: msg_data, args: string[]): string => {


    confirms.push(new Confirmation(
        ctx.user,
        ctx.channel,
        CONFIRM_TIMEOUT_SECONDS * 1000,
        DELETE_DATAFILE_CONFIRM,
        ctx.channel.replace(/#/g, "").replace(/ /g, "_")
    ));


    let PRE: string = LOAD_CONFIG().bot.PREFIX;

    return `Please confirm that you would like to delete all data for channel ` +
    `"${ctx.channel.replace(/#/g, "").replace(/ /g, "_")}". Type \`${PRE}yes\`` +
    ` or \`${PRE}no\` in the next ${CONFIRM_TIMEOUT_SECONDS} seconds.`
};




const DELETE_DATAFILE_CONFIRM = (type: CONFIRM_TYPE, data: string): string => {

    // Check what type of confirmation we received
    switch (type) {

        case "deny":
            return `Did not delete data for channel: ${data}`


        case "confirm":

            // Attempt to delete the data file
            switch (DELETE(data)) {

                // Success
                case "DELETED":
                    return `Data deleted for channel: ${data}`;

                // Sadness
                case "ERROR":
                    return `Something went wrong while deleting data for channel ${data}.`;

                // Meh
                case "NOT_EXIST":
                    return `Cannot delete data for channel "${data} because it doesn't exist.`;

                // Oh shit. This shouldn't happen
                default:
                    return `Something very very bad happened. I don't know what though.`
            };


        // Let the confirm type fall through
        default:
            return null;

    };
};



const metadata: cmd_metadata = {
    description: "Deletes the data for the current channel. Does not follow symlinks.",
    requires_confirm: false,
    case_sensitive: false,
    executable: DELETE_DATAFILE,
    opt_args: 0,
    args: [],
    group: "data",
    name: "delete",
    level: PERM.ADMIN
};
REGISTER_COMMAND(metadata);