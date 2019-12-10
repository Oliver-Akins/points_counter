//
// sorting.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/11/29 - 2019/12/10)
//


import { Command } from "./Command";


export const SORT_OPTIONS = (data: option[]): option[] => {
    return data.sort((a: option, b: option): number => {
        let a_total: number = a.total;
        let b_total: number = b.total;


        if (a_total < b_total) { return 1; }

        else if (a_total > b_total) { return -1; }

        else { return 0; }
    })
};



export const SORT_COMMANDS = (data: Command[]): Command[] => {
    return data.sort((a: Command, b: Command): number => {
        let a_name: string = a.full_name;
        let b_name: string = b.full_name;


        if (a_name < b_name) { return -1; }

        else if (a_name > b_name) { return 1; }

        else { return 0; }
    })
}