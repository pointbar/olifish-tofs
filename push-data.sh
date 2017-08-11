#! /bin/sh
git checkout master
node meta.js
git add data.json
git commit -m "Update data.json"
git push https://$token@github.com/olivier-colli/olifish-tofs.git