#!/bin/bash

mkdir -p .cache

yes | rm -rf .cache/**/*

yes | cp -rf db srv .cache

tsc --project tsconfig.local.json

find ./.cache/srv -name "*.ts" -delete

PID_NODE_APP=$(lsof -t -i:$PORT)

if [ ! -z "$PID_NODE_APP" ]; then
    kill $PID_NODE_APP 2>/dev/null
    wait $PID_NODE_APP 2>/dev/null
fi
