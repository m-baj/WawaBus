#!/bin/sh

set -e

docker compose -f docker-compose-deployment.yml up --build -d
