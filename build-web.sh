#!/usr/bin/env bash
echo 'Building project...'
cd service-web
npm run build
cp -R ../service-web/dist/* ../service-api/public/
echo 'Building complete !'
