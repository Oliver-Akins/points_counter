//
// alias_remove.ts
//
// Written by: Tyler Akins (2019/12/12 - 2020/01/31)
//


import { PERM, FLAG_INDICATOR } from "../constants";
import { RESOLVE_CHANNEL } from "../utils/metadata";
import { REGISTER_COMMAND } from "../cmd_handler";
import { LOAD, WRITE } from "../utils/db";



const ALIAS_REMOVE = (ctx: msg_data, args: string[]) => {

    let channel = RESOLVE_CHANNEL(ctx)

    let data = LOAD(channel);
    let target = args[0];

    // Find data
    for (var option of data) {
        if (option.aliases.includes(target)) {

            // Ensure not a hidden option
            if (!ctx.flags.includes("h") && option.hidden) { continue; };

            // Ensure not removing last alias
            if (option.aliases.length - 1 < 1) {
                return `Cannot remove the last aliases from an option.`;
            };

            // Remove alias
            option.aliases.splice(option.aliases.indexOf(target));
            WRITE(channel, data);
            return `Removed alias \`${target}\` from option ${option.name}`;
        };
    };

    return `Could not find an option with alias \`${target}\``;
};



REGISTER_COMMAND({
    description: "Removes the given alias from the option that contains it. This cannot remove the last alias from an option.",
    requires_confirm: false,
    case_sensitive: false,
    executable: ALIAS_REMOVE,
    opt_args: 0,
    args: [
        "<Alias: String>"
    ],
    group: "alias",
    name: "remove",
    level: PERM.MOD,
    arg_info: [
        "The alias to remove from whatever option has it. This cannot remove the last alias from an option."
    ],
    flags: {
        "h": "Allows removing aliases from hidden options"
    }
});



//---------------------------------------------------------------------------//
// Tests:


import { PREFIX, tests } from "../utils/tests";


tests.push(
    {
        id: `alias_remove:01`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}alias remove foo`,
            level: PERM.MOD
        },
        expected_return: `Cannot remove the last aliases from an option.`
    },
    {
        id: `alias_remove:02`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}alias remove salad`,
            level: PERM.MOD
        },
        expected_return: `Removed alias \`salad\` from option Potato`
    },
    {
        id: `alias_remove:03`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}alias remove spam`,
            level: PERM.MOD
        },
        expected_return: `Could not find an option with alias \`spam\``
    },
    {
        id: `alias_remove:04`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}alias remove option3`,
            level: PERM.MOD
        },
        expected_return: `Could not find an option with alias \`option3\``
    },
    {
        id: `alias_remove:05`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${PREFIX}alias remove option3.1 ${FLAG_INDICATOR}h`,
            level: PERM.MOD
        },
        expected_return: `Removed alias \`option3.1\` from option Option3`
    }
);