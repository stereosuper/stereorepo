#!/usr/local/env bash
# list all symlinks : 
# npm ls -g --depth=0 --link=true
set -e;

packages=("accordion" "burger" "collant" "sac" "sprite")

cd ./packages;
for f in *; do
    if [ -d "$f" ]; then
        cd "./$f";
        # build package
        for p in "${packages[@]}"; do

            if [ "$f" == $p ]; then
                npm i;
                npm run build;
            fi
        done
        cd ../..;
        cd ./packages;
    fi
done