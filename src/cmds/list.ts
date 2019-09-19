//
// list.js
// Protected under Canadian Copyright Laws
//
// Written by: Tyler Akins (2019/09/17)
//

const dates = [
    "Abigail", "Haley", "Leah", "Maru", "Penny", "Emily",
    "Alex", "Elliot", "Harvey", "Sam", "Sebastian", "Shane"
];

var toggle = false


export function LIST_COMMAND (client: any, target: string) {

    let buffer = "";

    if (toggle) { buffer = " "; toggle = false; } else { toggle = true; }

    client.say(
        target,
        `You can vote for any of the following people in-game for Spring to marry${buffer}: ${dates.join(', ')}`
    );
};