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
        <h1 class="title center">Points Counter Commands</h1>
        <p class="small center">Version ${d.version}</p>
        <hr>
        <div class="nav">
            <div class="item">
                <a href="/" class="center">Home</a>
            </div>
            <div class="item">
                <a href="/tech-specs">Technical</a>
            </div>
        </div>
        <hr>
        <h2>User Commands</h2>
        ${d.u_cmds.join("\n")}
        <hr>
        <h2>Moderator Commands</h2>
        ${d.m_cmds.join("\n")}
        <hr>
        <h2>Admin Commands</h2>
        ${d.a_cmds.join("\n")}
        <hr>
        <div class="nav">
            <div class="item">
                <a href="/copyright">Copyright</a>
            </div>
        </div>
    </body>
</html>