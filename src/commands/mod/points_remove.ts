//
// points_remove.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/12/06)
//


import { REGISTER_COMMAND } from "../../cmd_handler";
import { LOAD, WRITE } from "../../utils/db";
import { PERM } from "../../constants";


const POINTS_REMOVE = (ctx: msg_data, args: string[]): string => {
    let channel = ctx.channel.replace(/\#/, "").replace(" ", "_");
    let data = LOAD(channel);


    let amount: number = parseInt(args[0]);
    if (!amount) { return `Cannot convert "${args[0]}" into an integer.`; };

    let target = args[1];
    let user: string = args[2] || "%anonymous%";


    for (var option of data) {

        if (option.aliases.includes(target.toLowerCase())) {

            // Ensure user is defined before trying to add to undefined
            if (option.points[user]) {

                // Unset user if points removed > total points given
                if (option.points[user] - amount <= 0) {
                    option.points[user] = 0;
                } else {
                    option.points[user] -= amount;
                };
            }

            // User isn't defined.
            else {
                return `${user} has not contributed any points to ${option.name}`;
            };


            option.total -= amount;

            WRITE(channel, data);
            return `${amount} points have been removed to ${option.name} on behalf of ${user}.`;
        };
    };
    return `Could not find an option of name \`${target}\``
};



const metadata: cmd_metadata = {
    description: "Removes points from a specified option, will not bring the total negative.",
    requires_confirm: false,
    case_sensitive: false,
    executable: POINTS_REMOVE,
    opt_args: 1,
    args: [
        "<Amount: Integer>",
        "<Option: String>",
        "[User: String]"
    ],
    group: "points",
    name: "remove",
    level: PERM.MOD
};
REGISTER_COMMAND(metadata);