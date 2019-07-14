#!/usr/local/env bash
# list all symlinks : 
# npm ls -g --depth=0 --link=true
set -e;

cd ./packages;
for f in *; do
    if [ -d "$f" ]; then
        # removes the global symlink to the local [package]
        cd ..;
        npm unlink --no-save "@stereorepo/$f";

        # npm unlink removes the global symlink
        cd "./packages/$f";
        npm unlink;
        cd ..;
    fi
done