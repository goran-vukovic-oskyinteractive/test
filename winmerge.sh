#!/bin/sh
NULL="/dev/null"
if [ "$2" = "$NULL" ] ; then
    echo "removed: $3"
elif [ "$1" = "$NULL" ] ; then
    echo "added: $3"
else
    echo "changed: $3"
    "C:\Program Files\WinMerge\WinMergeU.exe" -e -ub -dl "Base" -dr "Mine" "$1" "$2"
fi