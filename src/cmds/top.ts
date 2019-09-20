//
// top.js
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/09/19)
//

import * as Math from "mathjs";
import { load } from "../db";


var toggle = false;



const COMPARE_IGP = (a: any, b: any) => {
    let a_total: number = Math.sum(Object.values(a.points));
    let b_total: number = Math.sum(Object.values(b.points));

    if (a_total < b_total) { return 1; }
    else if (a_total > b_total) { return -1; }
    else { return 0; }
};


export function TOP3_COMMAND (client: any, target: string) {
    let data: [] = load();
    let buffer: string = "";

    let top_data = data.slice(0);
    top_data.sort(COMPARE_IGP);


    if (toggle) { buffer = " "; toggle = false; } else { toggle = true; }


    client.say(
        target,
        `The top 3 characters for Spring are${buffer} --` +
        //@ts-ignore
        ` ${top_data[0].full_name}: ${Math.sum(Object.values(top_data[0].points))},` +
        //@ts-ignore
        ` ${top_data[1].full_name}: ${Math.sum(Object.values(top_data[1].points))},` +
        //@ts-ignore
        ` ${top_data[2].full_name}: ${Math.sum(Object.values(top_data[2].points))}`
    )
};