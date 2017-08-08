#!/bin/bash

fswatch -0 -l 0.1 *.uml | xargs -0 -n 1 -I {} plantuml {} &
live-server . &

