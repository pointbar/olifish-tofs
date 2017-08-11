#! /bin/sh
cd export-meta
npm install
node meta.js
cd ..
git checkout master
git add data.json
git commit -m "Update data.js"
git push https://$token@github.com/olivier-colli/olifish-tofs.git