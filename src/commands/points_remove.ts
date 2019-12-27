//
// points_remove.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/12/06 - 2019/12/23)
//


import { RESOLVE_CHANNEL } from "../utils/metadata";
import { REGISTER_COMMAND } from "../cmd_handler";
import { LOAD, WRITE } from "../utils/db";
import { PERM } from "../constants";


const POINTS_REMOVE = (ctx: msg_data, args: string[]): string => {
    let channel = RESOLVE_CHANNEL(ctx);
    let data = LOAD(channel);


    let amount: number = parseInt(args[1]);
    if (!amount) { return `Cannot convert \`${args[1]}\` into an integer.`; };

    let target = args[0];
    let user: string = args[2] || "%anonymous%";


    // Ensure username doesn't start with an "@"
    if (user.startsWith("@")) { user = user.slice(1); };


    for (var option of data) {

        if (option.aliases.includes(target.toLowerCase())) {

            // Ensure user is defined before trying to add to undefined
            if (option.points[user]) {


                if (option.points[user] - amount < 0) {

                    // Adjust to make sure that we can't go negative with amount
                    // values larger than what the user has donated
                    amount -= option.points[user] - (amount - option.points[user])
                    option.points[user] = 0;
                } else {
                    option.points[user] -= amount;
                };
            }

            // User isn't defined.
            else {
                return `${user} has not contributed any points to ${option.name}.`;
            };

            option.total -= amount;
            WRITE(channel, data);
            return `${amount} points have been removed from ${option.name} on behalf of ${user}.`;
        };
    };
    return `Could not find an option of name \`${target}\`.`
};



const metadata: cmd_metadata = {
    description: "Removes points from a specified option, will not bring the total negative.",
    requires_confirm: false,
    case_sensitive: false,
    executable: POINTS_REMOVE,
    opt_args: 1,
    args: [
        "<Alias: String>",
        "<Amount: Integer>",
        "[User: String]"
    ],
    group: "points",
    name: "remove",
    level: PERM.MOD,
    arg_info: [
        "The option to add the points to.",
        "The number of points to add to the option.",
        "The user who donated the bits to the user, this defaults to '%anonymous%' if not specified."
    ]
};
REGISTER_COMMAND(metadata);