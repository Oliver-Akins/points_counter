//
// cmd_handler.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/10/31)
//


/* Command Imports */
import { ADD_SELECT, REMOVE_SELECT } from "./cmds/admin/select_commands";
import { ADD_ALIAS, REMOVE_ALIAS } from "./cmds/admin/select_alias";
import { ADMIN_HELP_COMMAND } from "./cmds/admin/admin_help";
import { DATA_FILE_COMMAND } from "./cmds/admin/data_file";
import { REMOVE_COMMAND } from "./cmds/mod/remove_points";
import { VERSION_COMMAND } from "./cmds/user/version";
import { OPTION_INFO } from "./cmds/user/option_info";
import { LIST_ALIASES } from "./cmds/mod/alias_list";
import { ADD_COMMAND } from "./cmds/mod/add_points";
import { PING_COMMAND } from "./cmds/user/ping";
import { HELP_COMMAND } from "./cmds/user/help";
import { LEAD_COMMAND } from "./cmds/user/lead";
import { LIST_COMMAND } from "./cmds/user/list";
import { TOP3_COMMAND } from "./cmds/user/top";
import { ALL_COMMAND } from "./cmds/user/all";

import { PUSH } from "./utils/webhook";


const logger = (ctx: log_data): void => {
    var datetime = new Date();
    var date = `${datetime.getFullYear()}-${datetime.getMonth()+1}-${datetime.getDate()}`;

    console.log(
        `* [${date}][c:${ctx.channel}]` +
        `[m:${ctx.is_mod}][a:${ctx.is_admin}]` +
        `[u:${ctx.username}][s:${ctx.platform}]` +
        ` - Running command: ${ctx.command}`
    );

    PUSH({
        "content": "New log entry",
        "embeds": [{
            "title": "Log entry:",
            "color": 43520,
            "description": `Command ran : \`\`\`\n${ctx.command} ${ctx.args.join(" ")}\n\`\`\``,
            "fields": [
                { "name": "Date:", "value": date, "inline": true },
                { "name": "Is mod:", "value": ctx.is_mod, "inline": true },
                { "name": "Is admin:", "value": ctx.is_admin, "inline": true },
                { "name": "Channel:", "value": ctx.channel, "inline": true },
                { "name": "Username:", "value": ctx.username, "inline": true },
                { "name": "Platform:", "value": ctx.platform, "inline": true }
            ]
        }]
    });
};



export const COMMAND_HANDLER = (command: string, args: string[], metadata: cmd_meta): string|void => {

    let context = {
        platform: metadata.platform,
        username: metadata.username,
        is_admin: metadata.is_admin,
        channel: metadata.channel,
        is_mod: metadata.is_mod,
        command: command,
        args: args
    }

    // SECTION: Admin Commands
    if (command === "admin") {
        logger(context)

        // NOTE: Permission checking
        if (!metadata.is_admin) { return "You don't have permission to run that command."; }

        // NOTE: Subcommand check
        else if (args.length < 1) { return "Not enough arguments, must specify a sub-command."; }


        let subcommand: string = args[0];


        // NOTE: data file subcommand
        if (subcommand === "db") { return DATA_FILE_COMMAND(args[1].toLowerCase()); }

        // NOTE: admin help
        else if (subcommand === "help") { return ADMIN_HELP_COMMAND(); }


        // SECTION: Alias subcommand
        else if (subcommand === "alias") {

            // NOTE: Ensure arguments
            if (args.length < 4) { return "Not enough arguments, must specify an action."; }

            let target = args[1].toLowerCase();
            let alias = args[3].toLowerCase();

            // NOTE: Alias add
            if (args[2] === "add") { return ADD_ALIAS(target, alias); }

            // NOTE: alias remove
            else if (args[2] === "remove") { return REMOVE_ALIAS(target, alias); }
        }
        // !SECTION


        // SECTION: Select subcommand
        else if (subcommand === "option") {

            // NOTE: Ensure arguments
            if (args.length < 3) { return "Not enough arguments, must specify an action."; }

            // NOTE: Alias add
            else if (args[1] === "add") { return ADD_SELECT(args[2]); }

            // NOTE: alias remove
            else if (args[1] === "remove") { return REMOVE_SELECT(args[2].toLowerCase()); }
        }
        //!SECTION
    }
    // !SECTION: Admin Commands



    // SECTION: Moderator Commands

    // NOTE: add command
    if (command === "add") {
        logger(context);

        // Permission check
        if (!metadata.is_mod && !metadata.is_admin) {
            return "You don't have permission to run that command.";
        }

        return ADD_COMMAND(args);

    }

    // NOTE: remove command
    else if (command === "remove") {
        logger(context);

        // Permission check
        if (!metadata.is_mod && !metadata.is_admin) {
            return "You don't have permission to run that command.";
        }

        return REMOVE_COMMAND(args);
    }

    else if (command === "aliases") {
        if (args.length < 1) {
            return "Not enough arguments, must specify a target.";
        };

        logger(context);
        return LIST_ALIASES(args[0].toLowerCase())
    }
    // !SECTION: Moderator Commands



    // SECTION: User Commands
    // NOTE: info command
    else if (command === "info") {
        if (args.length < 1) {
            return "Not enough arguments, must specify a target.";
        };
        logger(context);
        return OPTION_INFO(args[0].toLowerCase())
    }
    // NOTE: list command
    else if (command === "list") {
        logger(context);
        return LIST_COMMAND();
    }


    // NOTE: ping command
    else if (command === "ping") {
        logger(context);
        return PING_COMMAND();
    }


    // NOTE: help command
    else if (command === "help") {
        logger(context);
        return HELP_COMMAND();
    }


    // NOTE: lead command
    else if (command === "lead") {
        logger(context);
        return LEAD_COMMAND();
    }


    // NOTE: top command
    else if (command === "top")  {
        logger(context);
        return TOP3_COMMAND();
    }


    // NOTE: version command
    else if (command === "version") {
        logger(context);
        return VERSION_COMMAND();
    }


    // NOTE: all command
    else if (command === "all") {
        logger(context);
        return ALL_COMMAND();
    }
    // !SECTION: User Commands

    return null;
};