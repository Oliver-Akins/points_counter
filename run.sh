until node dist/main.js; do
    echo "Crashed with exit code $?. Restarting" >&2
    sleep 1
done