#!/bin/bash

for file in *; do
    if [[ -f $file && ${#file} -eq 5 ]]; then
        newname="0$file"
        mv "$file" "$newname"
        echo "변경: $file -> $newname"
    fi
done

