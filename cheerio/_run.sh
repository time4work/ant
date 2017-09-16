#!/bin/bash

#list=($(<list.txt))

#for i in "${list[@]}"
#do
#	echo $i
#	slimerjs pars-screen.js $i
#done
url=https://www.x-art.com/videos/
name=x-art1

node server.js $url $name

echo "done"
