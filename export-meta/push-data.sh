#! /bin/sh

node export-meta/meta.js
pwd
git add .
git commit -m "Update date"
git push origin master
