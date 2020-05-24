#!/bin/bash

#for file in $(find . -type f -name "*.mp3" ); do
#   echo "${file}"
#done
find . -type f -name '*.wma' -print0 |
while IFS= read -r -d '' file; do
    yolo=$(printf '%s\n' "$file")
    rm "${yolo}"
#    replace=${yolo/.wma/.mp3}
##    printf 'ffmpeg -i "%s" -y -acodec libmp3lame -ab 64k "%s" -loglevel debug \n' "${yolo}" "${replace}"
#    ffmpeg -i "${yolo}" -y -acodec libmp3lame -ab 128k "${replace}" < /dev/null
#    status=$?
#    if test $status -ne 0
#    then
#      echo "Failure"
#      exit 1;
#    fi

done
