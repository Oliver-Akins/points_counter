//
// cmd_handler.ts
//
// Written by: Tyler Akins (2019/11/06 - 2020/01/08)
//


/* Imports */
import { Command, Confirmation } from "./utils/Command";
import { PERM, FLAG_INDICATOR } from "./constants";
import { SORT_COMMANDS } from "./utils/sorting";
import { LOAD_CONFIG } from "./utils/Config";
import { GET_FLAGS } from "./utils/flags";
import { log } from "./utils/webhook";



export var commands: Command[] = [];
export var confirms: Confirmation[] = [];
var global_last_ran: number;
var service_last_rans: any = {}


export const REGISTER_COMMAND = (metadata: cmd_metadata): boolean => {
    // Ensure command gets added correctly
    try {
        commands.push(new Command(metadata));
        SORT_COMMANDS(commands);
        return true;
    } catch (error) {
        return false;
    };
};



export const HANDLE_MESSAGE = (ctx: msg_data): string => {

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
            ctx.user, ctx.channel, ctx.message
        );

        if (!["no_match", "expired"].includes(response)) {
            confirms.splice(parseInt(index), 1);
            let cmd_resp = confirmation.run(response);


            // Check if we have a response to log
            if (cmd_resp) {
                log({
                    title: `Log Entry (Confirmation Response):`,
                    msg: `Command:\`\`\`\n${ctx.message}\n\`\`\`\n\nResponse:\`\`\`\n${cmd_resp}\n\`\`\``,
                    embed: true,
                    fields: {
                        "Date:": date,
                        "Is Mod:": ctx.level >= PERM.MOD,
                        "Is Admin:": ctx.level >= PERM.ADMIN,
                        "Level:": ctx.level,
                        "Channel:": ctx.channel,
                        "Username": ctx.user,
                        "Platform": ctx.source,
                        "Confirm Type": response
                    },
                    no_stdout: true
                });
            };

            return cmd_resp;
        }

        else if (response === "expired") {
            confirms.splice(parseInt(index), 1);
            confirmation.run(response);
        };
    };



    // SECTION: Global command cooldowns
    if (config.bot.COOLDOWN_TYPE === "GLOBAL" && ctx.cooldown) {
        if (global_last_ran) {
            if (Date.now() - global_last_ran < config.bot.COOLDOWN_TIME * 1000) {
                return null;
            };
        };
        global_last_ran = Date.now();
    }
    // !SECTION: Global command cooldowns



    // SECTION: Service command cooldowns
    else if (config.bot.COOLDOWN_TYPE === "SERVICE" && ctx.cooldown) {
        if (service_last_rans[ctx.source]) {
            if (Date.now() - service_last_rans[ctx.source] < config.bot.COOLDOWN_TIME * 1000) {
                return null;
            };
        };
        service_last_rans[ctx.source] = Date.now();
    };
    // !SECTION: Service command cooldowns


    // SECTION: Flag parsing
    ctx.flags = GET_FLAGS(ctx.message);

    // removing arguments that are indicated as flags
    ctx.message = ctx.message.replace(`/${FLAG_INDICATOR}\w*/g`, "");
    // !SECTION: Flag parsing



    // Check all registered commands
    for (var cmd of commands) {

        // NOTE: Checking if message doesn't match
        if (!cmd.matches(ctx.message.toLowerCase())) { continue; };


        // NOTE: Permission checking
        if (ctx.level < cmd.level) {
            if (config.bot.INVALID_PERM_ERROR) {
                return `Invalid Permissions, you must be at least level ${cmd.level}, you are level ${ctx.level}.`;
            };
            return null;
        };


        // NOTE: per-command cooldown
        if (config.bot.COOLDOWN_TYPE === "COMMAND" && ctx.cooldown) {
            if (cmd.last_ran) {
                if (Date.now() - cmd.last_ran < config.bot.COOLDOWN_TIME * 1000) {
                    return null;
                };
            };
            cmd.last_ran = Date.now();
        };


        // NOTE: Case sensitivity
        if (!cmd.case_sensitive) {
            ctx.message = ctx.message.toLowerCase();
        };


        // NOTE: Argument parsing
        let args = ctx.message
            .slice(config.bot.PREFIX.length)
            .split(" ")
            .slice(cmd.full_name.split(" ").length);


        // Ensure the use supplied enough arguments
        if (args.length < cmd.mand_args) {
            return `Not enough arguments, missing argument: \`${cmd.arg_list[args.length]}\``;
        };


        let response = cmd.execute(ctx, args);


        log({
            title: `Log Entry:`,
            msg: `Command:\`\`\`\n${ctx.message}\n\`\`\`\n\nResponse:\`\`\`\n${response}\n\`\`\``,
            embed: true,
            fields: {
                "Date:": date,
                "Is Mod:": ctx.level >= PERM.MOD,
                "Is Admin:": ctx.level >= PERM.ADMIN,
                "Level:": ctx.level,
                "Channel:": ctx.channel,
                "Username": ctx.user,
                "Platform": ctx.source
            },
            no_stdout: true
        });
        return response;
    };
    return null;
};



/* Importing all the commands so they can register */
import "./commands/all";
import "./commands/top";
import "./commands/help";
import "./commands/lead";
import "./commands/source";
import "./commands/version";
import "./commands/alias_add";
import "./commands/alias_list";
import "./commands/admin_link";
import "./commands/points_add";
import "./commands/options_add";
import "./commands/alias_remove";
import "./commands/admin_unlink";
import "./commands/options_list";
import "./commands/options_info";
import "./commands/points_remove";
import "./commands/options_remove";
import "./commands/admin_data_init";
import "./commands/admin_data_delete";
import "./commands/admin_get_channel";