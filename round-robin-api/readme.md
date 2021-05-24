# Getting Started

## Requirement

Node.Js

Postgres

## Before start

Setup postgresql and .env file (template for .env file:  ./.env-template)

## Scripts
To build:
`"build": "rimraf ./dist && tsc",`

To run production after build:
`"prod": "node ./src/server.js"`

Dev:
`"start": "nodemon ./src/server.ts",`

Typeorm:
`"typeorm": "ts-node ./node_modules/typeorm/cli.js"`
