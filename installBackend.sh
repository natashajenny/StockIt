#!/bin/sh
while read p; do
  pip install $p
done < packages.txt