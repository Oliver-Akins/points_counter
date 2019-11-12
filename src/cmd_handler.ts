//
// cmd_handler.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/11/06 - 2019/11/07)
//


/* Imports */
import { LOAD_CONFIG } from "./utils/Config";
import { Command } from "./utils/Command";
import { log } from "./utils/webhook";



var commands: Command[] = [];
var global_last_ran: number;


export const REGISTER_COMMAND = (metadata: cmd_metadata): boolean => {
    // Ensure command gets added correctly
    try {
        commands.push(new Command(metadata));
        return true
    } catch (error) {
        return false
    };
};



export const HANDLE_MESSAGE = (context: msg_data): string | void => {

    let config: config = LOAD_CONFIG();
    let datetime = new Date();
    let date = `${datetime.getFullYear()}-${datetime.getMonth()+1}-${datetime.getDate()}`;


    // SECTION: Global command cooldown dealing with
    if (config.bot.COOLDOWN_TYPE === "GLOBAL") {
        if (global_last_ran) {
            if (Date.now() - global_last_ran < config.bot.CMD_COOLDOWN * 1000) {
                return;
            };
        };
        global_last_ran = Date.now()
    }
    // !SECTION: Global command cooldowns




    // Check all registered commands
    for (var cmd of commands) {

        // NOTE: Checking if message doesn't match
        if (!cmd.matches(context.message.toLowerCase())) { continue; }


        // NOTE: Permission checking
        if (context.level < cmd.level) {
            return `Invalid Permissions, you must be at least level ${cmd.level}, you are level ${context.level}.`
        }

        // NOTE: Case sensitivity
        if (!cmd.case_sensitive) {
            context.message = context.message.toLowerCase();
        };

        // NOTE: Argument parsing
        let args = context.message.slice(config.bot.PREFIX.length).split(" ").slice(1);
        if (args.length < cmd.mand_args) {
            return `Not enough arguments, missing argument: \`${cmd.arg_list[args.length]}\``;
        };

        let response = cmd.execute(args);

        log({
            title: `Log Entry:`,
            msg: `Command:\`\`\`${context.message}\`\`\`\n\n\nResponse:\`\`\`${response}\`\`\``,
            embed: true,
            fields: {
                "Date:": date,
                "Is Mod:": context.level >= perm.mod,
                "Is Admin:": context.level >= perm.admin,
                "Level:": context.level,
                "Channel:": context.channel,
                "Username": context.user,
                "Platform": context.source
            },
            no_stdout: true
        })
        return response;
    };
}



/* Importing all the commands so they can register */
import "./commands/mod/ping";import { perm } from "./constants";

