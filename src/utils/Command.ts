//
// Command.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/11/06 - 2019/11/12)
//


import { LOAD_CONFIG } from "./Config";


export class Command {

    readonly case_sensitive: boolean;
    readonly arg_list: string[];
    readonly mand_args: number;
    readonly opt_args: number;
    readonly syntax: string;
    readonly level: number;
    readonly info: string;
    readonly name: string;

    private _group: string;
    private _func: (context: msg_data, args: string[]) => string|void;

    public last_ran: number


    constructor (metadata: cmd_metadata) {
        this.mand_args = metadata.args.length - metadata.opt_args;
        this.case_sensitive = metadata.case_sensitive;
        this.opt_args = metadata.opt_args;
        this.info = metadata.description;
        this._func = metadata.executable;
        this.arg_list = metadata.args;
        this.syntax = metadata.syntax;
        this._group = metadata.group;
        this.level = metadata.level;
        this.name = metadata.name;
    };


    // Does the user's message match a command
    public matches (message: string): boolean {

        let config: config = LOAD_CONFIG();

        // Construct the regex
        let regex: string = `^${config.bot.PREFIX}`;
        if (this._group != null) { regex += `(${this._group}\ )`; };
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

    private callback: (args: string[]) => string|void;

    constructor (username: string, channel: string, cb: (args: string[]) => string|void) {
        this.callback = cb;
        this.username = username;
        this.channel = channel;
    };


    public matches (username: string, channel: string): boolean {
        return username === this.username && channel === this.channel
    };

    public run (args: string[]): string|void {
        return this.callback(args)
    }
};