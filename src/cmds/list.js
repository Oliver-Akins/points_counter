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


export function LIST_COMMAND (client, target) {
    client.say(
        target,
        `You can vote for any of the following people in-game for Spring to marry: ${dates.join(', ')}`
    );
};