#! /bin/sh
npm install --save-dev node-exiftool
node export-meta/meta.js
git checkout master
git add data.js
git commit -m "Update data.js"
git push https://$token@github.com/olivier-colli/olifish-tofs.git