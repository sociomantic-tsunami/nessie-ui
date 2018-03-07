#!/usr/bin/env bash

svgo -f ./src/Icon/svg/ \
    --enable=removeStyleElement \
    --pretty \
    --output=./src/Icon/svg/clean \
&& replace 'class="st0"' '' ./src/Icon/svg/clean/* \
&& replace 'class="st1"' '' ./src/Icon/svg/clean/*
