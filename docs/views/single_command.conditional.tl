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
        ${ d.cmd.alert.error.head ? `<div class="alert error">${d.cmd.alert.error.head}</div>` : ""}
        ${ d.cmd.alert.warn.head ? `<div class="alert warn">${d.cmd.alert.warn.head}</div>` : ""}
        ${ d.cmd.alert.info.head ? `<div class="alert info">${d.cmd.alert.info.head}</div>` : ""}
        <br>
        ${d.cmd.info}
        ${ d.cmd.alert.error.head_2 ? `<div class="alert error">${d.cmd.alert.error.head_2}</div>` : ""}
        ${ d.cmd.alert.warn.head_2 ? `<div class="alert warn">${d.cmd.alert.warn.head_2}</div>` : ""}
        ${ d.cmd.alert.info.head_2 ? `<div class="alert info">${d.cmd.alert.info.head_2}</div>` : ""}
        <br><br>
        ${ d.cmd.alert.error.table_head ? `<div class="alert error">${d.cmd.alert.error.table_head}</div>` : ""}
        ${ d.cmd.alert.warn.table_head ? `<div class="alert warn">${d.cmd.alert.warn.table_head}</div>` : ""}
        ${ d.cmd.alert.info.table_head ? `<div class="alert info">${d.cmd.alert.info.table_head}</div>` : ""}
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
        ${ d.cmd.alert.error.table_foot ? `<div class="alert error">${d.cmd.alert.error.table_foot}</div>` : ""}
        ${ d.cmd.alert.warn.table_foot ? `<div class="alert warn">${d.cmd.alert.warn.table_foot}</div>` : ""}
        ${ d.cmd.alert.info.table_foot ? `<div class="alert info">${d.cmd.alert.info.table_foot}</div>` : ""}
        <hr>
        <div id="usage">
            <h2>Usage:</h2>
            <p>
                <pre><code>${d.cmd.syntax.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>
            </p>
            ${ d.cmd.alert.error.usage ? `<div class="alert error">${d.cmd.alert.error.usage}</div>` : ""}
            ${ d.cmd.alert.warn.usage ? `<div class="alert warn">${d.cmd.alert.warn.usage}</div>` : ""}
            ${ d.cmd.alert.info.usage ? `<div class="alert info">${d.cmd.alert.info.usage}</div>` : ""}
        </div>
        <hr>
        <div class="nav">
            <div class="item">
                <a href="/copyright">Copyright</a>
            </div>
        </div>
    </body>
</html>