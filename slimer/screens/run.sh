#!/bin/bash

list=($(<list.txt))

for i in "${list[@]}"
do
	echo $i
	slimerjs pars-screen.js $i
done

echo "done"


