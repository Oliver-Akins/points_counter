//
// option_info.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/11/05)
//

import { LOAD } from "../../utils/db";


export const OPTION_INFO = (target: string): string|void => {
    let data: select[] = LOAD();

    for (var option of data) {
        if (option.aliases.includes(target)) {
            return `${option.proper_alias} has ${option.total} points, ${option.aliases.length} aliases.`;
        };
    };

    return `Could not find an option for "${target}".`;
}