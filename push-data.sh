#! /bin/sh
git checkout master
node meta.js
ls
cat data.json
git add data.json
git commit -m "Update data.json"
git push https://$token@github.com/olivier-colli/olifish-tofs.git