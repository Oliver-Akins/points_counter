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



export function COMMAND_HANDLER (command: string, args: string[], is_mod=false, is_admin=false): string|void {

    // SECTION: Admin Commands
    if (command === "admin") {


        // NOTE: Permission checking
        if (!is_admin) { return "You don't have permission to run that command."; }

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
    if (is_mod) {
        // NOTE: add command
        if (command === "add") { return ADD_COMMAND(args); }

        // NOTE: remove command
        else if (command === "remove") { return REMOVE_COMMAND(args); }
    }
    // !SECTION: Moderator Commands



    // SECTION: User Commands
    // NOTE: list command
    if (command === "list") { return LIST_COMMAND(); }

    // NOTE: ping command
    else if (command === "ping") { return PING_COMMAND();}

    // NOTE: help command
    else if (command === "help") { return HELP_COMMAND(); }

    // NOTE: lead command
    else if (command === "lead") { return LEAD_COMMAND(); }

    // NOTE: top command
    else if (command === "top")  { return TOP3_COMMAND(); }

    // NOTE: version command
    else if (command === "version") { return VERSION_COMMAND(); }

    // NOTE: all command
    else if (command === "all") { return ALL_COMMAND(); }
    // !SECTION: User Commands

    return null;
}