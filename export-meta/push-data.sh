#! /bin/sh

node export-meta/meta.js
git add .
git commit -m "Update data.js"
git push "https://${token}@github.com/olivier-colli/olifish-tofs.git"