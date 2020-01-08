//
// constants.ts
//
// Written by: Tyler Akins (2019/11/06 - 2020/01/08)
//


export const VERSION: string = "3.1.0";


// The indicator used to tell the bot what arguments are flags.
// This indicator cannot be used as the start of any non-flag argument
export const FLAG_INDICATOR: string = "-"


// The number of seconds for the confirmation timeouts
export const CONFIRM_TIMEOUT: number = 5;


export const PERM: perms = {
    ALL: 0,
    MOD: 1,
    ADMIN: 2
};


export const LIMIT = {
    DISCORD: 2000,
    TWITCH: 500
};


export const TEST_CHANNEL = "#tests_channel#";
export const TEST_USER = "#test_user#";


export const REPO = "https://github.com/Tyler-A/points_counter";