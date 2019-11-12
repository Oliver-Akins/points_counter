import { run_discord } from "./discord_handler";
import { run_twitch } from "./twitch_handler";
import { Command } from "./utils/Command";


let meta: cmd_metadata = {
    description: "Allows you to test to make sure the bot is online",
    executable: (args: string[]) => { return ""; },
    case_sensitive: false,
    syntax: "{pre}ping",
    name: "ping",
    args: [],
    level: 0
};


let cmd = new Command(meta);


run_twitch()