#! /bin/sh
# wget https://www.sno.phy.queensu.ca/~phil/exiftool/Image-ExifTool-10.60.tar.gz
# gzip -dc Image-ExifTool-10.60.tar.gz | tar -xf -
# cd Image-ExifTool-10.60
# perl Makefile.PL
# make test
# sudo make install

apt-get install libimage-exiftool-perl
exiftool -ver

git checkout master
node meta.js
git add data.json
git commit -m "Update data.json"
git push https://$token@github.com/olivier-colli/olifish-tofs.git