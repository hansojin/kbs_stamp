#!/bin/bash

shopt -s nullglob

for ((i=31; i<=50; i++)); do
    file_number=$(printf "%02d" $i)
    files=(*_${file_number}.mp3)

    # 길이가 11이면continue
    for file in "${files[@]}"; do
        if [[ "${#file}" -eq 11 ]]; then
            continue
        fi

        if [[ "${file:0:2}" -ge 11 && "${file:0:2}" -le 20 || "${file:0:2}" -ge 31 && "${file:0:2}" -le 50 ]]; then
            echo "$file"
        fi
    done
done

shopt -u nullglob

