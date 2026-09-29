#!/usr/bin/env -S bash -e

_yellow="\e[4;93m"
_nc="\e[0m"
_build=📦
_start="▶️ "

echo -e "${_build} ${_yellow}Building${_nc}:\n"
./Dockerfile

echo -e "\n${_start} ${_yellow}Starting${_nc}:\n"
docker container rm --force weatherbot > /dev/null 2>&1
docker container run --rm --name weatherbot --publish 8010:8010 --env TZ=America/Chicago --detach weatherbot
