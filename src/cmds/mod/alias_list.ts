//
// alias_list.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/11/05)
//

import { LOAD } from "../../utils/db";


export const LIST_ALIASES = (target: string): string|void => {
    let data: select[] = LOAD();

    for (var option of data) {
        if (option.aliases.includes(target)) {
            return `Aliases for that option include: ${option.aliases.join(", ")}`;
        };
    };

    return `Could not find an option for "${target}".`;
}