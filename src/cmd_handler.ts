/* Commands */
import { VERSION_COMMAND } from "./cmds/version";
import { REMOVE_COMMAND } from "./cmds/remove";
import { PING_COMMAND } from "./cmds/ping";
import { HELP_COMMAND } from "./cmds/help";
import { LEAD_COMMAND } from "./cmds/lead";
import { LIST_COMMAND } from "./cmds/list";
import { TOP3_COMMAND } from "./cmds/top";
import { ADD_COMMAND } from "./cmds/add";
import { ALL_COMMAND } from "./cmds/all";



export function COMMAND_HANDLER (command: string, args: string[], is_mod=false): string|void {

    // SECTION: User
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
    // !SECTION: User


    // SECTION: Moderator
    else if (is_mod) {

        // NOTE: add command
        if (command === "add") { return ADD_COMMAND(args); }

        // NOTE: remove command
        else if (command === "remove") { return REMOVE_COMMAND(args); }
    };
    // !SECTION: Moderator

    return null;
}