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
        <br>
        ${d.cmd.info}
        <br><br>
        <table>
            <tr>
                <th>Field</th>
                <th>Value</th>
            </tr>
            <tr ${d.cmd.group ? "" : "hidden"}>
                <td>
                    <div class="tooltip">
                        Group
                        <span class="hover_text">
                            The group that this command belongs to.
                        </span>
                    </div>
                </td>
                <td>${d.cmd.group}</td>
            </tr>
            <tr>
                <td>
                    <div class="tooltip">
                        Name
                        <div class="hover_text">
                            The name of the command.
                        </div>
                    </div>
                </td>
                <td>${d.cmd.name}</td>
            </tr>
            <tr>
                <td>
                    <div class="tooltip">
                        Level
                        <span class="hover_text">
                            The minimum level required to be able to run this command.
                        </span>
                    </div>
                </td>
                <td>${d.cmd.level}</td>
            </tr>
            <tr>
                <td>
                    <div class="tooltip">
                        Requires Confirmation
                        <div class="hover_text">
                            Whether or not this command requires a confirmation command.
                        </div>
                    </div>
                </td>
                <td>${d.cmd.requires_confirm}</td>
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