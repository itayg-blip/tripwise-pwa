#!/bin/zsh

set -e
APP_DIR="$(cd "$(dirname "$0")" && pwd)"
PORT=8765
URL="http://127.0.0.1:${PORT}"

if lsof -nP -iTCP:${PORT} -sTCP:LISTEN >/dev/null 2>&1; then
  open "$URL"
  exit 0
fi

echo "Starting TripWise at $URL"
echo "Keep this window open while using local OCR. Press Ctrl+C to stop."
python3 -m http.server "$PORT" --directory "$APP_DIR" &
SERVER_PID=$!
trap 'kill "$SERVER_PID" 2>/dev/null || true' EXIT INT TERM
sleep 1
open "$URL"
wait "$SERVER_PID"
