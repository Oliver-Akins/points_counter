//
// all.ts
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/10/30)
//

import * as Math from "mathjs";
import { LOAD } from "../db";


export function ALL_COMMAND(): string {

    let data: character[] = LOAD();
    let response = "Characters with points: ";
    let chars_w_points: string[] = [];

    // Iterate through each character
    for (var char of data) {

        let points: number[] = Object.values(char.points)
        let total_points = Math.sum(points);

        if (total_points !== 0) {
            chars_w_points.push(`${char.full_name} (${total_points} points)`)
        };
    };

    response += chars_w_points.join(", ");
    return response;
}