//
// top.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/09/19)
//

import * as config from "../config.json";
import * as Math from "mathjs";
import { LOAD } from "../db";


var toggle = false,
    last_ran = null;



const COMPARE_IGP = (a: any, b: any) => {
    let a_total: number = Math.sum(Object.values(a.points));
    let b_total: number = Math.sum(Object.values(b.points));

    if (a_total < b_total) { return 1; }
    else if (a_total > b_total) { return -1; }
    else { return 0; }
};



export function TOP3_COMMAND () {

    if (!config.bot.GLOBAL_CMD_COOLDOWN) {
        if (last_ran != null) {
            if (Date.now() - last_ran < config.bot.CMD_COOLDOWN * 1000) {
                return;
            };
        };
        last_ran = Date.now();
    };


    let data = LOAD();
    let buffer = "";

    let top_data = data.slice(0);
    top_data.sort(COMPARE_IGP);


    if (toggle) { buffer = " "; toggle = false; } else { toggle = true; }


    return `The top 3 characters for Spring are${buffer} --` +
        //@ts-ignore
        ` ${top_data[0].full_name}: ${Math.sum(Object.values(top_data[0].points))},` +
        //@ts-ignore
        ` ${top_data[1].full_name}: ${Math.sum(Object.values(top_data[1].points))},` +
        //@ts-ignore
        ` ${top_data[2].full_name}: ${Math.sum(Object.values(top_data[2].points))}`
};