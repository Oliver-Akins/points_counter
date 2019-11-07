//
// command_metadata.d.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/11/06 - 2019/11/06)
//


interface cmdMetadata {
    executable(args: string[]): string|void;
    arg_descriptions?: string[];
    case_sensitive: boolean;
    description: string;
    arg_count: number;
    syntax: string;
    group?: string;
    name: string;
    level: perms;
}