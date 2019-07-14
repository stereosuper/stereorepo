#!/usr/local/env bash
# list all symlinks : 
# npm ls -g --depth=0 --link=true
set -e;

cd ./packages;
for f in *; do
    if [ -d "$f" ]; then
        cd "./$f";
        # create a global symlink to the local [package]
        npm link;
        cd ../..;
        # npm link [package] create a symlink locally to global project symlink
        npm link "@stereorepo/$f";
        cd ./packages;
    fi
done