#! /bin/sh
cd export-meta
npm install
node meta.js
cd ..
cat data.json
git checkout master
git add data.json
git commit -m "Update data.json"
git push https://$token@github.com/olivier-colli/olifish-tofs.git