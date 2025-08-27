#!/bin/bash

INDEX_FILE="./index.txt"

while IFS= read -r line; do
  [ -z "$line" ] && continue
  mkdir -p "$line"
  cat > "$line/index.html" <<EOF
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="refresh" content="0; url=https://teaching.shane.st/$line" />
    <title>Redirecting...</title>
  </head>
  <body>
    <p>Redirecting to <a href="https://teaching.shane.st/$line">https://teaching.shane.st/$line</a></p>
  </body>
</html>
EOF
done < "$INDEX_FILE"
