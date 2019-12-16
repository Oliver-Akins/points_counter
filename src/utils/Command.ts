//
// Command.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/11/06 - 2019/12/10)
//


import { LOAD_CONFIG } from "./Config";


export class Command {

    readonly requires_confirm: boolean;
    readonly case_sensitive: boolean;
    readonly arg_list: string[];
    readonly mand_args: number;
    readonly full_name: string;
    readonly opt_args: number;
    readonly syntax: string;
    readonly level: number;
    readonly group: string;
    readonly info: string;
    readonly name: string;

    readonly alert: alert_structure;

    private _func: (context: msg_data, args: string[]) => string;

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
        this.alert = metadata.alerts;
        this.requires_confirm = metadata.requires_confirm;
        this.full_name = this.group ? `${this.group} ${this.name}` : `${this.name}`;


        // NOTE: Create syntax dynamically
        let config: config = LOAD_CONFIG();

        this.syntax = config.bot.PREFIX;
        this.syntax += this.group ? `${this.group} ${this.name}` : `${this.name}`;
        if (this.arg_list.length > 0) {
            this.syntax += ` ${this.arg_list.join(" ")}`;
        }
    };


    // Does the user's message match a command
    public matches (message: string): boolean {

        const config: config = LOAD_CONFIG();

        // Construct the regex
        let regex: string = `^${config.bot.PREFIX}`;
        if (this.group != null) { regex += `(${this.group}\ )`; };
        regex += `(${this.name})`;

        return message.match(regex) !== null;
    };


    public execute (ctx: msg_data, args: string[]): string {
        return this._func(ctx, args)
    };
};




export class Confirmation {

    readonly username: string;
    readonly channel: string;

    private data: any;
    private created: number;
    private timeout: number;
    private callback: (type: CONFIRM_TYPE, data?: any) => string;


    constructor (
        username: string,
        channel: string,
        timeout: number,
        cb: (type: CONFIRM_TYPE, data?: any) => string,
        data?: any
    ) {
        this.username = username;
        this.channel = channel;
        this.created = Date.now();
        this.callback = cb;
        this.timeout = timeout * 1000;
        this.data = data;
    };



    public matches (user: string, channel: string, msg: string): CONFIRM_TYPE {

        const config: config = LOAD_CONFIG();


        // Timeout checking
        if (Date.now() - this.created > this.timeout) { return "expired"; }

        // basic user checking
        else if (this.username !== user) { return "no_match"; }
        else if (this.channel !== channel) { return "no_match"; }

        // Positive or negative match?
        else if (msg.match(`^${config.bot.PREFIX}[Yy](es)?$`)) { return "confirm"; }
        else if (msg.match(`^${config.bot.PREFIX}[Nn](o)?$`)) { return "deny"; }

        // Not valid
        else { return "invalid"; };
    };

    public run (type: CONFIRM_TYPE): string {
        return this.callback(type, this.data)
    }
};