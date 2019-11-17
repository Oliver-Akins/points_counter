//
// main.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/11/06 - 2019/11/17)
//

import { run_discord } from "./discord_handler";
import { run_twitch } from "./twitch_handler";
import { LOAD_CONFIG } from "./utils/Config";


let config = LOAD_CONFIG();
let args = process.argv.slice(2);


// Not enough arguments
if (args.length < 1) {
    console.error(
        "Too few arguments, to get help with running the program, go to:",
        config.WEBSITE + "/cli-args"
    );
    process.exit(1);
}

// Too many args
else if (args.length > 1) {
    console.error(
        "Too many arguments given, to get help with running the program, go to:",
        config.WEBSITE + "/cli-args"
    );
    process.exit(1);
};


let command = args[0];


if (["run-all", "run-twitch"].includes(command)) { run_twitch() };
if (["run-all", "run-discord"].includes(command)) {};
if (["compile-docs"].includes(command)) {
    // TODO: Create a specific file for each command object with it's description, syntax, etc.
    // TODO: Set `{pre}` in all docs to be the prefix from the config
};
if (["run-tests"].includes(command)) {
    // TODO: Call test runner
}