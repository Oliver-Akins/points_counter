<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Points Counter Help</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/kognise/water.css@latest/dist/dark.css">
        <link rel="stylesheet" href="/style.css">
    </head>
    <body>
        <h1 class="title center">Points Counter</h1>
        <p class="small center">Version ${d.c.bot.VERSION}</p>
        <hr>
        <div class="nav">
            <div class="item">
                <a href="/">Home</a>
            </div>
            <div class="item">
                <a href="/commands">Commands</a>
            </div>
            <div class="item">
                <a href="/cli-args">CLI Arguments</a>
            </div>
        </div>
        <hr>
        <div class="alert warn">
            Warning: No support is given to users concerning how to host the
            bot on their own. I do not have enough time to help people
            maintain their own versions of the bot.
        </div>
        <div id="Dependencies">
            <h3>Dependencies</h3>
            <ul>
                <li>
                    A knowledge of how to setup a server or computer with
                    programming utilities.
                </li>
                <li>
                    Twitch account. (optional)
                </li>
                <li>
                    Discord bot application. (optional)
                </li>
                <li>Node JS v10.16.X</li>
                <li>Node Package Manager 6.13.X</li>
                <li>Typescript 3.6.X</li>
            </ul>
        </div>
        <hr>
        <div id="Running">
            <h3>Running the Bot</h3>
            <p>
                This bot is entirely self-hosted, there is no bot that you can
                just add to your channel(s) for using it. I also have no plans
                to ever host this bot that way. To run the bot you will want to
                compile the TS to JS using tsc after installing the Node
                dependencies using
                <code>npm i</code>.
                Copy <code>config.template.json</code> to
                <code>config.json</code> and fill it in.
            </p>
        </div>
        <hr>
        <div id="cli-args">
            <h3>Command Line Arguments</h3>
            <p>
                All the command line arguments available for use can be found
                on the <a href="./cli-args">CLI args</a> page where you can
                find a list of them and in greater detail read about them and
                which ones are exclusive or not.
            </p>
        </div>
        <hr>
        <div class="nav">
            <div class="item">
                <a href="/copyright">Copyright</a>
            </div>
        </div>
    </body>
</html>