//
// command_metadata.d.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/11/06 - 2019/11/11)
//


interface cmd_metadata {
    executable(context: msg_data, args: string[]): string|void;
    case_sensitive: boolean;
    description: string;
    opt_args: number;
    syntax: string;
    group?: string;
    args: string[];
    level: number;
    name: string;
}