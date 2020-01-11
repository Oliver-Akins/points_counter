//
// points_add.ts
//
// Written by: Tyler Akins (2019/11/29 - 2020/01/10)
//


import { PERM, FLAG_INDICATOR } from "../constants";
import { RESOLVE_CHANNEL } from "../utils/metadata";
import { REGISTER_COMMAND } from "../cmd_handler";
import { LOAD, WRITE } from "../utils/db";



const POINTS_ADD_COMMAND = (ctx: msg_data, args: string[]): string => {
    let channel = RESOLVE_CHANNEL(ctx);
    let data = LOAD(channel);


    let amount: number = parseInt(args[1]);
    if (!amount) { return `Cannot convert \`${args[1]}\` into an integer.`; };

    if (amount <= 0) {
        return `Cannot add a negative point value! Use the point remove command to subtract points.`;
    };


    let target = args[0];
    let user: string = args[2] || "%anonymous%";


    // Ensure username doesn't start with an "@"
    if (user.startsWith("@")) { user = user.slice(1); };


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


            // Silence the message if the option is hidden
            if (option.hidden && !ctx.flags.includes("L")) {
                return null;
            };

            return `${amount} points have been added to ${option.name} on behalf of ${user}.`;
        };
    };
    return `Could not find an option of name \`${target}\`.`;
};



REGISTER_COMMAND({
    description: "Adds an option to the channel's point system.",
    requires_confirm: false,
    case_sensitive: false,
    executable: POINTS_ADD_COMMAND,
    opt_args: 1,
    args: [
        "<Option: String>",
        "<Amount: Integer>",
        "[User: String]"
    ],
    group: "points",
    name: "add",
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
        id: `point_add:1`,
        links: {},
        datafile_should_exist: `IGNORES`,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}points add potato 10 spam`,
            level: PERM.ALL
        },
        expected_return: (
            SEND_INVALID_PERM
            ? `Invalid Permissions, you must be at least level ${PERM.MOD}, you are level ${PERM.ALL}.`
            : null
        )
    },
    {
        id: `point_add:2`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}points add salad 10 alkali`,
            level: PERM.MOD
        },
        expected_return: `10 points have been added to Potato on behalf of alkali.`
    },
    {
        id: `point_add:3`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}points add spam 10`,
            level: PERM.MOD
        },
        expected_return: `Could not find an option of name \`spam\`.`
    },
    {
        id: `point_add:4`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}points add potato 10`,
            level: PERM.MOD
        },
        expected_return: `10 points have been added to Potato on behalf of %anonymous%.`
    },
    {
        id: `point_add:5`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}points add potato -5`,
            level: PERM.MOD
        },
        expected_return: `Cannot add a negative point value! Use the point remove command to subtract points.`
    },
    {
        id: `point_add:6`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}points add option3 5`,
            level: PERM.MOD
        },
        expected_return: null
    },
    {
        id: `point_add:7`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}points add option3 5 ${FLAG_INDICATOR}L alkali`,
            level: PERM.MOD
        },
        expected_return: `5 points have been added to Option3 on behalf of alkali.`
    },
    {
        id: `point_add:8`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}points add spam potato`,
            level: PERM.MOD
        },
        expected_return: `Cannot convert \`potato\` into an integer.`
    },
    {
        id: `point_add:9`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}points add potato 10 @spam`,
            level: PERM.MOD
        },
        expected_return: `10 points have been added to Potato on behalf of spam.`
    }
);