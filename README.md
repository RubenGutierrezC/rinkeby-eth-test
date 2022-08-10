## Description

API that allows people to retrieve and filter transactions from the Ethereum network. The user can filter the transactions by hash, block number, from and to address.
It was made with etherjs and Rinkeby

## ENV
you need to provide:

- MONGO_URL
- ALCHEMY_TOKEN

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```