#!/bin/bash

set -e

yarn build
rm -rf waterdrop-mobile-dist/
mv dist waterdrop-mobile-dist
rm -f waterdrop-mobile-dist.tar.gz
tar -zcvf waterdrop-mobile-dist.tar.gz waterdrop-mobile-dist/
scp ./waterdrop-mobile-dist.tar.gz root@captainwong.cn:/var/www/waterdrop-mobile-dist.tar.gz

ssh -t root@captainwong.cn "cd /var/www && rm -rf waterdrop-mobile-dist && tar -zxvf waterdrop-mobile-dist.tar.gz"
