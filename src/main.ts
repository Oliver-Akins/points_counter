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


if (["run-all", "run-twitch"].includes(command)) {};
if (["run-all", "run-discord"].includes(command)) {};
if (["compile"].includes(command)) {};