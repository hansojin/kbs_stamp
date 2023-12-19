#!/bin/bash

for ((i=1; i<=50; i++)); do
    file_number=$(printf "%02d" $i)  # 1을 01로 포맷팅
    file="*_${file_number}.mp3"
    echo $file
done
