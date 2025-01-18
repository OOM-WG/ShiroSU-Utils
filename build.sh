#!/bin/bash

if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <path> <zipfile>"
    exit 1
fi

targetRoot="$(realpath "$1")"
targetName="$2"

if [ ! -d "$targetRoot" ]; then
    echo "Error: Directory $targetRoot does not exist."
    exit 1
fi

for file in $(find "$targetRoot/"); do
    touch -c -t 000001010000 "$file"
done

rm -f "$targetRoot/hashList.dat"
for file in $(find "$targetRoot/" -type f -not -path "*META-INF*"); do
    echo "$(sha1sum "${file}" | awk '{print $1}') ${file#$targetRoot/}" >> "$targetRoot/hashList.txt"
done
truncate -s $(($(stat -c %s "$targetRoot/hashList.txt") - 1)) "$targetRoot/hashList.txt"
cat "$targetRoot/hashList.txt" | gzip -c9 > "$targetRoot/hashList.dat"
rm -f "$targetRoot/hashList.txt"

cd "$targetRoot/"
zip -r "$targetName" *
mv -f "$targetName" "../$targetName"
cd ..
