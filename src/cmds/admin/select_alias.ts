//
// select_alias.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/11/02)
//


import { SAVE, LOAD } from "../../utils/db";


// SECTION: Add alias
export const ADD_ALIAS = (target: string, new_alias: string): string|void => {
    let data: select[] = LOAD();


    // Iterating through options
    for (var option of data) {

        if (option.aliases.includes(target)) {

            if (option.aliases.includes(new_alias)) {
                return `Alias "${new_alias}" already exists on "${option.proper_alias}".`
            }

            option.aliases.push(new_alias);
            SAVE(data);

            return `Alias "${new_alias}" added to "${option.proper_alias}"`;
        }
    };

    return `Error: Cannot find any option with "${target}".`;
};
// !SECTION: Add alias




// SECTION: Remove alias
export const REMOVE_ALIAS = (target: string, old_alias: string): string|void => {
    let data: select[] = LOAD();


    // Iterating through options
    for (var option of data) {

        if (option.aliases.includes(target)) {

            // Ensuring that the option can still be targeted via commands
            if (option.aliases.length - 1 === 0) {
                return "Cannot remove the last alias from an option.";
            };

            option.aliases.splice(
                option.aliases.indexOf(old_alias),
                1
            );

            SAVE(data);
            return `Alias "${old_alias}" removed from "${target}".`;
        };
    };

    return `Error: Cannot find any option with "${target}".`;
};
// !SECTION: Remove alias