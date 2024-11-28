#! /usr/bin/env sh

set -e

DOMAIN=backend \
docker compose \
-f docker-compose.yml \
config > docker-stack.yml

docker compose -f docker-stack.yml build
docker compose -f docker-stack.yml down -v --remove-orphans
docker compose -f docker-stack.yml up -d
docker compose -f docker-stack.yml exec -T data-retrieval bash scripts/tests.sh "$@"
docker compose -f docker-stack.yml down -v --remove-orphans
