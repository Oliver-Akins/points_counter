//
// tests.ts
//
// Written by: Tyler Akins (2019/11/17 - 2019/12/29)
//


import { PERM, VERSION, TEST_CHANNEL, REPO } from "../constants";
import { LOAD_CONFIG } from "./Config";


const config: config = LOAD_CONFIG();
const INV_PERM = config.bot.INVALID_PERM_ERROR;



export const tests: test[] = [
    {
        id: `00001`,
        links: {},
        datafile_should_exist: `IGNORES`,
        msg_meta: {
            source: `Twitch`,
            message: `potato salad`,
            level: PERM.ALL,
            channel: TEST_CHANNEL
        },
        expected_return: null
    },
    {
        id: `00005`,
        links: {},
        datafile_should_exist: `NOT_EXISTS`,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}admin data init`,
            level: PERM.MOD,
            channel: TEST_CHANNEL
        },
        expected_return: INV_PERM ? `Invalid Permissions, you must be at least level ${PERM.ADMIN}, you are level ${PERM.MOD}.` : null
    },
    {
        id: `00006`,
        links: {},
        datafile_should_exist: `NOT_EXISTS`,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}admin data init`,
            level: PERM.ADMIN,
            channel: TEST_CHANNEL
        },
        expected_return: `Created data file for channel: \`${TEST_CHANNEL}\``
    },
    {
        id: `00007`,
        links: {},
        datafile_should_exist: `EXISTS`,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}admin data init`,
            level: PERM.ADMIN,
            channel: TEST_CHANNEL
        },
        expected_return: `A datafile for a channel with name \`${TEST_CHANNEL}\` already exists.`
    },
    {
        id: `00008`,
        links: {},
        datafile_should_exist: `EXISTS`,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}admin data init`,
            level: PERM.ADMIN,
            channel: TEST_CHANNEL
        },
        expected_return: `A datafile for a channel with name \`${TEST_CHANNEL}\` already exists.`
    },
    {
        id: `00009`,
        links: {},
        datafile_should_exist: `EXISTS`,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}admin data delete`,
            level: PERM.ADMIN,
            channel: TEST_CHANNEL
        },
        confirm_msg: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}yes`,
            level: PERM.ADMIN,
            channel: TEST_CHANNEL
        },
        expected_return: `Data deleted for channel: \`${TEST_CHANNEL}\``
    },
    {
        id: `00010`,
        links: {},
        datafile_should_exist: `NOT_EXISTS`,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}admin data delete`,
            level: PERM.ADMIN,
            channel: TEST_CHANNEL
        },
        confirm_msg: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}yes`,
            level: PERM.ADMIN,
            channel: TEST_CHANNEL
        },
        expected_return: `Cannot delete data for channel \`${TEST_CHANNEL}\` because it doesn't exist.`
    },
    {
        id: `00011`,
        links: {},
        datafile_should_exist: `EXISTS`,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}admin data delete`,
            level: PERM.ADMIN,
            channel: TEST_CHANNEL
        },
        confirm_msg: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}no`,
            level: PERM.ADMIN,
            channel: TEST_CHANNEL
        },
        expected_return: `Did not delete data for channel: \`${TEST_CHANNEL}\``
    },
    {
        id: `00012`,
        links: {},
        datafile_should_exist: `IGNORES`,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}admin data delete`,
            level: PERM.ADMIN,
            channel: TEST_CHANNEL
        },
        confirm_msg: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}potato`,
            level: PERM.ADMIN,
            channel: TEST_CHANNEL
        },
        expected_return: null
    },
    {
        id: `00013`,
        links: {},
        datafile_should_exist: `IGNORES`,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}admin data delete`,
            level: PERM.ADMIN,
            channel: TEST_CHANNEL
        },
        confirm_msg: {
            source: `Twitch`,
            message: `potato`,
            level: PERM.ADMIN,
            channel: TEST_CHANNEL
        },
        expected_return: null
    },
    {
        id: `00014`,
        links: {},
        datafile_should_exist: `IGNORES`,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}admin get channel`,
            level: PERM.ADMIN,
            channel: TEST_CHANNEL
        },
        expected_return: TEST_CHANNEL
    },
    {
        id: `00015`,
        links: {},
        datafile_should_exist: `IGNORES`,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}admin get channel`,
            level: PERM.MOD,
            channel: TEST_CHANNEL
        },
        expected_return: INV_PERM ? `Invalid Permissions, you must be at least level ${PERM.ADMIN}, you are level ${PERM.MOD}.` : null
    },
    {
        id: `00016`,
        links: {},
        datafile_should_exist: `IGNORES`,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}admin get channel`,
            level: PERM.ALL,
            channel: TEST_CHANNEL
        },
        expected_return: INV_PERM ? `Invalid Permissions, you must be at least level ${PERM.ADMIN}, you are level ${PERM.ALL}.` : null
    },
    {
        id: `00017`,
        links: {},
        datafile_should_exist: `IGNORES`,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}admin link Discord:${TEST_CHANNEL} Twitch:${TEST_CHANNEL}`,
            level: PERM.ADMIN,
            channel: TEST_CHANNEL
        },
        expected_return: `Linked channel \`Discord:${TEST_CHANNEL}\` to \`Twitch:${TEST_CHANNEL}\``
    },
    {
        id: `00018`,
        links: {},
        datafile_should_exist: `IGNORES`,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}admin unlink Discord:${TEST_CHANNEL}`,
            level: PERM.ADMIN,
            channel: TEST_CHANNEL
        },
        expected_return: `Removed the link for channel \`Discord:${TEST_CHANNEL}\`.`
    },
    {
        id: `00037`,
        links: {},
        datafile_should_exist: `IGNORES`,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}admin unlink Discord:${TEST_CHANNEL}`,
            level: PERM.MOD,
            channel: TEST_CHANNEL
        },
        expected_return: INV_PERM ? `Invalid Permissions, you must be at least level ${PERM.ADMIN}, you are level ${PERM.MOD}.` : null
    },
    {
        id: `00019`,
        links: {},
        datafile_should_exist: `IGNORES`,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}admin unlink Discord:${TEST_CHANNEL}`,
            level: PERM.ALL,
            channel: TEST_CHANNEL
        },
        expected_return: INV_PERM ? `Invalid Permissions, you must be at least level ${PERM.ADMIN}, you are level ${PERM.ALL}.` : null
    },
    {
        id: `00020`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}alias add potato spam`,
            level: PERM.ALL,
            channel: TEST_CHANNEL
        },
        expected_return: INV_PERM ? `Invalid Permissions, you must be at least level ${PERM.MOD}, you are level ${PERM.ALL}.` : null
    },
    {
        id: `00021`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}alias add potato spam`,
            level: PERM.ALL,
            channel: TEST_CHANNEL
        },
        expected_return: INV_PERM ? `Invalid Permissions, you must be at least level ${PERM.MOD}, you are level ${PERM.ALL}.` : null
    },
    {
        id: `00022`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}alias add potato spam`,
            level: PERM.MOD,
            channel: TEST_CHANNEL
        },
        expected_return: `Added \`spam\` to Potato.`
    },
    {
        id: `00023`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}alias add potato salad`,
            level: PERM.ADMIN,
            channel: TEST_CHANNEL
        },
        expected_return: `That alias is already in use.`
    },
    {
        id: `00024`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}alias add potato foo`,
            level: PERM.MOD,
            channel: TEST_CHANNEL
        },
        expected_return: `That alias is already in use.`
    },
    {
        id: `00025`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}alias add foo bar`,
            level: PERM.MOD,
            channel: TEST_CHANNEL
        },
        expected_return: `Added \`bar\` to Foo.`
    },
    {
        id: `00026`,
        links: {},
        datafile_should_exist: `IGNORES`,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}alias add`,
            level: PERM.MOD,
            channel: TEST_CHANNEL
        },
        expected_return: `Not enough arguments, missing argument: \`<Option: String>\``
    },
    {
        id: `00027`,
        links: {},
        datafile_should_exist: `IGNORES`,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}alias add potato`,
            level: PERM.MOD,
            channel: TEST_CHANNEL
        },
        expected_return: `Not enough arguments, missing argument: \`<Alias: String>\``
    },
    {
        id: `00028`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}alias list potato`,
            level: PERM.ALL,
            channel: TEST_CHANNEL
        },
        expected_return: `You can refer to Potato by using: potato, salad`
    },
    {
        id: `00029`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}alias list spam`,
            level: PERM.ALL,
            channel: TEST_CHANNEL
        },
        expected_return: `Could not find an option by alias \`spam\``
    },
    {
        id: `00030`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}aliases spam`,
            level: PERM.ALL,
            channel: TEST_CHANNEL
        },
        expected_return: `Could not find an option by alias \`spam\``
    },
    {
        id: `00031`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}alias list potato`,
            level: PERM.ALL,
            channel: TEST_CHANNEL
        },
        expected_return: `You can refer to Potato by using: potato, salad`
    },
    {
        id: `00032`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}alias remove foo`,
            level: PERM.MOD,
            channel: TEST_CHANNEL
        },
        expected_return: `Cannot remove the last aliases from an option.`
    },
    {
        id: `00033`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}alias remove salad`,
            level: PERM.MOD,
            channel: TEST_CHANNEL
        },
        expected_return: `Removed alias \`salad\` from option Potato`
    },
    {
        id: `00034`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}alias remove spam`,
            level: PERM.MOD,
            channel: TEST_CHANNEL
        },
        expected_return: `Could not find an option with alias \`spam\``
    },
    {
        id: `00035`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: false,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}all`,
            level: PERM.ALL,
            channel: TEST_CHANNEL
        },
        expected_return: `No data for the channel.`
    },
    {
        id: `00036`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}all`,
            level: PERM.ALL,
            channel: TEST_CHANNEL
        },
        expected_return: `All options with points: Foo (55)`
    },
    {
        id: `00038`,
        links: {},
        datafile_should_exist: `IGNORES`,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}help`,
            level: PERM.ALL,
            channel: TEST_CHANNEL
        },
        expected_return: `Help page: ${config.WEBSITE}`
    },
    {
        id: `00039`,
        links: {},
        datafile_should_exist: `IGNORES`,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}help points add`,
            level: PERM.ALL,
            channel: TEST_CHANNEL
        },
        expected_return: `Help page: ${config.WEBSITE}/command/points_add`
    },
    {
        id: `00040`,
        links: {},
        datafile_should_exist: `IGNORES`,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}help points_remove`,
            level: PERM.ALL,
            channel: TEST_CHANNEL
        },
        expected_return: `Help page: ${config.WEBSITE}/command/points_remove`
    },
    {
        id: `00041`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: false,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}lead`,
            level: PERM.ALL,
            channel: TEST_CHANNEL
        },
        expected_return: `No options for this channel, meaning that no one can be in the lead.`
    },
    {
        id: `00042`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}lead`,
            level: PERM.ALL,
            channel: TEST_CHANNEL
        },
        expected_return: `Foo is in the lead with 55 points.`
    },
    {
        id: `00043`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}options add Spam`,
            level: PERM.ALL,
            channel: TEST_CHANNEL
        },
        expected_return: INV_PERM ? `Invalid Permissions, you must be at least level ${PERM.MOD}, you are level ${PERM.ALL}.` : null
    },
    {
        id: `00044`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}options add Spam`,
            level: PERM.MOD,
            channel: TEST_CHANNEL
        },
        expected_return: `Option created with name: \`Spam\``
    },
    {
        id: `00045`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}options add Foo`,
            level: PERM.MOD,
            channel: TEST_CHANNEL
        },
        expected_return: `An option already exists with name: \`Foo\``
    },
    {
        id: `00046`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Discord`,
            message: `${config.bot.PREFIX}options info Foo`,
            level: PERM.MOD,
            channel: TEST_CHANNEL
        },
        expected_return: `Option Information for: Foo\n` +
        `    Total Points: 55\n` +
        `    Total Contributors: 2\n` +
        `    Data Version: 3.0\n` +
        `    Aliases: foo`
    },
    {
        id: `00047`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}options info Potato`,
            level: PERM.ALL,
            channel: TEST_CHANNEL
        },
        expected_return: `Potato data: 0 points, 2 aliases.`
    },
    {
        id: `00048`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}options info spam`,
            level: PERM.MOD,
            channel: TEST_CHANNEL
        },
        expected_return: `Cannot find option with name: \`spam\``
    },
    {
        id: `00049`,
        links: {},
        datafile_should_exist: `NOT_EXISTS`,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}options info Potato`,
            level: PERM.MOD,
            channel: TEST_CHANNEL
        },
        expected_return: `No data for this channel, make there are options added.`
    },
    {
        id: `00050`,
        links: {},
        datafile_should_exist: `NOT_EXISTS`,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}options list`,
            level: PERM.ALL,
            channel: TEST_CHANNEL
        },
        expected_return: `No data for this channel, make there are options added.`
    },
    {
        id: `00051`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}options list`,
            level: PERM.ALL,
            channel: TEST_CHANNEL
        },
        expected_return: `Possible options: Potato, Foo`
    },
    {
        id: `00052`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}options remove Potato`,
            level: PERM.MOD,
            channel: TEST_CHANNEL
        },
        expected_return: `Removed option with name: \`Potato\``
    },
    {
        id: `00053`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}options remove Spam`,
            level: PERM.MOD,
            channel: TEST_CHANNEL
        },
        expected_return: `Could not find an option with an alias of: \`spam\``
    },
    {
        id: `00054`,
        links: {},
        datafile_should_exist: `IGNORES`,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}options remove Spam`,
            level: PERM.ALL,
            channel: TEST_CHANNEL
        },
        expected_return: INV_PERM ? `Invalid Permissions, you must be at least level ${PERM.MOD}, you are level ${PERM.ALL}.` : null
    },
    {
        id: `00055`,
        links: {},
        datafile_should_exist: `IGNORES`,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}points add potato 10 spam`,
            level: PERM.ALL,
            channel: TEST_CHANNEL
        },
        expected_return: INV_PERM ? `Invalid Permissions, you must be at least level ${PERM.MOD}, you are level ${PERM.ALL}.` : null
    },
    {
        id: `00056`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}points add salad 10 alkali`,
            level: PERM.MOD,
            channel: TEST_CHANNEL
        },
        expected_return: `10 points have been added to Potato on behalf of alkali.`
    },
    {
        id: `00057`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}points add spam 10`,
            level: PERM.MOD,
            channel: TEST_CHANNEL
        },
        expected_return: `Could not find an option of name \`spam\`.`
    },
    {
        id: `00058`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}points add potato 10`,
            level: PERM.MOD,
            channel: TEST_CHANNEL
        },
        expected_return: `10 points have been added to Potato on behalf of %anonymous%.`
    },
    {
        id: `00059`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}points remove potato 10`,
            level: PERM.ALL,
            channel: TEST_CHANNEL
        },
        expected_return: INV_PERM ? `Invalid Permissions, you must be at least level ${PERM.MOD}, you are level ${PERM.ALL}.` : null
    },
    {
        id: `00060`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}points remove foo 5`,
            level: PERM.MOD,
            channel: TEST_CHANNEL
        },
        expected_return: `5 points have been removed from Foo on behalf of %anonymous%.`
    },
    {
        id: `00061`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}points remove foo 5 alkali`,
            level: PERM.MOD,
            channel: TEST_CHANNEL
        },
        expected_return: `alkali has not contributed any points to Foo.`
    },
    {
        id: `00062`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}points remove spam 5`,
            level: PERM.MOD,
            channel: TEST_CHANNEL
        },
        expected_return: `Could not find an option of name \`spam\`.`
    },
    {
        id: `00063`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}points remove spam potato`,
            level: PERM.MOD,
            channel: TEST_CHANNEL
        },
        expected_return: `Cannot convert \`potato\` into an integer.`
    },
    {
        id: `00064`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}points add spam potato`,
            level: PERM.MOD,
            channel: TEST_CHANNEL
        },
        expected_return: `Cannot convert \`potato\` into an integer.`
    },
    {
        id: `00065`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}top 60`,
            level: PERM.MOD,
            channel: TEST_CHANNEL
        },
        expected_return: `I can't display more than 10 of the top options.`
    },
    {
        id: `00066`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}top`,
            level: PERM.MOD,
            channel: TEST_CHANNEL
        },
        expected_return: `The top 3 options are: Foo (55), Potato (0)`
    },
    {
        id: `00067`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}top 1`,
            level: PERM.ALL,
            channel: TEST_CHANNEL
        },
        expected_return: `The top 1 options are: Foo (55)`
    },
    {
        id: `00068`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}top -10`,
            level: PERM.ALL,
            channel: TEST_CHANNEL
        },
        expected_return: `I can't display less than 0 of the top results.`
    },
    {
        id: `00069`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}top 0`,
            level: PERM.ALL,
            channel: TEST_CHANNEL
        },
        expected_return: `The top 3 options are: Foo (55), Potato (0)`
    },
    {
        id: `00070`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}version`,
            level: PERM.ALL,
            channel: TEST_CHANNEL
        },
        expected_return: `Bot version: ${VERSION}`
    },
    {
        id: `00071`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}points add potato 10 @spam`,
            level: PERM.MOD,
            channel: TEST_CHANNEL
        },
        expected_return: `10 points have been added to Potato on behalf of spam.`
    },
    {
        id: `00072`,
        links: {},
        datafile_should_exist: `EXISTS`,
        datafile_populated: true,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}points remove foo 5 @spam`,
            level: PERM.MOD,
            channel: TEST_CHANNEL
        },
        expected_return: `5 points have been removed from Foo on behalf of spam.`
    },
    {
        id: `00073`,
        links: {},
        datafile_should_exist: `IGNORES`,
        msg_meta: {
            source: `Twitch`,
            message: `${config.bot.PREFIX}source`,
            level: PERM.ALL,
            channel: TEST_CHANNEL
        },
        expected_return: `The source code for the bot is available at: ${REPO}`
    },
    {
        id: `00074`,
        links: {},
        datafile_should_exist: `IGNORES`,
        msg_meta: {
            source: `Discord`,
            message: `${config.bot.PREFIX}source`,
            level: PERM.ADMIN,
            channel: TEST_CHANNEL
        },
        expected_return: `The source code for the bot is available at: <${REPO}>`
    },
];