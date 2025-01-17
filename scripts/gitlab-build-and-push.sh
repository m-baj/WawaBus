#! /usr/bin/env sh

set -e

DOMAIN=backend \
docker compose \
-f docker-compose.yml \
config > docker-stack.yml

docker compose -f docker-stack.yml build
docker compose -f docker-stack.yml push