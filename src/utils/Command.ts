//
// Command.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/11/06 - 2019/11/12)
//


import { LOAD_CONFIG } from "./Config";


export class Command {

    readonly requires_confirm: boolean;
    readonly case_sensitive: boolean;
    readonly arg_list: string[];
    readonly mand_args: number;
    readonly opt_args: number;
    readonly syntax: string;
    readonly level: number;
    readonly group: string;
    readonly info: string;
    readonly name: string;

    private _func: (context: msg_data, args: string[]) => string|void;

    public last_ran: number;


    constructor (metadata: cmd_metadata) {
        this.mand_args = metadata.args.length - metadata.opt_args;
        this.case_sensitive = metadata.case_sensitive;
        this.opt_args = metadata.opt_args;
        this.info = metadata.description;
        this._func = metadata.executable;
        this.arg_list = metadata.args;
        this.group = metadata.group;
        this.level = metadata.level;
        this.name = metadata.name;


        // NOTE: Create syntax dynamically
        let config: config = LOAD_CONFIG();

        this.syntax = config.bot.PREFIX;
        if (this.group) { this.syntax += this.group; };
        this.syntax += ` ${this.name} `;
        this.syntax += this.arg_list.join(" ");
    };


    // Does the user's message match a command
    public matches (message: string): boolean {

        let config: config = LOAD_CONFIG();

        // Construct the regex
        let regex: string = `^${config.bot.PREFIX}`;
        if (this.group != null) { regex += `(${this.group}\ )`; };
        regex += `(${this.name})`;

        return message.match(regex) !== null;
    };


    public execute (ctx: msg_data, args: string[]): string | void {
        return this._func(ctx, args)
    };
};




export class Confirmation {

    readonly username: string;
    readonly channel: string;

    private data: any;
    private created: number;
    private timeout: number;
    private callback: (type: CONFIRM_TYPE, args: string[], data?: any) => string|void;


    constructor (
        username: string,
        channel: string,
        timeout: number,
        cb: (type: CONFIRM_TYPE, args: string[]) => string|void,
        data?: any
    ) {
        this.callback = cb;
        this.username = username;
        this.channel = channel;
        this.created = Date.now();
        this.timeout = timeout * 1000;
        this.data = data;
    };



    public matches (user: string, channel: string, msg: string): CONFIRM_TYPE {

        // Timeout checking
        if (Date.now() - this.created > this.timeout) { return "expired"; }

        // basic user checking
        else if (this.username !== user) { return "no_match"; }
        else if (this.channel !== channel) { return "no_match"; }

        // Positive or negative match?
        else if (msg.match(/^![Yy](es)?$/)) { return "confirm"; }
        else if (msg.match(/^![Nn](o)?$/)) { return "deny"; }

        // Not valid
        else { return "invalid"; };
    };

    public run (type: CONFIRM_TYPE, args: string[]): string|void {
        return this.callback(type, args, this.data)
    }
};