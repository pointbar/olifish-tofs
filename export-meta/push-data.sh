#! /bin/sh

mkdir olifish
cd olifish
git clone https://$token@github.com/pointbar/olifish.git .
node ../export-meta/meta.js
cat data.js
git add .
git commit -m "Update date"
git push origin master
