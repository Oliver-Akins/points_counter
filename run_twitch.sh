until node dist/twitch_bot.js; do
    echo "Crashed with exit code $?. Restarting" >&2
    sleep 1
done