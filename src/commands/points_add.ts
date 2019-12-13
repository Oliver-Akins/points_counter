//
// points_add.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/11/29)
//


import { REGISTER_COMMAND } from "../cmd_handler";
import { LOAD, WRITE } from "../utils/db";
import { PERM } from "../constants";



const POINTS_ADD_COMMAND = (ctx: msg_data, args: string[]): string => {
    ctx.channel = ctx.channel.replace(/\#/, "").replace(" ", "_");

    let data = LOAD(ctx.channel);

    let amount: number = parseInt(args[0]);
    if (!amount) { return `Cannot convert "${args[0]}" into an integer.`; };

    let target = args[1];
    let user = args[2] || "%anonymous%";


    for (var option of data) {
        if (option.aliases.includes(target.toLowerCase())) {

            // Ensure user is defined before trying to add to undefined
            if (option.points[user]) {
                option.points[user] += amount;
            } else {
                option.points[user] = amount;
            };
            option.total += amount;

            WRITE(ctx.channel, data);
            return `${amount} points have been added to ${option.name} on behalf of ${user}.`;
        };
    };
    return `Could not find an option of name \`${target}\``
};



const metadata: cmd_metadata = {
    description: "Adds an option to the channel's point system.",
    requires_confirm: false,
    case_sensitive: false,
    executable: POINTS_ADD_COMMAND,
    opt_args: 1,
    args: [
        "<Amount: Integer>",
        "<Option: String>",
        "[User: String]"
    ],
    group: "points",
    name: "add",
    level: PERM.MOD
};
REGISTER_COMMAND(metadata);