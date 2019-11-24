//
// tests.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/11/17 - 2019/11/23)
//

import { LOAD_CONFIG } from "./Config";
import { perm } from "../constants";


let config: config = LOAD_CONFIG();


export const tests: test[] = [
    {
        "id": "0001",
        "msg_meta": {
            "channel": "%test_channel%",
            "user": "%test_runner%",
            "level": perm.all,
            "message": "spam eggs",
            "source": "Discord",
            "test": true
        },
        "expected_return": null,
        "datafile_should_exist": "IGNORES"
    },
    {
        "id": "0002",
        "msg_meta": {
            "message": "!admin init",
            "channel": "%test_channel%",
            "level": perm.all,
            "source": "Twitch",
            "user": "%test_runner%",
            "test": true
        },
        "expected_return": `Invalid Permissions, you must be at least level ${perm.admin}, you are level ${perm.all}.`,
        "datafile_should_exist": "IGNORES"
    },
    {
        "id": "0003",
        "msg_meta": {
            "message": "!admin init",
            "channel": "%test_channel%",
            "level": perm.admin,
            "source": "Twitch",
            "user": "%test_runner%",
            "test": true
        },
        "expected_return": `Created data file for channel: %test_channel%`,
        "datafile_should_exist": "NOT_EXISTS"
    },
    {
        "id": "0004",
        "msg_meta": {
            "message": "!admin init",
            "channel": "%test_channel%",
            "level": perm.mod,
            "source": "Twitch",
            "user": "%test_runner%",
            "test": true
        },
        "expected_return": `Invalid Permissions, you must be at least level ${perm.admin}, you are level ${perm.mod}.`,
        "datafile_should_exist": "IGNORES"
    },
    {
        "id": "0005",
        "msg_meta": {
            "message": "!admin",
            "channel": "%test_channel%",
            "level": perm.admin,
            "source": "Discord",
            "user": "%test_runner%",
            "test": true
        },
        "expected_return": null,
        "datafile_should_exist": "IGNORES"
    },
    {
        "id": "0006",
        "msg_meta": {
            "message": "!init",
            "channel": "%test_channel%",
            "level": perm.all,
            "source": "Twitch",
            "user": "%test_runner%",
            "test": true
        },
        "expected_return": null,
        "datafile_should_exist": "IGNORES"
    },
    {
        "id": "0007",
        "msg_meta": {
            "message": "!admin init",
            "channel": "%test_channel%",
            "level": perm.admin,
            "source": "Twitch",
            "user": "%test_runner%",
            "test": true
        },
        "expected_return": `A datafile for a channel with name "%test_channel%" already exists.`,
        "datafile_should_exist": "EXISTS"
    },
    {
        "id": "0008",
        "msg_meta": {
            "message": "!ping",
            "channel": "%test_channel%",
            "level": perm.admin,
            "source": "Discord",
            "user": "%test_runner%",
            "test": true
        },
        "expected_return": "Pong!",
        "datafile_should_exist": "IGNORES"
    },
    {
        "id": "0009",
        "msg_meta": {
            "channel": "%test_channel%",
            "level": perm.all,
            "message": "!options",
            "source": "Discord",
            "test": true,
            "user": "%test_runner%"
        },
        "expected_return": "Cannot load data for this channel. Make sure it's been initialized.",
        "datafile_should_exist": "NOT_EXISTS"
    },
    {
        "id": "000A",
        "msg_meta": {
            "channel": "%test_channel%",
            "level": perm.all,
            "message": "!options",
            "source": "Discord",
            "test": true,
            "user": "%test_runner%"
        },
        "expected_return": "Possible options: Potato, Green",
        "datafile_should_exist": "EXISTS"
    },
    {
        "id": "000B",
        "msg_meta": {
            "channel": "%test_channel%",
            "level": perm.all,
            "message": "!version",
            "source": "Discord",
            "test": true,
            "user": "%test_runner%"
        },
        "expected_return": `Bot version: ${config.bot.VERSION}`,
        "datafile_should_exist": "IGNORES"
    },
    {
        "id": "000B",
        "msg_meta": {
            "channel": "%test_channel%",
            "level": perm.all,
            "message": "!version",
            "source": "Discord",
            "test": true,
            "user": "%test_runner%"
        },
        "expected_return": `Bot version: ${config.bot.VERSION}`,
        "datafile_should_exist": "IGNORES"
    },
    {
        "id": "000C",
        "msg_meta": {
            "channel": "%test_channel%",
            "level": perm.admin,
            "message": "!version",
            "source": "Discord",
            "test": true,
            "user": "%test_runner%"
        },
        "expected_return": `Bot version: ${config.bot.VERSION}`,
        "datafile_should_exist": "IGNORES"
    },
    {
        "id": "000D",
        "msg_meta": {
            "channel": "%test_channel%",
            "level": perm.all,
            "message": "!help",
            "source": "Discord",
            "test": true,
            "user": "%test_runner%"
        },
        "expected_return": `Help page: ${config.WEBSITE}`,
        "datafile_should_exist": "IGNORES"
    },
    {
        "id": "000F",
        "msg_meta": {
            "channel": "%test_channel%",
            "level": perm.admin,
            "message": "!help help",
            "source": "Discord",
            "test": true,
            "user": "%test_runner%"
        },
        "expected_return": `Help page: ${config.WEBSITE}/command/help`,
        "datafile_should_exist": "IGNORES"
    },
    {
        "id": "0010",
        "msg_meta": {
            "channel": "%test_channel%",
            "level": perm.all,
            "message": "!help ping",
            "source": "Discord",
            "test": true,
            "user": "%test_runner%"
        },
        "expected_return": `Help page: ${config.WEBSITE}/command/ping`,
        "datafile_should_exist": "IGNORES"
    },
]