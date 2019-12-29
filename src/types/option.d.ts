//
// option.d.ts
//
// Written by: Tyler Akins (2019/11/11)
//


interface option {
    aliases: string[];
    name: string;
    points: {
        [key: string]: number
    };
    total: number;
    data_version: string;
}