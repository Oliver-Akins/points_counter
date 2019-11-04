//
// select_commands.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/11/03)
//

import { LOAD, SAVE } from "../../utils/db";


// SECTION: Add select
export const ADD_SELECT = (new_option_name: string): string|void => {

    let data: select[] = LOAD();


    // NOTE: Ensure option w/ that name doesn't exist already
    for (var option of data) {
        if (option.aliases.includes(new_option_name)) {
            return `Cannot create a new option with name ${new_option_name} as it is taken already.`;
        };
    };


    let new_option: select = {
        "aliases": [new_option_name.toLowerCase()],

        // @ts-ignore - Because the type declaration for some reason is wanting to
        //              require "[key: string]" on the object.
        "points": {"%anonymous%": 0},

        "proper_alias": new_option_name,
        "total": 0
    }


    data.push(new_option);

    SAVE(data);
    return `Added new option with the name "${new_option_name}."`
};
// !SECTION: Add select



// SECTION: Remove select
export const REMOVE_SELECT = (target: string): string|void => {

    let data: select[] = LOAD();


    // NOTE: Find the element in the data list
    for (var option of data) {
        if (option.aliases.includes(target)) {
            data.splice(data.indexOf(option), 1);
            SAVE(data);

            return `Option with name "${target}" has been removed.`
        };
    };

    SAVE(data);
    return `No option with a name of "${target}" could be found.`
};
// !SECTION: Remove select