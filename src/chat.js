const tmi = require('tmi.js');
const fs = require("fs");
const Math = require("mathjs")


const OAUTH_TOKEN = "oauth:3cyrtaxcq0btrzi5e44pkff4gfi196";
const USERNAME = "stardew_date_counter";
const CHANNELS = [
    "resonym",
    "alkali_metal"
];



const dates = [
    "Abigail",
    "Haley",
    "Leah",
    "Maru",
    "Penny",
    "Emily",
    "Shane",
    "Elliot",
    "Harvey",
    "Sam",
    "Sebastian",
    "Shane"
]



const filename = "./src/data.json"


module.exports = load = () => {
    let data = fs.readFileSync(filename);
    return JSON.parse(data);
}


module.exports = save = (data) => {
    fs.writeFile(filename, JSON.stringify(data, null, 2))
}




// Define configuration options
const opts = {
    identity: {
        username: USERNAME,
        password: OAUTH_TOKEN
    },
    channels: CHANNELS
};



// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();


const prefix = "!"
var last_command = ""


// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {

    let cmd = msg.trim().toLowerCase();


    if (self) { return; } // Ignore messages from the bot
    else if (cmd.slice(0, prefix.length) !== prefix) { return; } // Ensure prefix start


    // Parse message accordingly
    let args = cmd.slice(1).split(" ")
    cmd = args[0]
    args.splice(0, 1)


    let is_mod = context.mod || context.badges.broadcaster == 1


    // COMMANDS
    if (cmd === "list") {
        client.say(
            target,
            `You can vote for any of the following people in-game for Spring to marry: ${dates.join(', ')}`
        )
    }
    else if (cmd === "ping") {
        var _buffer = "";
        if (last_command === "ping") {
            _buffer = "!"
            last_command = null
        } else { last_command = "ping"; }

        client.say(target, `pong${_buffer}!`);
    }

    else if (cmd === "help") {
        var _buffer = "";
        if (last_command === "help") {
            _buffer = " "
            last_command = null
        } else { last_command = "help"; }

        client.say(
            target,
            `You can find a list of commands here${_buffer}: https://tyler.akins.me/twitch_bit_counter/`
        )
    }

    else if (cmd === "lead") {
        let leader = ["Absolutely nobody", 0];

        var _buffer = "";
        if (last_command === "lead") {
            _buffer = "!"
            last_command = null
        } else { last_command = "lead"; }

        for (IGP of data) {
            let total_points = Math.sum(Object.values(IGP.points));

            if (total_points > leader[1]) {
                leader[0] = IGP.full_name;
                leader[1] = total_points;
            }
        }

        client.say(
            target,
            `${leader[0]} is in the lead with ${leader[1]} bits${_buffer}!`
        )
    }

    else if (is_mod) {

        if (args.length < 2) {
            client.say(target, `Error${_buffer}: Not enough arguments.`)
            return;
        };

        let points = parseInt(args[0])
        let date_target = args[1]
        let donator = "%anonymous%"

        if (args.length === 3) {
            donator = args[2]
        };



        if (cmd === "add") {


            var _buffer = "";
            if (last_command === "add") {
                _buffer = " "
                last_command = null
            } else { last_command = "add"; }


            for (IGP of data) {
                if (IGP.names.includes(date_target)) {
                    if (Object.keys(IGP.points).includes(donator)) {
                        IGP.points[donator] += points
                    } else {
                        IGP.points[donator] = points
                    }
                    client.say(
                        target,
                        `${donator} has added ${points} to ${IGP.full_name}${_buffer}.`
                    )
                }
            }

            save(data)
        }

        else if (cmd === "remove") {

            var _buffer = "";
            if (last_command === "remove") {
                _buffer = " "
                last_command = null
            } else { last_command = "remove"; }

            for (IGP of data) {
                if (IGP.names.includes(date_target)) {
                    if (Object.keys(IGP.points).includes(donator)) {
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
                    } else {
                        client.say(
                            target,
                            `Error${_buffer}: That user doesn't have any points on that IGP.`
                        )
                    }
                }
            }

            save(data)
        }
    }
}



var data = load();



// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}
