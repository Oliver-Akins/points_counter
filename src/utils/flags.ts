//
// flags.ts
//
// Written by: Tyler Akins (2020/01/04)
//


import { FLAG_INDICATOR } from "../constants";



export const GET_FLAGS = (msg: string): string[] => {

    // Array of flags included in the message
    let flags: string[] = []


    // Check each parameter of the message
    for (var argument of msg.split(" ")) {

        // Check if the argument is indicated as a flag
        if (argument.startsWith(FLAG_INDICATOR)) {

            // Check each flag
            for (var temp_flag of argument.slice(FLAG_INDICATOR.length)) {

                // Only add flags to the array once
                if (!flags.includes(temp_flag)) {
                    flags.push(temp_flag);
                };
            };
        };
    };

    return flags;
}