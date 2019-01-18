#!/usr/bin/env bash
mkdir ./src/Icon/svg/clean && \
    svgo -f ./src/Icon/svg/ \
    --enable=removeStyleElement \
    --pretty \
    --output=./src/Icon/svg/clean
