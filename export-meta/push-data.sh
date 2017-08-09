#! /bin/sh

mkdir olifish
cd olifish
git clone https://c8ac96de423f60f22af74ce6b74d83d4ecb1b83c@github.com/pointbar/olifish.git .
node ../export-meta/meta.js
cat data.js
git add .
git commit -m "Update date"
git push origin master
