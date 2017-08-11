#! /bin/sh
node meta.js
git checkout master
git add data.json
git commit -m "Update data.json"
git push https://$token@github.com/olivier-colli/olifish-tofs.git