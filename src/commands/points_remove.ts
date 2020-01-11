//
// points_remove.ts
//
// Written by: Tyler Akins (2019/12/06 - 2020/01/10)
//


import { RESOLVE_CHANNEL } from "../utils/metadata";
import { PERM, FLAG_INDICATOR } from "../constants";
import { REGISTER_COMMAND } from "../cmd_handler";
import { LOAD, WRITE } from "../utils/db";


const POINTS_REMOVE = (ctx: msg_data, args: string[]): string => {
    let channel = RESOLVE_CHANNEL(ctx);
    let data = LOAD(channel);


    let amount: number = parseInt(args[1]);
    if (!amount) { return `Cannot convert \`${args[1]}\` into an integer.`; };

    if (amount <= 0) {
        return `Cannot remove 0 or fewer points. Try again with a positive integer.`
    };

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


            // Silence the message if the option is hidden
            if (option.hidden && !ctx.flags.includes("L")) {
                return `Could not find an option of name \`${target}\`.`;
            };


            return `${amount} points have been removed from ${option.name} on behalf of ${user}.`;
        };
    };
    return `Could not find an option of name \`${target}\`.`
};



REGISTER_COMMAND({
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
        "The number of points to add to the option. This must be a positive integer.",
        "The user who donated the bits to the user, this defaults to '%anonymous%' if not specified."
    ]
});


//---------------------------------------------------------------------------//
// Tests:

import { PREFIX, tests, SEND_INVALID_PERM } from "../utils/tests";


tests.push(
    {
        id: `point_remove:1`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}points remove potato 10`,
            level: PERM.ALL
        },
        expected_return: (
            SEND_INVALID_PERM
            ? `Invalid Permissions, you must be at least level ${PERM.MOD}, you are level ${PERM.ALL}.`
            : null
        )
    },
    {
        id: `point_remove:2`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}points remove foo 5`,
            level: PERM.MOD
        },
        expected_return: `5 points have been removed from Foo on behalf of %anonymous%.`
    },
    {
        id: `point_remove:3`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}points remove foo 5 alkali`,
            level: PERM.MOD
        },
        expected_return: `alkali has not contributed any points to Foo.`
    },
    {
        id: `point_remove:4`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}points remove spam 5`,
            level: PERM.MOD
        },
        expected_return: `Could not find an option of name \`spam\`.`
    },
    {
        id: `point_remove:5`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}points remove spam potato`,
            level: PERM.MOD
        },
        expected_return: `Cannot convert \`potato\` into an integer.`
    },
    {
        id: `point_remove:6`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}points remove option3 5`,
            level: PERM.MOD
        },
        expected_return: `Could not find an option of name \`option3\`.`
    },
    {
        id: `point_remove:7`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}points remove option3 5 ${FLAG_INDICATOR}L`,
            level: PERM.MOD
        },
        expected_return: `5 points have been removed from Option3 on behalf of %anonymous%.`
    },
    {
        id: `point_remove:8`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}points remove option3 -5 ${FLAG_INDICATOR}L`,
            level: PERM.MOD
        },
        expected_return: `Cannot remove 0 or fewer points. Try again with a positive integer.`
    },
    {
        id: `point_remove:9`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}points remove foo 5 @spam`,
            level: PERM.MOD
        },
        expected_return: `5 points have been removed from Foo on behalf of spam.`
    }
);