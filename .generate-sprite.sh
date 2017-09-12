#!/usr/bin/env bash

rm -rf ./src/Icon/temp/ \
&& mkdir -p ./src/Icon/temp/svg/clean/ \
&& mv ./src/Icon/svg/clean/*.svg ./src/Icon/temp/svg/clean/ \
&& mv ./src/Icon/svg/clean/status/*.svg ./src/Icon/temp/svg/clean/ \
&& node node_modules/.bin/svg-sprite-generate \
    -d ./src/Icon/temp/svg/clean \
    -o ./src/Icon/sprite.html \
&& replace 'id="' 'id="icon__' \
    ./src/Icon/sprite.html \
&& replace '<svg' '<svg width="0" height="0" display="none"' \
    ./src/Icon/sprite.html \
&& replace '<\?xml[^>]+\?>' '' \
    ./src/Icon/sprite.html \
&& rm -rf ./src/Icon/temp/ \
&& rm -rf ./src/Icon/svg/clean/