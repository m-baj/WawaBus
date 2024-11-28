#!/usr/bin/env sh

set -ex

docker compose build
docker compose down -v --remove-orphans
docker compose up -d
docker compose exec -T backend-api bash scripts/tests.sh "$@"
docker compose down -v --remove-orphans
