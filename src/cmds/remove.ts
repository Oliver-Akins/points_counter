//
// remove.js
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/09/17)
//

import {save, load} from "../db";


var toggle = false;


export function REMOVE_COMMAND (client: any, target: string, args: string[]) {
    let buffer = "";
    let data = load();


    // Ensure Twitch doesn't delete our message due to duplication
    if (toggle) { buffer = " "; toggle = false; } else { toggle = true; }


    // Check argument count
    if (args.length < 2) {
        client.say(target, `Error${buffer}: Not enough arguments.`)
        return;
    };


    // Parse arguments
    let points: number = parseInt(args[0]);
    // @ts-ignore
    let date_target: string = args[1];
    let donator: string = "%anonymous%";
    // @ts-ignore
    if (args.length >= 3) { donator = args[2]; };


    // Find right character
    for (var IGP of data) {

        if (IGP.names.includes(date_target)) {


            // Check if user has data on character
            if (Object.keys(IGP.points).indexOf(donator) != -1) {

                // Make sure we don't go into the negatives
                if (IGP.points[donator] - points < 0) {
                    IGP.points[donator] = 0
                    client.say(
                        target,
                        `${donator} has removed ${points} from ${IGP.full_name}${buffer}.`
                    )
                }
                else {
                    IGP.points[donator] -= points
                    client.say(
                        target,
                        `${donator} has removed ${points} from ${IGP.full_name}${buffer}.`
                    )
                }
            }
            
            // User wasn't found; error
            else {
                client.say(
                    target,
                    `Error${buffer}: That user doesn't have any points on that IGP.`
                )
            }
        }
    }

    save(data)
}