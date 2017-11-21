#!/bin/bash

# TODO: Add validations

echo "What is the name of the project? Please use only alphanumeric characters:"
read project

echo "What is the bundle identifier?"
read bundle

echo "Do you need to support Windows Phone (y/N)?"
read windows

echo "$project $bundle $windows"
