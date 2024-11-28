#!/usr/bin/env bash

set -ex

coverage run --source=data_retrieval -m pytest -o log_cli=true -o log_cli_level=INFO
coverage report --show-missing
coverage html --title "${@-coverage}"