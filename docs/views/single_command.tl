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
        <h1 class="title center">${d.cmd.full_name} command help</h1>
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
                <a href="/tech-specs">Technical</a>
            </div>
        </div>
        <hr>
        <br>
        ${d.cmd.info}
        <br><br>
        <table>
            <tr>
                <th>Field</th>
                <th>Value</th>
                <th>Description</th>
            </tr>
            <tr>
                <td>Group</td>
                <td>${d.cmd.group}</td>
                <td>
                    The group that this command belongs to. This is typically
                    only set for commands with subcommands.
                </td>
            </tr>
            <tr>
                <td>Name</td>
                <td>${d.cmd.name}</td>
                <td>The name of this command.</td>
            </tr>
            <tr>
                <td>Level</td>
                <td>${d.cmd.level}</td>
                <td>
                    The minimum level required to be able to run this command.
                </td>
            </tr>
            <tr>
                <td>Requires Confirmation</td>
                <td>${d.cmd.requires_confirm}</td>
                <td>
                    Whether or not this command requires a confirmation command.
                </td>
            </tr>
        </table>
        <hr>
        <div id="usage">
            <h2>Usage:</h2>
            <p>
                <pre><code>${d.cmd.syntax.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>
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