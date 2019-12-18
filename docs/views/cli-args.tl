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
        <h1 class="title center">CLI Arguments</h1>
        <p class="small center">Version ${d.version}</p>
        <hr>
        <div class="nav">
            <div class="item">
                <a href="/">Home</a>
            </div>
            <div class="item">
                <a href="/commands">Commands</a>
            </div>
            <div class="item">
                <a href="/tech-specs">Technical</a>
            </div>
        </div>
        <hr>
        <h2>Bot Runners:</h2>
        <div id="twitch">
            <h3><code>--twitch</code></h3>
            <p>
                This argument tells the code to run a Twitch bot with the
                credentials given in the config, if the required credentials
                are not given, the program will exit stopping all bots.
            </p>
        </div>
        <div id="discord">
            <h3><code>--discord</code></h3>
            <p>
                This argument tells the code to run a Discord bot with the
                credentials given in the config, if the required credentials
                are not given, the program will exit stopping all bots.
            </p>
        </div>
        <div id="mixer" hidden>
            <h3><code>--mixer</code></h3>
            <p>
                This argument tells the code to run a Mixer bot with the
                credentials given in the config, if the required credentials
                are not given, the program will exit stopping all bots.
            </p>
        </div>
        <hr>
        <h2>Misc Utilites:</h2>
        <div id="test">
            <h3><code>--test</code></h3>
            <p>
                Runs the tests for the various commands.
            </p>
        </div>
        <div id="web">
            <h3><code>--web</code></h3>
            <p>
                Runs the web server. This allows the serving of the help
                documentation dynamically.
            </p>
            <div class="alert info">
                If this argument is not given, you will not be able to access
                the help documentation for the bot at all.
            </div>
        </div>
        <hr>
        <div class="nav">
            <div class="item">
                <a href="/copyright">Copyright</a>
            </div>
        </div>
    </body>
</html>