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
import { ADD_COMMAND } from "./cmds/mod/add_points";
import { PING_COMMAND } from "./cmds/user/ping";
import { HELP_COMMAND } from "./cmds/user/help";
import { LEAD_COMMAND } from "./cmds/user/lead";
import { LIST_COMMAND } from "./cmds/user/list";
import { TOP3_COMMAND } from "./cmds/user/top";
import { ALL_COMMAND } from "./cmds/user/all";
import { PUSH } from "./utils/webhook";


const logger = (log_message: string): void => {
    console.log(log_message);
    PUSH({"content": `\`${log_message}\``});
};



export const COMMAND_HANDLER = (command: string, args: string[], metadata: cmd_meta): string|void => {


    var datetime = new Date();
    var date = `${datetime.getFullYear()}-${datetime.getMonth()+1}-${datetime.getDate()}`;


    let lm = `* [${date}][c:${metadata.channel}]` +
        `[m:${metadata.is_mod}][a:${metadata.is_admin}]` +
        `[u:${metadata.username}][s:${metadata.platform}]` +
        ` - Running command: ${command} ${args.join(" ")}`;


    // SECTION: Admin Commands
    if (command === "admin") {
        logger(lm)

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
        else if (["select", "option"].includes(subcommand)) {

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

        // Permission check
        if (!metadata.is_mod && !metadata.is_admin) {
            return "You don't have permission to run that command.";
        }

        logger(lm);
        return ADD_COMMAND(args);

    }

    // NOTE: remove command
    else if (command === "remove") {

        // Permission check
        if (!metadata.is_mod && !metadata.is_admin) {
            return "You don't have permission to run that command.";
        }

        logger(lm);
        return ADD_COMMAND(args);
    }
    // !SECTION: Moderator Commands



    // SECTION: User Commands
    // NOTE: list command
    else if (command === "list") {
        logger(lm);
        return LIST_COMMAND();
    }


    // NOTE: ping command
    else if (command === "ping") {
        logger(lm);
        return PING_COMMAND();
    }


    // NOTE: help command
    else if (command === "help") {
        logger(lm);
        return HELP_COMMAND();
    }


    // NOTE: lead command
    else if (command === "lead") {
        logger(lm);
        return LEAD_COMMAND();
    }


    // NOTE: top command
    else if (command === "top")  {
        logger(lm);
        return TOP3_COMMAND();
    }


    // NOTE: version command
    else if (command === "version") {
        logger(lm);
        return VERSION_COMMAND();
    }


    // NOTE: all command
    else if (command === "all") {
        logger(lm);
        return ALL_COMMAND();
    }
    // !SECTION: User Commands

    return null;
};