//
// remove.js
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/09/17)
//

import {save, load} from "./db.js"


export function REMOVE_COMMAND () {
    let data = load();


    // Find right character
    for (IGP of data) {

        if (IGP.names.includes(date_target)) {


            // Check if user has data on character
            if (Object.keys(IGP.points).includes(donator)) {

                // Make sure we don't go into the negatives
                if (IGP.points[donator] - points < 0) {
                    IGP.points[donator] = 0
                    client.say(
                        target,
                        `${donator} has removed ${points} from ${IGP.full_name}${_buffer}.`
                    )
                }
                else {
                    IGP.points[donator] -= points
                    client.say(
                        target,
                        `${donator} has removed ${points} from ${IGP.full_name}${_buffer}.`
                    )
                }
            }
            
            // User wasn't found; error
            else {
                client.say(
                    target,
                    `Error${_buffer}: That user doesn't have any points on that IGP.`
                )
            }
        }
    }

    save(data)
}