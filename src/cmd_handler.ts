//
// cmd_handler.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/11/06 - 2019/12/06)
//


/* Imports */
import { Command, Confirmation } from "./utils/Command";
import { LOAD_CONFIG } from "./utils/Config";
import { log } from "./utils/webhook";
import { PERM } from "./constants";



var commands: Command[] = [];
export var confirms: Confirmation[] = [];
var global_last_ran: number;
var service_last_rans: any = {}


export const REGISTER_COMMAND = (metadata: cmd_metadata): boolean => {
    // Ensure command gets added correctly
    try {
        commands.push(new Command(metadata));
        return true
    } catch (error) {
        return false
    };
};



export const HANDLE_MESSAGE = (context: msg_data): string => {

    let config: config = LOAD_CONFIG();
    let datetime = new Date();
    let timezone = datetime.toLocaleTimeString("en-us", {timeZoneName:"short"}).split(" ")[2];
    let date = `${datetime.getFullYear()}-${datetime.getMonth()+1}-${datetime.getDate()}`
        + ` @ ${datetime.getHours()}:${datetime.getMinutes()} ${timezone}`;


    // Confirmation handling:
    // Check if we need any confirmations from users
    for (var index in confirms) {
        let confirmation = confirms[index];

        let response: CONFIRM_TYPE = confirmation.matches(
            context.user, context.channel, context.message
        );

        if (!["no_match", "expired"].includes(response)) {
            confirms.splice(parseInt(index), 1)
            let cmd_resp = confirmation.run(response);


            // Check if we have a response to log
            if (cmd_resp) {
                log({
                    title: `Log Entry (Confirmation Response):`,
                    msg: `Command:\`\`\`${context.message}\`\`\`\n\nResponse:\`\`\`${cmd_resp}\`\`\``,
                    embed: true,
                    fields: {
                        "Date:": date,
                        "Is Mod:": context.level >= PERM.MOD,
                        "Is Admin:": context.level >= PERM.ADMIN,
                        "Level:": context.level,
                        "Channel:": context.channel,
                        "Username": context.user,
                        "Platform": context.source,
                        "Confirm Type": response
                    },
                    no_stdout: true
                })
            }

            return cmd_resp;
        }

        else if (response === "expired") {
            confirms.splice(parseInt(index), 1)
            confirmation.run(response);
        };
    };



    // SECTION: Global command cooldowns
    if (config.bot.COOLDOWN_TYPE === "GLOBAL" && context.cooldown) {
        if (global_last_ran) {
            if (Date.now() - global_last_ran < config.bot.COOLDOWN_TIME * 1000) {
                return null;
            };
        };
        global_last_ran = Date.now()
    }
    // !SECTION: Global command cooldowns



    // SECTION: Service command cooldowns
    else if (config.bot.COOLDOWN_TYPE === "SERVICE" && context.cooldown) {
        if (service_last_rans[context.source]) {
            if (Date.now() - service_last_rans[context.source] < config.bot.COOLDOWN_TIME * 1000) {
                return null;
            };
        };
        service_last_rans[context.source] = Date.now()
    }
    // !SECTION: Service command cooldowns



    // Check all registered commands
    for (var cmd of commands) {

        // NOTE: Checking if message doesn't match
        if (!cmd.matches(context.message.toLowerCase())) { continue; };


        // NOTE: Permission checking
        if (context.level < cmd.level) {
            if (config.bot.INVALID_PERM_ERROR) {
                return `Invalid Permissions, you must be at least level ${cmd.level}, you are level ${context.level}.`;
            }
            return null;
        };


        // NOTE: per-command cooldown
        if (config.bot.COOLDOWN_TYPE === "COMMAND" && context.cooldown) {
            if (cmd.last_ran) {
                if (Date.now() - cmd.last_ran < config.bot.COOLDOWN_TIME * 1000) {
                    return null;
                };
            };
            cmd.last_ran = Date.now();
        };


        // NOTE: Case sensitivity
        if (!cmd.case_sensitive) {
            context.message = context.message.toLowerCase();
        };


        // NOTE: Argument parsing
        let args = context.message.slice(config.bot.PREFIX.length).split(" ").slice(
            cmd.group ? 2 : 1
        );
        if (args.length < cmd.mand_args) {
            return `Not enough arguments, missing argument: \`${cmd.arg_list[args.length]}\``;
        };

        let response = cmd.execute(context, args);

        log({
            title: `Log Entry:`,
            msg: `Command:\`\`\`${context.message}\`\`\`\n\nResponse:\`\`\`${response}\`\`\``,
            embed: true,
            fields: {
                "Date:": date,
                "Is Mod:": context.level >= PERM.MOD,
                "Is Admin:": context.level >= PERM.ADMIN,
                "Level:": context.level,
                "Channel:": context.channel,
                "Username": context.user,
                "Platform": context.source
            },
            no_stdout: true
        })
        return response;
    };
    return null;
}



/* Importing all the commands so they can register */
import "./commands/usr/all";
import "./commands/usr/top";
import "./commands/usr/ping";
import "./commands/usr/help";
import "./commands/usr/lead";
import "./commands/usr/version";
import "./commands/mod/points_add";
import "./commands/mod/options_add";
import "./commands/usr/options_list";
import "./commands/mod/points_remove";
import "./commands/admin/init_datafile";
import "./commands/admin/delete_datafile";