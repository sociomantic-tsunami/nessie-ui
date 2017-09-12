#!/usr/bin/env bash

svgo -f ./src/Icon/svg/ \
    --enable=removeStyleElement \
    --pretty \
    --output=./src/Icon/svg/clean \
&& svgo -f ./src/Icon/svg/status/ \
    --enable=removeStyleElement \
    --pretty \
    --output=./src/Icon/svg/clean/status \
&& replace 'class="st0"' 'fill="currentColor"' ./src/Icon/svg/clean/status/* \
&& replace 'class="st1"' 'fill="#FFF"' ./src/Icon/svg/clean/status/*-fill.svg \
&& replace 'id="[^"]*"' '' ./src/Icon/svg/clean/status/* \
&& replace 'class="st0"' '' ./src/Icon/svg/clean/* \
&& replace 'class="st1"' '' ./src/Icon/svg/clean/*