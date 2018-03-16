#!/usr/bin/env bash

svgo -f ./src/Icon/svg/ \
    --enable=removeStyleElement \
    --pretty \
    --output=./src/Icon/svg/clean
