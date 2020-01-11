//
// tests.ts
//
// Written by: Tyler Akins (2019/11/17 - 2020/01/10)
//


import { PERM, VERSION, TEST_CHANNEL, REPO } from "../constants";
import { LOAD_CONFIG } from "./Config";


const config: config = LOAD_CONFIG();

export const SEND_INVALID_PERM: boolean = config.bot.INVALID_PERM_ERROR
export const PREFIX: string = config.bot.PREFIX;


export let tests: test[] = [
    {
        id: `general:01`,
        links: {},
        datafile_should_exist: `IGNORES`,
        msg_meta: {
            source: `Twitch`,
            message: `potato salad`,
            level: PERM.ALL,
            channel: TEST_CHANNEL
        },
        expected_return: null
    }
];