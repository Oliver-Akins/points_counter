//
// Command.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/11/06 - 2019/11/06)
//


export class Command {

    readonly case_sensitive: boolean;
    readonly syntax: string;
    readonly level: perms;
    readonly info: string;

    private _name: string;
    private _group: string;
    private _func: (args: string[]) => string|void;

    public last_ran: number


    constructor (metadata: cmdMetadata) {
        this.case_sensitive = metadata.case_sensitive;
        this.info = metadata.description;
        this._func = metadata.executable;
        this.syntax = metadata.syntax;
        this._group = metadata.group;
        this.level = metadata.level;
        this._name = metadata.name;
    };


    // Does the user's message match a command
    public matches (message: string): boolean {
        if (message === `${this._group} ${this._name}`) {
            return true;
        };
        return false
    };


    public execute (args: string[]): string | void {
        return this._func(args)
    };
};